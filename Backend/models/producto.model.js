import { pool } from "../config/db.js";

const findAll = async () => {
  const { rows } = await pool.query(
    'SELECT id, name, img, descripcion AS "desc", detail, precio AS price, categoria FROM productos ORDER BY created_at DESC'
  );
  return rows;
};

const findById = async (id) => {
  const { rows } = await pool.query(
    'SELECT id, name, img, descripcion AS "desc", detail, precio AS price, categoria FROM productos WHERE id = $1',
    [id]
  );
  return rows[0];
};

const create = async ({ id, name, img, desc, detail, price, categoria }) => {
  const query = `
    INSERT INTO productos (id, name, img, descripcion, detail, precio, categoria)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, name, img, descripcion AS "desc", detail, precio AS price, categoria`;
  const values = [id, name, img, desc, detail, price, categoria];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const productoModel = { findAll, findById, create };