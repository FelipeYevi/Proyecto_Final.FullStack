import cors from "cors";
import "dotenv/config";
import express from "express";

import authRoute from "./routes/auth.route.js";
import checkoutRoute from "./routes/checkout.route.js";
import productoRoute from "./routes/producto.route.js";
import userRoute from "./routes/user.route.js"; 
import cartRoute from "./routes/cart.route.js"; // <-- NUEVA RUTA AGREGADA

const app = express();

app.use(express.json());
app.use(cors());

// Rutas originales preservadas
app.use("/api/auth", authRoute);
app.use("/api/productos", productoRoute);
app.use("/api/checkouts", checkoutRoute);
app.use("/api/usuarios", userRoute); 

// Nueva ruta para la persistencia del carrito
app.use("/api/cart", cartRoute); // <-- CONEXIÓN AGREGADA

// Manejo de rutas no encontradas (Preservado)
app.use((_, res) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 5000;

// Configuración de arranque y tests (Preservado)
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

export default app;