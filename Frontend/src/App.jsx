import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import NotFoundPage from "./pages/NotFoundPage";
import PescaMosca from "./pages/Productos/PescaMosca";
import Sale from "./pages/Productos/Sale";
import Tradicional from "./pages/Productos/Tradicional";
import DetalleProducto from "./pages/DetalleProducto";
import AdminPage from "./pages/AdminPage";
import AdminPedidos from "./pages/adminPedidos";

import AdminUsuarios from "./pages/adminUsuarios";

import { useUser } from "./context/userContext";

const App = () => {
  const { token, role } = useUser();

  return (
    <>
      <Navbar />
      <Routes>
        {/* rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/Producto/:id" element={<DetalleProducto />} />
        <Route path="/Sale" element={<Sale />} />
        <Route path="/PescaMosca" element={<PescaMosca />} />
        <Route path="/Tradicional" element={<Tradicional />} />
        <Route path="/cart" element={<Cart />} />

        {/* rutas de autenticación */}
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/" /> : <RegisterPage />}
        />

        {/* rutas protegidas */}
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />

        {/* ruta admin  */}
        <Route
          path="/AdminPage"
          element={
            token && role === "admin" ? <AdminPage /> : <Navigate to="/" />
          }
        />
        <Route path="/adminPedidos" element={<AdminPedidos />} />

        <Route path="*" element={<NotFoundPage />} />

        <Route path="/adminUsuarios" element={<AdminUsuarios />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
