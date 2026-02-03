
import { adminModel } from "../models/admin.model.js";

export const adminController = {
  listUsers: async (req, res) => {
    try {
      const users = await adminModel.getUsersAdminList();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener usuarios" });
    }
  },
};
