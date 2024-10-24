import { NextFunction, Request, Response } from "express";

declare module "express-session" {
  interface Session {
    userId?: string;
  }
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.userId) {
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
