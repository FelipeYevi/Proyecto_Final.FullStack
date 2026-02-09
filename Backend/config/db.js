import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

const isProduction = process.env.NODE_ENV === "production";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

pool.connect()
  .then(() => console.log("✅ Conexión exitosa a la base de datos"))
  .catch(err => console.error("❌ Error conexión:", err.message));