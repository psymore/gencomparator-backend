import { Router } from "express";
const router = Router();

import controller from "../controllers/users.js";

router.post("/enter", controller.login);

export default router;
