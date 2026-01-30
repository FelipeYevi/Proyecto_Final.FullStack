import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Ruta actualizar datoperfil
router.put("/perfil", authMiddleware, userController.updateProfile);

// Ruta estadísticas pedidos
router.get("/stats", authMiddleware, userController.getStats);

export default router;