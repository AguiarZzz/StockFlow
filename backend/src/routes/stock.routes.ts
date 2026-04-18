import { Router } from "express";
import { stockOut } from "../controller/stock.controller";

const router = Router();

router.post("/out", stockOut);

export default router;
