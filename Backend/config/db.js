import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD || ""),
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
});

pool.connect()
  .then(() => console.log(" Conexión exitosa FullFishing_DB"))
  .catch(err => console.error(" Error conexión:", err.message));