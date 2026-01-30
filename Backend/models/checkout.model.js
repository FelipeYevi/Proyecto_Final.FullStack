import { pool } from "../config/db.js";

const crearCheckout = async ({ user_id, total }) => {
  const query = {
    text: `
      INSERT INTO checkouts (user_id, total)
      VALUES ($1, $2)
      RETURNING *
    `,
    values: [user_id, total],
  };

  const { rows } = await pool.query(query);
  return rows[0];
};

const obtenerCheckoutsPorUsuario = async (user_id) => {
  const query = {
    text: `
      SELECT * FROM checkouts
      WHERE user_id = $1
      ORDER BY created_at DESC
    `,
    values: [user_id],
  };

  const { rows } = await pool.query(query);
  return rows;
};

export const checkoutModel = {
  crearCheckout,
  obtenerCheckoutsPorUsuario,
};
