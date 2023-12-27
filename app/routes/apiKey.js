import { Router } from "express";
import { saveApiKeys } from "../controllers/apiKey.js";
import { verifyToken } from "../middleware/authJwt.js";
const router = Router();

router.post("/api-key", verifyToken, saveApiKeys);

export default router;
