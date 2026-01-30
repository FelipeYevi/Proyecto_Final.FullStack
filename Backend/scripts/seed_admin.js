import "dotenv/config";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { pool } from "../config/db.js";

const run = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = "123123"; 

  const password_hash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO users (id, email, password_hash)
     VALUES ($1,$2,$3)
     ON CONFLICT (email) DO NOTHING`,
    [nanoid(), email, password_hash]
  );

  console.log(" Admin listo:", email, "pass:", password);
  process.exit(0);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
