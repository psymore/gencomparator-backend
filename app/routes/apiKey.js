import { Router } from "express";
import { getApiKeys, upsertApiKeys } from "../controllers/apiKey.js";
import { verifyToken } from "../middleware/authJwt.js";
const router = Router();

router.post("/api-key", verifyToken, upsertApiKeys);
router.get("/api-key/list", verifyToken, getApiKeys);

export default router;
