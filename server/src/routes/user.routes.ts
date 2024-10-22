import { verifyToken } from "../middleware/auth.middleware.ts";
import {
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/user.controller.ts";
import { Router } from "express";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").post(verifyToken, logOutUser);

export default router;
