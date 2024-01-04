import { Router } from "express";
import { getPromptTemplates } from "../controllers/promptTemplate.js";
import { verifyToken } from "../middleware/authJwt.js";

const router = Router();

router.get("/prompt-template/list", verifyToken, getPromptTemplates);

export default router;
