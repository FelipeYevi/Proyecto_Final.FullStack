import { Router } from "express";
import { productoController } from "../controllers/producto.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

// Públicas
router.get("/", productoController.readProductos); 
router.get("/:id", productoController.readProducto); 

// Privadas 
router.post("/", authMiddleware, adminMiddleware, productoController.createProducto);
router.put("/:id", authMiddleware, adminMiddleware, productoController.updateProducto);
router.delete("/:id", authMiddleware, adminMiddleware, productoController.deleteProducto);

export default router;