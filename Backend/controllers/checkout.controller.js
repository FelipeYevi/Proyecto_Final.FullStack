import { checkoutModel } from "../models/checkout.model.js";

const create = async (req, res) => {
  try {
    const { cart, total } = req.body;
    const { id: user_id, email } = req.user;

    if (!cart || !cart.length || !total) {
      return res.status(400).json({ error: "Datos de checkout incompletos" });
    }

    const checkout = await checkoutModel.crearCheckout({
      user_id,
      total,
    });

    return res.status(201).json({
      message: "Checkout exitoso",
      checkout,
      cart,
      user: {
        id: user_id,
        email,
      },
    });
  } catch (error) {
 
    return res.status(500).json({ error: "Server error" });
  }
};

export const checkoutController = {
  create,
};
