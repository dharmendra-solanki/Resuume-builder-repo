import express from "express";
import { getUserById, registerUser } from "../controllers/userController.js";
import { loginUser } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
import { getUserResumes } from "../controllers/userController.js";


const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get('/data',protect, getUserById);
userRoutes.get('/resumes', protect, getUserResumes);

export default userRoutes;