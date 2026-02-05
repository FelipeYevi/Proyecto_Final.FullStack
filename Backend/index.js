import cors from "cors";
import "dotenv/config";
import express from "express";

import authRoute from "./routes/auth.route.js";
import checkoutRoute from "./routes/checkout.route.js";
import productoRoute from "./routes/producto.route.js";
import userRoute from "./routes/user.route.js"; 
import cartRoute from "./routes/cart.route.js";
import adminRoute from "./routes/admin.route.js";

const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoute);
app.use("/api/productos", productoRoute);
app.use("/api/checkouts", checkoutRoute);
app.use("/api/usuarios", userRoute); 
app.use("/api/admin", adminRoute);

app.use("/api/cart", cartRoute); 


app.use((_, res) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 5000;


if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en https://proyecto-final-fullstack-dh99.onrender.com/${PORT}`);
  });
}

export default app;