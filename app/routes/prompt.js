import { Router } from "express";
<<<<<<< Updated upstream
import { createPrompt, getPrompt } from "../controllers/prompt.js";
=======
import {
  createAndSendPrompt,
  getPrompt,
  getResponse,
} from "../controllers/prompt.js";
>>>>>>> Stashed changes
import { verifyToken } from "../middleware/authJwt.js";
const router = Router();

router.post("/prompt-create-and-send", verifyToken, createAndSendPrompt);
router.get("/prompt/list", verifyToken, getPrompt);
<<<<<<< Updated upstream
=======
// router.post("/prompt-to-llm", verifyToken, sendPrompt);
router.get("/prompt/response", verifyToken, getResponse);
>>>>>>> Stashed changes

export default router;
