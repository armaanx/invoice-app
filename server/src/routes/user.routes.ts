import { Router } from "express";
import {
  checkSession,
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/user.controller.ts";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").post(logOutUser);
router.route("/check-session").get(checkSession);

export default router;
