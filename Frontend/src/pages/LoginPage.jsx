import React, { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login, token } = useUser(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/"); 
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Todos los campos son obligatorios");
      return;
    }

    if (password.length < 6) {
      setMessage("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const result = await login({ email, password });

    if (result.success) {
      navigate("/"); 
    } else {
      setMessage(result.message); 
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto border p-4">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {message && <div className="alert alert-info">{message}</div>}
        <button type="submit" className="btn btn-success w-100">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
