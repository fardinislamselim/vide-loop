import { Router } from "express";
import {
  getMyProfile,
  getUserProfile,
  updateProfile,
} from "../controller/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware(), getMyProfile);

router.get("/:username", getUserProfile);

router.patch("/me", authMiddleware(), updateProfile);

export const userRoutes = router;
