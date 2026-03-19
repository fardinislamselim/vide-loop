import express from "express";
import { register } from "../controller/auth.controller";

const router = express.Router();

router.post("/register", register);

export const authRoutes = router;