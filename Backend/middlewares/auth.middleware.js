import "dotenv/config";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const authMiddleware = verifyToken;

export const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ error: "Acceso denegado: Se requiere rol Admin" });
};
