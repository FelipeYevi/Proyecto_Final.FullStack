import React, { useState } from "react";
import { NavLink,useLocation } from "react-router-dom";
const SidebarAdmin = ({ onAñadirProducto }) => {
  const location = useLocation();

  const esGestionProductos = location.pathname === "/adminpage";

  return (
    <aside
      className="col-12 col-md-3 col-lg-2 bg-light border-end p-4 shadow-sm"
      style={{ minHeight: "100vh" }}
    >
      <div className="sticky-top" style={{ top: "20px" }}>
        <h5 className="fw-bold text-center mb-4 border-bottom pb-2">
          PANEL ADMINISTRADOR
        </h5>

        <nav className="d-flex flex-column gap-2">
          <NavLink to="/adminpage" className="btn btn-outline-dark fw-semibold">
           
            ⚙️ Gestión de productos
          </NavLink>
         {esGestionProductos && (
            <button
              className="btn btn-outline-dark fw-semibold"
              onClick={onAñadirProducto}
            >
              ➕ Agregar Producto
            </button>
          )}

          <NavLink to="/adminPedidos" className="btn btn-outline-dark fw-semibold">
            🧾 Pedidos
          </NavLink>

          <NavLink
            to="/adminUsuarios"
            className="btn btn-outline-dark fw-semibold"
          >
            👥 Usuarios
          </NavLink>
        </nav>

        <hr className="my-4" />
      </div>
    </aside>
  );
};

export default SidebarAdmin;
