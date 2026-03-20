import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import User from "../model/user.model";
import config from "../config";

const register = async (req: Request, res: Response) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "Username or Email already exists",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    const hashPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const user = await User.create({
      name,
      username,
      email,
      password: hashPassword,
    });

    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, config.jwt_secret as Secret, {
      expiresIn: config.jwt_expires_in as string,
    });

    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: config.node_env === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, config.jwt_secret as Secret, {
      expiresIn: config.jwt_expires_in as string,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: config.node_env === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export { register, Login, logout };
