import React, { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import { useCart } from "../context/CartContext";
import axios from "axios";
import "../Css/Profile.css";

const Profile = () => {
  const { token, user, setUser } = useUser();
  const { cart } = useCart();

  const [pedidosCount, setPedidosCount] = useState(0);
const [isModalOpen, setIsModalOpen] = useState(false);

const [editData, setEditData] = useState({
  region: "",
  ciudad: "",
  direccion: "",
  categoria_favorita: ""
});

useEffect(() => {
    console.log("Datos del usuario en Profile:", user);
  }, [user]);

  const totalEnCarrito = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

  useEffect(() => {
    if (user) {
      setEditData({
        region: user.region || "",
        ciudad: user.ciudad || "",
        direccion: user.direccion || "",
        categoria_favorita: user.categoria_favorita || "Pesca con mosca"
      });
      if (token) fetchUserStats();
    }
  }, [user, token]);

  const fetchUserStats = async () => {
    try {
      const { data } = await axios.get("https://proyecto-final-fullstack-dh99.onrender.com/api/usuarios/stats", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPedidosCount(data.pedidosCount || 0);
    } catch (err) {
      console.error("Error stats:", err);
    }
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("https://proyecto-final-fullstack-dh99.onrender.com/api/usuarios/perfil", editData, {
        headers: { Authorization: `Bearer ${token}` },
      });


      setUser({ ...user, ...data });
      alert("¡Perfil actualizado!");
      setIsModalOpen(false);
    } catch (error) {
      alert("Error al actualizar perfil");
    }
  };

  if (!user) return <div className="container my-5 text-center">Cargando datos de usuario...</div>;

  

  return (
    <div className="container my-5">
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body d-flex align-items-center gap-4">
          <div className="profile-avatar bg-primary text-white d-flex align-items-center justify-content-center rounded-circle" style={{ width: "80px", height: "80px" }}>
            <span className="h4 mb-0">{user.nombre?.charAt(0).toUpperCase() || "U"}</span>
          </div>
          <div>
            <h4 className="fw-bold mb-1">{user.nombre || "Usuario"}</h4>
            <p className="text-muted mb-0">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4 text-center">
        <div className="col-4">
          <div className="card border-0 shadow-sm p-3">
            <h2 className="fw-bold text-primary">{pedidosCount}</h2>
            <p className="text-muted small mb-0">Pedidos</p>
          </div>
        </div>
        <div className="col-4">
          <div className="card border-0 shadow-sm p-3">
            <h2 className="fw-bold text-success">{totalEnCarrito}</h2>
            <p className="text-muted small mb-0">En carrito</p>
          </div>
        </div>
        <div className="col-4">
          <div className="card border-0 shadow-sm p-3">
            <h5 className="fw-bold text-warning mb-0">{user.categoria_favorita || "Sin definir"}</h5>
            <p className="text-muted small mb-0">Favorito🎣</p>
          </div>
        </div>
      </div>

      <div className="card p-4 shadow-sm border-0">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Dirección de envío</h5>
          <button className="btn btn-outline-primary btn-sm" onClick={() => setIsModalOpen(true)}>Editar</button>
        </div>
        <ul className="list-unstyled mb-0">
      
          <li>📍 <strong>Región:</strong> {user.region || "No especificada"}</li>
          <li>🏠 <strong>Ciudad:</strong> {user.ciudad || "No especificada"}</li>
          <li>🚚 <strong>Dirección:</strong> {user.direccion || "No especificada"}</li>
        </ul>
      </div>

      {isModalOpen && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header bg-dark text-white border-0">
                <h5 className="modal-title fw-bold">EDITAR PERFIL</h5>
                <button className="btn-close btn-close-white" onClick={() => setIsModalOpen(false)} />
              </div>
              <form onSubmit={guardarCambios}>
                <div className="modal-body">
                  <label className="small text-muted mb-1">Región</label>
                  <input 
                    className="form-control mb-3" 
                    placeholder="Región" 
                    value={editData.region} 
                    onChange={e => setEditData({...editData, region: e.target.value})} 
                  />
                  <label className="small text-muted mb-1">Ciudad</label>
                  <input 
                    className="form-control mb-3" 
                    placeholder="Ciudad" 
                    value={editData.ciudad} 
                    onChange={e => setEditData({...editData, ciudad: e.target.value})} 
                  />
                  <label className="small text-muted mb-1">Dirección</label>
                  <input 
                    className="form-control mb-3" 
                    placeholder="Dirección" 
                    value={editData.direccion} 
                    onChange={e => setEditData({...editData, direccion: e.target.value})} 
                  />
                  <label className="small text-muted mb-1">Categoría Favorita</label>
                  <select 
                    className="form-select" 
                    value={editData.categoria_favorita} 
                    onChange={e => setEditData({...editData, categoria_favorita: e.target.value})}
                  >
                    <option value="Pesca con mosca">Pesca con mosca</option>
                    <option value="Pesca tradicional">Pesca tradicional</option>
                    <option value="Sale">Ofertas</option>
                  </select>
                </div>
                <div className="modal-footer border-0">
                  <button type="submit" className="btn btn-primary w-100 fw-bold py-2">GUARDAR CAMBIOS</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;