import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [email, setEmail] = useState(() => localStorage.getItem("email") || null);
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cargarPerfil = async () => {
      if (token) {
        try {
          const { data } = await axios.get("https://proyecto-final-fullstack-dh99.onrender.com/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
          });
        
          setUser(data);
        } catch (error) {
          console.error("Error cargando perfil:", error);
          if (error.response?.status === 401) logout();
        }
      }
    };
    cargarPerfil();
  }, [token]);
//registtro
  const register = async (userData) => {
    try {
      const { data } = await axios.post("https://proyecto-final-fullstack-dh99.onrender.com/api/auth/register", userData);
      return { success: true, message: data.message || "Registro exitoso" };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.error || "Error al registrarse" 
      };
    }
  };

  const login = async (credentials) => {
    try {
      const { data } = await axios.post("https://proyecto-final-fullstack-dh99.onrender.com/api/auth/login", credentials);
      setToken(data.token);
      setEmail(data.email);
      setRole(data.role);
      setUser(data.user || data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || "Error de login" };
    }
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    setRole(null);
    setUser(null);
    localStorage.clear();
  };

  return (
   
    <UserContext.Provider value={{ token, email, role, user, setUser, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser debe estar dentro de UserProvider");
  return context;
};