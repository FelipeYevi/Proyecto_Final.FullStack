import { Router } from "express";
import { checkoutController } from "../controllers/checkout.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();


router.post("/", authMiddleware, checkoutController.create);

// Rutas admin
router.get("/admin/listado", authMiddleware, adminMiddleware, checkoutController.getAll);
router.get("/admin/detalle/:id", authMiddleware, adminMiddleware, checkoutController.getDetail);
router.patch("/admin/estado/:id", authMiddleware, adminMiddleware, checkoutController.updateStatus);

export default router;