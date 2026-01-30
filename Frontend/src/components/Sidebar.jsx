import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [randomProds, setRandomProds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/productos")
      .then((res) => res.json())
      .then((data) => {
        // 4 productos al azar
        const shuffled = [...data].sort(() => 0.5 - Math.random()).slice(0, 4);
        setRandomProds(shuffled);
      });
  }, []);

  return (
    <aside className="col-12 col-md-3 col-lg-2 bg-light border-end p-4 shadow-sm" style={{ minHeight: "100vh" }}>
      <div className="sticky-top" style={{ top: "20px" }}>
        <h5 className="mb-4 fw-bold text-center border-bottom pb-2">CATEGORÍAS</h5>
        <div className="d-grid gap-3 mb-5">
          <Link to="/sale" className="btn btn-outline-dark text-center fw-semibold">OFERTAS</Link>
          <Link to="/tradicional" className="btn btn-outline-dark text-center fw-semibold">PESCA TRADICIONAL</Link>
          <Link to="/PescaMosca" className="btn btn-outline-dark text-center fw-semibold">PESCA MOSCA</Link>
        </div>

        <h6 className="fw-bold text-muted small mb-3">TE PUEDE INTERESAR</h6>
        {randomProds.map((p) => (
          <Link key={p.id} to={`/producto/${p.id}`} className="text-decoration-none text-dark">
            <div className="card mb-3 border-0 shadow-sm overflow-hidden" style={{ transition: "0.3s" }}>
              <div className="row g-0 align-items-center">
                <div className="col-4">
                  <img src={p.img} className="img-fluid rounded-start" alt={p.name} />
                </div>
                <div className="col-8 p-2">
                  <p className="m-0 fw-bold" style={{ fontSize: "0.7rem", lineHeight: "1" }}>{p.name}</p>
                  <p className="m-0 text-primary small font-monospace">${p.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;