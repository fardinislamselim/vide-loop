import express from "express";
import { Login, logout, register } from "../controller/auth.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", Login);
router.get("/logout", logout);

export const authRoutes = router;