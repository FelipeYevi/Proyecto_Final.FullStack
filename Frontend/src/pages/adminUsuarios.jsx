import React, { useEffect, useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

 
  const cargarUsuarios = async () => {
    try {
      setError("");

      const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "No se pudieron cargar los usuarios");
        setUsuarios([]);
        return;
      }

      setUsuarios(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("Error de conexión con el servidor");
      setUsuarios([]);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <SidebarAdmin onAñadirProducto={() => {}} />

        <main className="col-12 col-md-9 col-lg-10 p-4">
          <h2 className="text-center fw-bold mb-4">Usuarios</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="table-responsive shadow-sm rounded-3">
            <table className="table table-striped align-middle m-0">
              <thead className="table-dark">
                <tr>
                  <th>Email</th>
                  <th>Categoría favorita</th>
                  <th>Región</th>
                  <th>Ciudad</th>
                  <th>Dirección</th>
                </tr>
              </thead>

              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No hay usuarios para mostrar
                    </td>
                  </tr>
                ) : (
                  usuarios.map((u) => (
                    <tr key={u.id}>
                      <td className="fw-semibold">{u.email}</td>
                      <td>{u.categoria_favorita || "-"}</td>
                      <td>{u.region || "-"}</td>
                      <td>{u.ciudad || "-"}</td>
                      <td>{u.direccion || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminUsuarios;
