import { Router } from "express";
import { getBlockStateController } from "../controllers/block.controller";

const router = Router();

router.get("/state", getBlockStateController);

export default router;
