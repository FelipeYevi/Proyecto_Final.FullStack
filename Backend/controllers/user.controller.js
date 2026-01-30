import { pool } from "../config/db.js";

export const userController = {
  updateProfile: async (req, res) => {
    try {
      const { email } = req.user; 
      const { region, ciudad, direccion, categoria_favorita } = req.body;

 
      const query = `
        UPDATE users 
        SET region = $1, ciudad = $2, direccion = $3, categoria_favorita = $4 
        WHERE email = $5 
        RETURNING id, email, role, region, ciudad, direccion, categoria_favorita`;
      
      const result = await pool.query(query, [region, ciudad, direccion, categoria_favorita, email]);
      
      if (result.rowCount === 0) return res.status(404).json({ error: "Usuario no encontrado" });
      res.json(result.rows[0]);
    } catch (error) {
      console.error("ERROR EN EL SERVIDOR:", error); 
      res.status(500).json({ error: "Error interno al actualizar" });
    }
  },

  getStats: async (req, res) => {
    try {
      const { email } = req.user;
      const userRes = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
      
      if (userRes.rowCount === 0) return res.json({ pedidosCount: 0 });
      
      const userId = userRes.rows[0].id;

      const countRes = await pool.query("SELECT COUNT(*) FROM pedidos WHERE user_id = $1", [userId]);
      
      res.json({ pedidosCount: parseInt(countRes.rows[0].count) || 0 });
    } catch (error) {
      res.json({ pedidosCount: 0 });
    }
  }
};