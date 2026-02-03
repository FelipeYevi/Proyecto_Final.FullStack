import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import CardProducto from "../../components/CardProducto";
import { useCart } from "../../context/CartContext";

const PescaMosca = () => {
  const [productos, setProductos] = useState([]); 
  const [productosOrdenados, setProductosOrdenados] = useState([]); 
  const { addToCart } = useCart();
    // paginacion logica
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
  const getProductos = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/productos");
      const data = await response.json();
      
      // ✅ CORRECCIÓN SEGURA:
      // Usamos (p.categoria || "") para que si es null, use un texto vacío y no explote.
      const filtrados = data.filter(p => 
        (p.categoria || "").toLowerCase() === "pescamosca"
      );
      
      setProductos(filtrados);
      setProductosOrdenados(filtrados);
    } catch (error) { 
      console.error("Error al cargar productos:", error); 
    }
  };
  getProductos();
}, []);

  const handleSort = (e) => {
    const option = e.target.value;
    let sorted = [...productos];
    if (option === "1") sorted.sort((a, b) => a.price - b.price);
    else if (option === "2") sorted.sort((a, b) => b.price - a.price);
    else if (option === "3") sorted.reverse();
    setProductosOrdenados(sorted);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productosOrdenados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productosOrdenados.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <Sidebar />
        <main className=" col-12 col-md-9 col-lg-10">
          <Header />
          <div className="p-4">
            <h2 className="mb-4 text-uppercase fw-bold border-bottom pb-2 text-center">Pesca con Mosca</h2>
            <div className="d-flex justify-content-center mt-4 mb-2"><h6 className="fw-bold">ORDENAR POR</h6></div>
            <div className="d-flex justify-content-center mb-5">
              <select className="form-select text-center w-50 shadow-sm" defaultValue="" onChange={handleSort}>
                <option value="" disabled>Seleccione una opción</option>
                <option value="1">Menor Precio</option>
                <option value="2">Mayor Precio</option>
                <option value="3">Más nuevos</option>
              </select>
            </div>
            <div className="container">
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                {currentItems.map((producto) => (
                  <div className="col" key={producto.id}>
                    <CardProducto {...producto} />
                  </div>
                ))}
              </div>
            </div>
         
            {/* paginacion */}
            {totalPages > 1 && (
              <nav className="d-flex justify-content-center mt-5">
                <ul className="pagination shadow-lg">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage - 1)}>&lt;&lt;</button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage + 1)}>&gt;&gt;</button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
export default PescaMosca;