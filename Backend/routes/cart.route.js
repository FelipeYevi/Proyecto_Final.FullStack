import { Router } from "express";
import { getCart, syncCart } from "../controllers/cart.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js"; 

const router = Router();


router.get("/", verifyToken, getCart);
router.post("/sync", verifyToken, syncCart);

export default router;