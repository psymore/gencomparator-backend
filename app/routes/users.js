import { Router } from "express";
const router = Router();

import controller from "../controllers/users.js";

router.post("/enter", controller.login);
router.post("/verify", controller.verify_token);

export default router;
