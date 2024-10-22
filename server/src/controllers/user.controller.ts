import { ZodError } from "zod";
import { userLoginSchema, userRegisterSchema } from "../schema/index.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { Request, Response } from "express";
import { User } from "../models/user.model.ts";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    userRegisterSchema.parse(req.body);
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const user = await User.create({ name, email, password });
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new Error("Something went wrong while creating user");
    }

    return res.status(201).json({ user: createdUser });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ message: err.issues[0].message });
    } else if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    userLoginSchema.parse(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found. Please register first.");
    }
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    await User.findByIdAndUpdate(user._id, {
      $set: {
        refreshToken,
      },
    });
    const loggedInUser = await User.findById(user._id).select("-password");
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        user: loggedInUser,
        accessToken,
        refreshToken,
        message: "User logged in successfully",
      });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ message: err.issues[0].message });
    } else if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
});

const logOutUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    await User.findByIdAndUpdate(
      //@ts-ignore
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        message: "User logged out successfully",
      });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
});

export { registerUser, loginUser, logOutUser };
