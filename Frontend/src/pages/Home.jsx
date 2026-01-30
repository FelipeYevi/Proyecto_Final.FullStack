import React, { useEffect, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import "../Css/Home.css";
import Categorias from "../data/Categorias.json";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const { addToCart } = useCart();

  const getProductos = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/productos");
      const data = await response.json();
      if (Array.isArray(data)) {
        setProductos(data);
      }
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="container-fluid p-0">
      {/* Header carrusel (solo para home)*/}
      <HomeHeader />

      {/* categorias */}
      <div className="container mt-5">
        <h1 className="text-center mb-5 fw-bold">NUESTRAS CATEGORÍAS</h1>

        <div className="row g-4 justify-content-center">
          {Categorias.map((cat) => (
            <div className="col-12 col-md-4" key={cat.id}>
              <Link to={cat.path} className="text-decoration-none text-dark">
                <div className="card border-0 shadow-sm h-100 category-card">
                  {/* img */}
                  <div className="overflow-hidden category-img-wrapper">
                    <img
                      src={cat.img}
                      className="card-img-top category-img"
                      alt={cat.titulo}
                    />
                  </div>

                  {/* titulo */}
                  <div className="card-body text-center bg-white">
                    <h3 className="fw-bold text-uppercase">{cat.titulo}</h3>

                    <hr className="mx-auto w-25 my-2" />

                    <p className="text-muted small">{cat.descripcion}</p>

                    <span className="ver-productos fw-bold text-primary">
                      VER PRODUCTOS →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
