import { Router } from "express";
import { createPrompt, getPrompt, sendPrompt } from "../controllers/prompt.js";
import { verifyToken } from "../middleware/authJwt.js";
const router = Router();

router.post("/prompt", verifyToken, createPrompt);
router.get("/prompt/list", verifyToken, getPrompt);
router.post("/prompt-to-llm", verifyToken, sendPrompt);

export default router;
