import { pool } from "../config/db.js";

const crearCheckoutConItems = async ({ user_id, items }) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    
    const total = items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0);

    // Corregimos para que coincida exactamente con la columna 'estado' que creamos
    const checkoutRes = await client.query(
      "INSERT INTO checkouts (user_id, total, estado) VALUES ($1, $2, $3) RETURNING id",
      [user_id, total, 'Pendiente']
    );
    const checkoutId = checkoutRes.rows[0].id;

    for (const item of items) {
      await client.query(
        "INSERT INTO checkout_items (checkout_id, product_id, quantity, unit_price, subtotal) VALUES ($1, $2, $3, $4, $5)",
        [checkoutId, item.id, item.quantity, item.unit_price, item.unit_price * item.quantity]
      );
    }

    await client.query("COMMIT");
    return { id: checkoutId };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const findAllAdmin = async () => {
  // Limpiamos el JOIN: comparamos números con números (c.user_id = u.id)
  const query = `
    SELECT 
      c.id, 
      c.total, 
      c.estado, 
      u.email AS user_email,
      c.fecha
    FROM checkouts c
    LEFT JOIN users u ON c.user_id = u.id
    ORDER BY c.id DESC
  `;
  const { rows } = await pool.query(query);
  return rows;
};

// ... (findItemsByCheckoutId y updateEstado se mantienen igual)
export const checkoutModel = { crearCheckoutConItems, findAllAdmin, findItemsByCheckoutId, updateEstado };