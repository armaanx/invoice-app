import { Router } from "express";
import { generatePdf } from "../controllers/invoice.controller.ts";
import { isAuthenticated } from "../middleware/auth.middleware.ts";

const router = Router();

router.route("/generate-pdf").post(isAuthenticated, generatePdf);

export default router;
