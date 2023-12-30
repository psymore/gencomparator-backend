import { Router } from "express";
import { verifyToken } from "../middleware/authJwt.js";
import {
  createPromptTemplates,
  getPromptTemplates,
} from "../controllers/promptTemplate.js";
const router = Router();

router.get("/prompt-template/list", verifyToken, getPromptTemplates);
// router.post("/prompt-template", verifyToken, createPromptTemplates);s

export default router;
