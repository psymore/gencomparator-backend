import { Router } from "express";
const router = Router();

import { login } from "../controllers/user.js";

router.post("/enter", login);

export default router;
