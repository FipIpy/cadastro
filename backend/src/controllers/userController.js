import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UsersDB = mongoose.model("users", {
  name: String,
  email: { type: String, unique: true },
  password: String,
  teacher: Boolean,
  admin: Boolean,
});

export const createUser = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    const existingUser = await UsersDB.findOne({ email }).select("_id");

    if (existingUser) {
      return res.status(409).json({ error: "Este e-mail já está cadastrado" });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    UsersDB.create({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
      teacher: req.body.teacher,
      admin: req.body.admin,
    });

    return res.status(201).json({ message: "Cadastro realizado com sucesso" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Este e-mail já está cadastrado" });
    }
    res.status(500).json({ error: "Não foi possível realizar o cadastro" });
  }
};

export const getAllUser = (req, res) => {
  UsersDB.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(users);
  });
};

export const editUser = (req, res) => {
  const { id } = req.params;
  const { name, email, password, teacher, admin } = req.body;
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
};
