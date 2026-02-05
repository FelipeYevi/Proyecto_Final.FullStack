import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import SidebarAdmin from "../components/SidebarAdmin";
import CardAdmin from "../components/CardAdmin";

const AdminPage = () => {
  const [productos, setProductos] = useState([]);
  const [productosOriginales, setProductosOriginales] = useState([]);

  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [productoAñadir, setProductoAñadir] = useState(null);

  const { token, role } = useUser();
  const navigate = useNavigate();


  useEffect(() => {
    if (!token || role !== "admin") {
      navigate("/");
    } else {
      cargarProductos();
    }
  }, [token, role, navigate]);

  const fetchJSON = async (url, options = {}) => {
    const res = await fetch(url, options);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Error ${res.status}: ${text}`);
    }
    return res.json();
  };

 
  const cargarProductos = async () => {
    try {
      const data = await fetchJSON("https://proyecto-final-fullstack-dh99.onrender.com/api/productos");
      const lista = Array.isArray(data) ? data : [];
      setProductos(lista);
      setProductosOriginales(lista);
    } catch (err) {
      console.error("Error cargarProductos:", err.message);
      setProductos([]);
    }
  };


  const handleFiltrarCategoria = (e) => {
    const categoria = e.target.value;
    if (categoria === "ALL") {
      setProductos(productosOriginales);
    } else {
      setProductos(productosOriginales.filter((p) => p.categoria === categoria));
    }
  };


  const eliminarProducto = async (id) => {
    try {
      await fetchJSON(`https://proyecto-final-fullstack-dh99.onrender.com/api/productos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await cargarProductos();
      setProductoAEliminar(null);
      alert("Producto eliminado con éxito.");
    } catch (err) {
      console.error("Error eliminarProducto:", err.message);
      alert("No se pudo eliminar el producto.");
    }
  };

  //añadir producto
  const abrirModalAñadir = () => {
    setProductoAñadir({
      name: "",
      img: "",
      desc: "",
      detail: "", 
      price: "",
      categoria: "tradicional",
    });
  };

  const guardarProductoNuevo = async (e) => {
    e.preventDefault();
    try {
      const detailArray = (productoAñadir.detail || "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);

      await fetchJSON("https://proyecto-final-fullstack-dh99.onrender.com/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: crypto.randomUUID(), 
          name: productoAñadir.name,
          img: productoAñadir.img,
          desc: productoAñadir.desc,
          detail: detailArray,
          price: Number(productoAñadir.price),
          categoria: productoAñadir.categoria,
        }),
      });

      await cargarProductos();
      setProductoAñadir(null);
    } catch (err) {
      console.error("Error:", err.message);
      alert("Error al guardar producto nuevo.");
    }
  };

  // editar producto
  const abrirModalEditar = (producto) => {
    setProductoAEditar({
      ...producto,
      detailText: Array.isArray(producto.detail) ? producto.detail.join(", ") : "",
    });
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    try {
      const detailArray = (productoAEditar.detailText || "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);

      await fetchJSON(`https://proyecto-final-fullstack-dh99.onrender.com/api/productos/${productoAEditar.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: productoAEditar.name,
          img: productoAEditar.img,
          desc: productoAEditar.desc,
          detail: detailArray,
          price: Number(productoAEditar.price),
          categoria: productoAEditar.categoria,
        }),
      });

      await cargarProductos();
      setProductoAEditar(null);
    } catch (err) {
      console.error("Error:", err.message);
      alert("Error al actualizar producto.");
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <SidebarAdmin onAñadirProducto={abrirModalAñadir} />

        <main className="col-12 col-md-9 col-lg-10">
          <div className="container p-4">
            <h2 className="text-center mb-4 fw-bold text-uppercase">Gestión de Productos</h2>

            <div className="d-flex flex-column align-items-center mb-4">
              <h6 className="fw-bold mb-3">FILTRAR POR CATEGORÍA</h6>
              <select
                className="form-select text-center w-50 shadow-sm"
                defaultValue="ALL"
                onChange={handleFiltrarCategoria}
              >
                <option value="ALL">TODAS LAS CATEGORÍAS</option>
                <option value="sale">OFERTAS</option>
                <option value="tradicional">PESCA TRADICIONAL</option>
                <option value="pescaMosca">PESCA CON MOSCA</option>
              </select>
            </div>

            <div className="row border-top pt-4">
              {productos.map((p) => (
                <CardAdmin
                  key={p.id}
                  {...p}
               
                  onEliminar={() => setProductoAEliminar(p)}
                  onEditar={() => abrirModalEditar(p)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* --- MODAL ELIMINAR --- */}
      {productoAEliminar && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title fw-bold">ELIMINAR PRODUCTO</h5>
                <button className="btn-close btn-close-white" onClick={() => setProductoAEliminar(null)} />
              </div>
              <div className="modal-body text-center p-4">
                <p>¿Estás seguro de eliminar a <strong>{productoAEliminar.name}</strong>?</p>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-secondary" onClick={() => setProductoAEliminar(null)}>CANCELAR</button>
              
                <button className="btn btn-danger fw-bold" onClick={() => eliminarProducto(productoAEliminar.id)}>ELIMINAR</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL EDITAR --- */}
      {productoAEditar && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title fw-bold">MODIFICAR PRODUCTO</h5>
                <button className="btn-close btn-close-white" onClick={() => setProductoAEditar(null)} />
              </div>
              <form onSubmit={guardarCambios}>
                <div className="modal-body p-4">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="fw-bold small">NOMBRE</label>
                      <input className="form-control" value={productoAEditar.name} onChange={(e) => setProductoAEditar({...productoAEditar, name: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                      <label className="fw-bold small">PRECIO</label>
                      <input className="form-control" type="number" value={productoAEditar.price} onChange={(e) => setProductoAEditar({...productoAEditar, price: e.target.value})} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold small">IMAGEN URL</label>
                    <input className="form-control" value={productoAEditar.img} onChange={(e) => setProductoAEditar({...productoAEditar, img: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold small">DESCRIPCIÓN CORTA</label>
                    <input className="form-control" value={productoAEditar.desc || ""} onChange={(e) => setProductoAEditar({...productoAEditar, desc: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold small">DETALLES (separados por coma)</label>
                    <textarea className="form-control" rows="3" value={productoAEditar.detailText} onChange={(e) => setProductoAEditar({...productoAEditar, detailText: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold small">CATEGORÍA</label>
                    <select className="form-select" value={productoAEditar.categoria} onChange={(e) => setProductoAEditar({...productoAEditar, categoria: e.target.value})}>
                      <option value="sale">Sale</option>
                      <option value="tradicional">Tradicional</option>
                      <option value="pescaMosca">PescaMosca</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setProductoAEditar(null)}>CANCELAR</button>
                  <button type="submit" className="btn btn-info text-white fw-bold">GUARDAR CAMBIOS</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL AÑADIR --- */}
      {productoAñadir && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title fw-bold">AÑADIR NUEVO PRODUCTO</h5>
                <button className="btn-close btn-close-white" onClick={() => setProductoAñadir(null)} />
              </div>
              <form onSubmit={guardarProductoNuevo}>
                <div className="modal-body p-4">
                  <input className="form-control mb-3" placeholder="Nombre" value={productoAñadir.name} onChange={(e) => setProductoAñadir({...productoAñadir, name: e.target.value})} required />
                  <input className="form-control mb-3" placeholder="Imagen URL" value={productoAñadir.img} onChange={(e) => setProductoAñadir({...productoAñadir, img: e.target.value})} required />
                  <input className="form-control mb-3" placeholder="Precio" type="number" value={productoAñadir.price} onChange={(e) => setProductoAñadir({...productoAñadir, price: e.target.value})} required />
                  <input className="form-control mb-3" placeholder="Descripción corta" value={productoAñadir.desc} onChange={(e) => setProductoAñadir({...productoAñadir, desc: e.target.value})} required />
                  <textarea className="form-control mb-3" placeholder="Detalles (separados por coma)" value={productoAñadir.detail} onChange={(e) => setProductoAñadir({...productoAñadir, detail: e.target.value})} />
                  <select className="form-select" value={productoAñadir.categoria} onChange={(e) => setProductoAñadir({...productoAñadir, categoria: e.target.value})}>
                    <option value="sale">Sale</option>
                    <option value="tradicional">Tradicional</option>
                    <option value="pescaMosca">PescaMosca</option>
                  </select>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setProductoAñadir(null)}>CANCELAR</button>
                  <button type="submit" className="btn btn-info text-white fw-bold">AÑADIR PRODUCTO</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;