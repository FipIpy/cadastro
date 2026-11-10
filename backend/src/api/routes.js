import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  editUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.put("/edit/:id", editUser);
router.get("/allUsers", getAllUser);
router.delete("/delete/:id", deleteUser);

export default router;
