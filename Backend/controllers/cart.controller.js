import { pool } from "../config/db.js";

// Exportación
export const getCart = async (req, res) => {
  try {
    const { email } = req.user; 
    const result = await pool.query(
      "SELECT * FROM cart_items WHERE user_email = $1",
      [email]
    );
    
    const formattedCart = result.rows.map(item => ({
      id: item.product_id,
      name: item.name,
      price: item.price,
      img: item.img,
      quantity: item.quantity
    }));
    
    res.json(formattedCart);
  } catch (error) {
    console.error("Error al obtener carrito:", error);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
};

// Exportación 
export const syncCart = async (req, res) => {
  try {
    const { email } = req.user;
    const { cart } = req.body;

    // Limpia carro anterior
    await pool.query("DELETE FROM cart_items WHERE user_email = $1", [email]);

    // inset nuevo carro
    if (cart && cart.length > 0) {
      for (const item of cart) {
        await pool.query(
          "INSERT INTO cart_items (user_email, product_id, name, price, img, quantity) VALUES ($1, $2, $3, $4, $5, $6)",
          [email, item.id, item.name, item.price, item.img, item.quantity]
        );
      }
    }
    res.json({ message: "Carrito sincronizado" });
  } catch (error) {
    console.error("Error al sincronizar carrito:", error);
    res.status(500).json({ error: "Error al sincronizar el carrito" });
  }
};