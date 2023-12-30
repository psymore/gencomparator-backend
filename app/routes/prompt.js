import { Router } from "express";
import { verifyToken } from "../middleware/authJwt.js";
import { createPrompt } from "../controllers/prompt.js";
const router = Router();

router.post("/prompt", verifyToken, createPrompt);

export default router;
