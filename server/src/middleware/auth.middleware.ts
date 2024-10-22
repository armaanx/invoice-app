import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  _id: string;
}

const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Access Token is required" });
      }
      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      ) as JwtPayload;

      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        return res.status(401).json({ message: "Invalid Access Token" });
      }

      //@ts-ignore
      req.user = user;
      next();
    } catch (err) {
      if (err instanceof Error) {
        res.status(401).json({ message: err.message });
      } else {
        res.status(401).json({ message: "Something went wrong" });
      }
    }
  }
);

export { verifyToken };
