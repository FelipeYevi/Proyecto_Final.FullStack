import { checkoutModel } from "../models/checkout.model.js";

const create = async (req, res) => {
  try {
    const { items } = req.body;
    const { email } = req.user; 

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No hay productos" });
    }

    const checkout = await checkoutModel.crearCheckoutConItems({ 
      user_id: email, 
      items 
    });

    res.status(201).json({ checkout });
  } catch (error) {
    console.error("Error al crear checkout:", error);
    res.status(500).json({ error: "Error al procesar pedido" });
  }
};

const getAll = async (req, res) => {
  try {
    const pedidos = await checkoutModel.findAllAdmin();
    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener pedidos" });
  }
};

const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await checkoutModel.findItemsByCheckoutId(id);
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener detalle" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    await checkoutModel.updateEstado(id, estado);
    res.json({ message: "Estado actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar estado" });
  }
};

export const checkoutController = { create, getAll, getDetail, updateStatus };