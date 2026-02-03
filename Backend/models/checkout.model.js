import { pool } from "../config/db.js";

const crearCheckoutConItems = async ({ user_id, items }) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    
    // item.unit_price viene del payload del frontend
    const total = items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0);

    const checkoutRes = await client.query(
      "INSERT INTO checkouts (user_id, total, estado) VALUES ($1, $2, 'pendiente') RETURNING id",
      [user_id, total]
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
  // JOIN para cambiar IDs X emails de la tabla users
  const query = `
    SELECT 
      c.id, 
      c.total, 
      c.estado, 
      COALESCE(u.email, c.user_id) AS user_email
    FROM checkouts c
    LEFT JOIN users u ON c.user_id = u.id::text
    ORDER BY c.id DESC
  `;
  const { rows } = await pool.query(query);
  return rows;
};

const findItemsByCheckoutId = async (id) => {
  
  const query = `
    SELECT 
      ci.product_id, 
      p.name AS product_name, 
      ci.quantity, 
      ci.unit_price, 
      ci.subtotal 
    FROM checkout_items ci
    JOIN productos p ON ci.product_id = p.id
    WHERE ci.checkout_id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows;
};

const updateEstado = async (id, estado) => {
  await pool.query("UPDATE checkouts SET estado = $1 WHERE id = $2", [estado, id]);
};

export const checkoutModel = { crearCheckoutConItems, findAllAdmin, findItemsByCheckoutId, updateEstado };