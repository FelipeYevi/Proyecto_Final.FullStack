import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../Css/CardProducto.css";

const CardProducto = ({ id, name, price, desc, img }) => {
  const { addToCart } = useCart();
  const [añadido, setAñadido] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id, name, price, desc, img });
    setAñadido(true);
    setTimeout(() => setAñadido(false), 2000);
  };

  return (
    <div className="card col-12 mb-4">
      <div className="card shadow-sm rounded-4 overflow-hidden product-card-horizontal">
        <div className="row g-0 h-100 align-items-center">
          <div className="col-md-4 d-flex justify-content-center align-items-center product-img-container">
            <img src={img} alt={name} className="img-fluid" />
          </div>

          <div className="col-md-8 h-100 border-start">
            <div className="card-body d-flex flex-column p-4 h-100">
              <h5 className="fw-bold text-uppercase mb-2 product-title">{name}</h5>

              <div className="flex-grow-1 product-specs-container">
                <p className="fw-bold text-uppercase product-specs-label">DETALLES</p>
                <p className="mb-0 text-muted small">{desc}</p>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                <div>
                  <span className="text-uppercase d-block price-label">Precio</span>
                  <h4 className="fw-bold mb-0 price-value">
                    ${price ? price.toLocaleString() : "0"}
                  </h4>
                </div>

                <div className="d-flex gap-2">
                  <Link to={`/producto/${id}`} className="btn btn-outline-secondary btn-custom">
                    VER MÁS
                  </Link>
                  <button
                    className={`btn text-white btn-custom ${añadido ? "btn-added" : "btn-info"}`}
                    onClick={handleAddToCart}
                    disabled={añadido}
                  >
                    {añadido ? "AÑADIDO ✓" : "AÑADIR 🛒"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProducto;