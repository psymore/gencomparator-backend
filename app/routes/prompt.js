import { Router } from "express";
import { createPrompt, getPrompt, sendPrompt } from "../controllers/prompt.js";
import {
  createAndSendPrompt,
  getPrompt,
  getResponse,
} from "../controllers/prompt.js";
import { verifyToken } from "../middleware/authJwt.js";
const router = Router();

router.post("/prompt-create-and-send", verifyToken, createAndSendPrompt);
router.get("/prompt/list", verifyToken, getPrompt);
router.post("/prompt-to-llm", verifyToken, sendPrompt);
// router.post("/prompt-to-llm", verifyToken, sendPrompt);
router.get("/prompt/response", verifyToken, getResponse);

export default router;
