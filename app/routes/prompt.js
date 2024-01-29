import { Router } from "express";
import { createAndSendPrompt, getPrompt } from "../controllers/prompt.js";
import { verifyToken } from "../middleware/authJwt.js";
const router = Router();

router.post("/prompt-create-and-send", verifyToken, createAndSendPrompt);
// router.get("/prompt/list", verifyToken, getPrompt);
router.get("/prompt/list", getPrompt);

export default router;
