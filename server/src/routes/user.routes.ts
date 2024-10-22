import { verifyToken } from "../middleware/auth.middleware.ts";
import {
  loginUser,
  logOutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.ts";
import { Router } from "express";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").post(verifyToken, logOutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
