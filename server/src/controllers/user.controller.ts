import { User } from "../models/user.model.ts";
import { userLoginSchema, userRegisterSchema } from "../schema/index.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { Request, Response } from "express";
import { ZodError } from "zod";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      userRegisterSchema.parse(req.body);
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User with this email already exists");
      }
      const user = await User.create({ name, email, password });
      const createdUser = await User.findById(user._id).select("-password");
      if (!createdUser) {
        res
          .status(400)
          .json({ message: "Something went wrong while creating user" });
      }
      return res.status(201).json({ message: "User Registered successfully" });
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ message: err.issues[0].message });
      } else if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    userLoginSchema.parse(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.isValidPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session.userId = user._id as string;
    res.status(200).json({ userId: user._id });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ message: err.issues[0].message });
    } else if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
});

export const logOutUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: "Error logging out" });
      res.status(200).json({ message: "Logged out" });
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ message: err.issues[0].message });
    } else if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
});

export const checkSession = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      if (req.session.userId) {
        return res.status(200).json({ message: "Session is valid" });
      } else {
        return res.status(401).json({ message: "Session expired" });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ message: err.issues[0].message });
      } else if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      }
    }
  }
);
