import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/userContext";
import "../Css/Navbar.css";

const Navbar = () => {
  const { total, handleLogoutCart } = useCart();
  const { token, role, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await handleLogoutCart();
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3 p-0">
      <div className="d-flex align-items-center gap-2">
        <img
          src="../src/assets/img/logo-full-fishing.png"
          alt="Logo Full Fishing"
          className="navbar-logo"
        />
        <span className="navbar-brand fw-bold m-0">FULL FISHING</span>
      </div>
      <div>
        <Link to="/" className="btn btn-secondary mx-1">
          🏠 Home
        </Link>

        {token ? (
          <>
            {role === "admin" && (
              <Link to="/adminpage" className="btn btn-warning mx-1 fw-bold">
                ⚙️ Admin Panel
              </Link>
            )}
            {role === "user" && (
              <Link to="/profile" className="btn btn-secondary mx-1">
                🔓 Profile
              </Link>
            )}

            <button onClick={handleLogout} className="btn btn-danger mx-1">
              🔒 Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary mx-1">
              🔐 Login
            </Link>
            <Link to="/register" className="btn btn-secondary mx-1">
              🔐 Register
            </Link>
          </>
        )}
        {role !== "admin" && (
          <Link to="/cart" className="btn btn-success mx-1">
            🛒 Total: ${total.toLocaleString()}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
