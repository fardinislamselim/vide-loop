import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../types/user.interface";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET!;

export const authMiddleware = (roles?: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.token;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const decoded = jwt.verify(token, JWT_SECRET) as any;

      // role check
      if (roles && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }


      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  };
};
