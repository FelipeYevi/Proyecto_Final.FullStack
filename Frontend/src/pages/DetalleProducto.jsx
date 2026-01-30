import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Sidebar from "../components/Sidebar";

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:5000/api/productos")
      .then(res => res.json())
      .then(data => {
        const encontrado = data.find(p => p.id === id);
        setProducto(encontrado);
      });
  }, [id]);

  if (!producto) return <div className="text-center mt-5">Cargando producto...</div>;

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <Sidebar />
        <main className="col-12 col-md-9 col-lg-10 p-4">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden mt-4">
            <div className="row g-0">
              <div className="col-md-6">
                <img src={producto.img} className="img-fluid h-100 object-fit-cover" alt={producto.name} style={{minHeight:"400px"}} />
              </div>
              <div className="col-md-6 p-5">
                <Link to={-1} className="btn btn-outline-secondary mb-3 small">← Volver</Link>
                <h1 className="fw-bold text-uppercase">{producto.name}</h1>
                <h2 className="text-primary my-4 font-monospace">${producto.price.toLocaleString()}</h2>
                <div className="bg-light p-3 rounded-3 mb-4">
                  <h5 className="fw-bold">Descripción:</h5>
                  <p>{producto.desc}</p>
                  <ul className="small text-muted">
                    {producto.detail.map((d, i) => <li key={i}>✅ {d}</li>)}
                  </ul>
                </div>
                <button className="btn btn-info text-white btn-lg w-100 fw-bold shadow" onClick={() => addToCart(producto)}>
                  AÑADIR AL CARRITO 🛒
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetalleProducto;