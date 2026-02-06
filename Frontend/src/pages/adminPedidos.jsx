import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/userContext";
import SidebarAdmin from "../components/SidebarAdmin";

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [detalle, setDetalle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { token } = useUser();

  const fetchPedidos = async () => {
    try {
      const res = await axios.get(
        "https://proyecto-final-fullstack-dh99.onrender.com/api/checkouts/admin/listado",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPedidos(res.data);
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    }
  };

  useEffect(() => {
    if (token) fetchPedidos();
  }, [token]);

  const verDetalle = async (id) => {
    setDetalle(null);
    setShowModal(true);
    try {
      const res = await axios.get(
        `https://proyecto-final-fullstack-dh99.onrender.com/api/checkouts/admin/detalle/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDetalle(res.data);
    } catch (error) {
      console.error("Error al obtener detalle:", error);
    }
  };

  const completarPedido = async (id) => {
    try {
      await axios.patch(
        `https://proyecto-final-fullstack-dh99.onrender.com/api/checkouts/admin/estado/${id}`,
        { estado: "completado" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPedidos();
    } catch (error) {
      alert("Error al actualizar estado");
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex">
        <SidebarAdmin />

        <div className="flex-grow-1 p-5 bg-white" style={{ minHeight: "100vh" }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold m-0">GESTIÓN DE PEDIDOS</h2>
            <select className="form-select w-auto bg-light border-0 shadow-sm">
              <option>Todos los pedidos</option>
            </select>
          </div>

          <div className="table-responsive shadow-sm rounded border">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr className="text-secondary small">
                  <th className="ps-4">N°</th>
                  <th>Usuario</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {pedidos.map((p) => {
                  
                  const estadoNorm = (p.estado ?? "")
                    .toString()
                    .trim()
                    .toUpperCase();

                  const esPendiente = estadoNorm === "PENDIENTE";

                  return (
                    <tr key={p.id}>
                      <td className="ps-4">#{p.id}</td>

                      <td className="text-muted small">{p.user_email}</td>

                      <td className="fw-bold text-success">
                        ${Number(p.total).toLocaleString("es-CL")}
                      </td>

                      <td>
                        <span
                          className={`badge border ${
                            esPendiente
                              ? "bg-warning-subtle text-warning border-warning"
                              : "bg-success-subtle text-success border-success"
                          }`}
                        >
               
                          {esPendiente ? "Pendiente" : "Completado"}
                        </span>
                      </td>

                      <td className="text-center">
                        <button
                          className="btn btn-dark btn-sm me-2 px-3"
                          onClick={() => verDetalle(p.id)}
                        >
                          <i className="bi bi-file-earmark-text me-1"></i> Ver
                          Productos
                        </button>

                        {esPendiente && (
                          <button
                            className="btn btn-outline-success btn-sm px-3"
                            onClick={() => completarPedido(p.id)}
                          >
                            <i className="bi bi-check2-circle me-1"></i>{" "}
                            Completar
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-dark text-white py-3">
                <h5 className="modal-title fw-bold">Detalle del Pedido</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div
                className="modal-body p-0"
                style={{ maxHeight: "450px", overflowY: "auto" }}
              >
                {!detalle ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary"></div>
                  </div>
                ) : (
                  detalle.map((item, idx) => (
                    <div key={idx} className="p-3 border-bottom mx-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-primary">
                          {item.name} (ID: {item.id})
                        </span>
                        <span className="badge bg-dark py-2 px-3">
                          Cant: {item.quantity}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between mt-2 small">
                        <span className="text-muted">
                          Unitario: $
                          {Number(item.unit_price).toLocaleString("es-CL")}
                        </span>
                        <span className="fw-bold text-success">
                          Subtotal: $
                          {Number(item.subtotal).toLocaleString("es-CL")}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="modal-footer border-0 p-3">
                <button
                  className="btn btn-secondary w-100 py-2 fw-bold"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPedidos;
