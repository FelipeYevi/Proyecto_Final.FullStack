import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { authModel } from "../models/auth.model.js";
import { isValidEmail } from "../utils/validators/email.validate.js";

const login = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body;

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({ error: "Email y contraseña requeridos" });
    }

    const user = await authModel.getUserByEmail(email);
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });


    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(400).json({ error: "Contraseña incorrecta" });

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

    const { password_hash, ...userPublic } = user;

    return res.json({
      token,
      ...userPublic,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error en login" });
  }
};

const register = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ error: "Password corto" });
    }

    const exists = await authModel.getUserByEmail(email);
    if (exists) return res.status(400).json({ error: "Usuario ya existe" });

    const password_hash = await bcrypt.hash(password, 10);
    const newUser = { id: nanoid(), email, password_hash, role: "user" };

 
    const created = await authModel.createUser(newUser);
    const { password_hash: _, ...createdPublic } = created || {};

    return res.status(201).json({
      message: "Usuario creado con éxito",
      user: createdPublic,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error en registro" });
  }
};

const me = async (req, res) => {
  try {
   
    const user = await authModel.getUserByEmail(req.user.email);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const { password_hash, ...userPublic } = user;
    return res.json(userPublic);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error en /me" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { email } = req.user;
    const { region, ciudad, direccion, categoria_favorita } = req.body;

    const updatedUser = await authModel.updateUser(email, {
      region,
      ciudad,
      direccion,
      categoria_favorita,
    });

    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al actualizar" });
  }
};


export const authController = { login, register, me, updateProfile };
