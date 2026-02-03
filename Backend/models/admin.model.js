
import { pool } from "../config/db.js";

const getUsersAdminList = async () => {
  const { rows } = await pool.query(`
    SELECT 
      id,
      email,
      region,
      ciudad,
      direccion,
      categoria_favorita,
      created_at
    FROM users
    ORDER BY created_at DESC
  `);

  return rows;
};

export const adminModel = {
  getUsersAdminList,
};
