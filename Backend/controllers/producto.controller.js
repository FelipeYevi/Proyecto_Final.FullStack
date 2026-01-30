import { productoModel } from "../models/producto.model.js";
import { pool } from "../config/db.js";

export const productoController = {
  // obtener todos
  readProductos: async (req, res) => {
    try {
      const productos = await productoModel.findAll();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener productos" });
    }
  },

  // btener uno
  readProducto: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await productoModel.findById(id);
      if (!producto) return res.status(404).json({ error: "No encontrado" });
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: "Error de servidor" });
    }
  },

  //Crear
  createProducto: async (req, res) => {
    try {
      const { id, name, img, desc, detail, price, categoria } = req.body;
      const nuevo = await productoModel.create({ id, name, img, desc, detail, price, categoria });
      res.status(201).json(nuevo);
    } catch (error) {
      res.status(500).json({ error: "Error al crear" });
    }
  },

  //actualizar
  updateProducto: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, img, desc, detail, price, categoria } = req.body;
      const result = await pool.query(
        "UPDATE productos SET name=$1, img=$2, descripcion=$3, detail=$4, precio=$5, categoria=$6 WHERE id=$7",
        [name, img, desc, detail, price, categoria, id]
      );
      if (result.rowCount === 0) return res.status(404).json({ error: "No encontrado" });
      res.json({ message: "Actualizado" });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar" });
    }
  },

  // eliminar
  deleteProducto: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query("DELETE FROM productos WHERE id = $1", [id]);
      if (result.rowCount === 0) return res.status(404).json({ error: "No encontrado" });
      res.json({ message: "Eliminado" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar" });
    }
  }
};