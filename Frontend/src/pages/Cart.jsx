import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/userContext";
import ModalAlert from "../components/ModalAlert";
import axios from "axios";

const Cart = () => {
  const { cart, removeFromCart, addToCart, total } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { token } = useUser();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const getProductos = async () => {
      try {
        const response = await fetch("https://proyecto-final-fullstack-dh99.onrender.com/api/productos");
        if (!response.ok) throw new Error("Error al obtener los productos");
        await response.json();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProductos();
  }, []);

  const handleCheckout = async () => {
    if (!token) {
      setShowAlert(true);
      return;
    }

    try {
   
      const payload = {
        items: cart.map((producto) => ({
          id: producto.id,
          quantity: producto.quantity,
          unit_price: producto.price 
        })),
      };

      const res = await axios.post(
        "https://proyecto-final-fullstack-dh99.onrender.com/api/checkouts",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage("Pedido realizado con éxito");
    } catch (err) {
      console.error("ERROR CHECKOUT:", err); 
      setError("Error al procesar la compra");
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (cart.length === 0) return <div>No hay productos en el carrito</div>;

  return (
    <div className="container mt-4">
      <h2>Detalles del pedido:</h2>
      <ul className="list-group">
        {cart.map((producto) => (
          <li key={producto.id} className="list-group-item d-flex align-items-center">
            <img src={producto.img} alt={producto.name} className="me-3" style={{ width: "100px", height: "100px" }} />
            <span className="me-auto">{producto.name}</span>
            <span className="me-3">${producto.price.toLocaleString()}</span>
            <button className="btn btn-outline-danger me-2" onClick={() => removeFromCart(producto.id)}>-</button>
            <span>{producto.quantity}</span>
            <button className="btn btn-outline-primary ms-2" onClick={() => addToCart(producto)}>+</button>
          </li>
        ))}
      </ul>
      <h3 className="mt-3">Total: ${total.toLocaleString()}</h3>
      <button className="btn btn-dark mt-2" onClick={handleCheckout}>Pagar</button>
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      <ModalAlert show={showAlert} onClose={() => setShowAlert(false)} message="Debe iniciar sesión para realizar el pago" />
    </div>
  );
};

export default Cart;