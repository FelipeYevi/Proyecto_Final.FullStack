import { pool } from "../config/db.js";

const getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const { rows } = await pool.query(query, [email]);
  return rows[0] || null;
};

const createUser = async ({ email, password_hash, role = 'user' }) => {
  const query = `
    INSERT INTO users (email, password_hash, role, region, ciudad, direccion, categoria_favorita)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;

  const values = [
    email, 
    password_hash, 
    role, 
    "", 
    "", 
    "", 
    "Pesca con mosca"
  ];
  
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const updateUser = async (email, { region, ciudad, direccion, categoria_favorita }) => {
  const query = `
    UPDATE users 
    SET region = $1, ciudad = $2, direccion = $3, categoria_favorita = $4
    WHERE email = $5
    RETURNING id, email, role, region, ciudad, direccion, categoria_favorita
  `;
  const values = [region, ciudad, direccion, categoria_favorita, email];
  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};

export const authModel = { getUserByEmail, createUser, updateUser };