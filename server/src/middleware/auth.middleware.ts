import { asyncHandler } from "../utils/asyncHandler.ts";
import { NextFunction, Request, Response } from "express";

declare module "express-session" {
  interface Session {
    userId?: string;
  }
}

export const isAuthenticated = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.session.userId) {
        return next();
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } catch (err) {
      return next(err);
    }
  }
);
