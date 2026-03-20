import { Request, Response } from "express";
import User from "../model/user.model";

export const getMyProfile = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId)
      .populate("followers", "username image")
      .populate("following", "username image")
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username })
      .populate("followers", "username image")
      .populate("following", "username image")
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateProfile = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;

    const { name, username, bio, image, phone } = req.body;

    // যদি username update করতে চাও → unique check
    if (username) {
      const existingUser = await User.findOne({ username });

      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({
          success: false,
          message: "Username already taken",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        username,
        bio,
        image,
        phone,
      },
      { new: true, runValidators: true },
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};