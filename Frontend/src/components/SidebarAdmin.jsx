import React from "react";

const SidebarAdmin = ({ onAñadirProducto }) => {
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
          {/* AGREGAR PRODUCTO */}
          <button
            className="btn btn-outline-dark fw-semibold"
            onClick={onAñadirProducto}
          >
            ➕ Agregar Producto
          </button>

          <button className="btn btn-outline-dark fw-semibold">
            🧾 Pedidos
          </button>

          <button className="btn btn-outline-dark fw-semibold">
            👥 Usuarios
          </button>
        </nav>

        <hr className="my-4" />
      </div>
    </aside>
  );
};

export default SidebarAdmin;
