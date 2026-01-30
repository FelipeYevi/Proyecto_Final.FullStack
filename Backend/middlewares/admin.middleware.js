import "dotenv/config";

export const adminMiddleware = (req, res, next) => {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    return res.status(500).json({ error: "ADMIN_EMAIL not configured in .env" });
  }

  if (!req.user?.email) {
    return res.status(401).json({ error: "No user in token" });
  }

  if (req.user.email !== adminEmail) {
    return res.status(403).json({ error: "Forbidden: not admin" });
  }

  next();
};
