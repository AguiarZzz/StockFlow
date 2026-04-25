import { Router } from "express";
import { stockIn, stockOut } from "../controller/stock.controller";

const router = Router();

router.post("/in", stockIn);
router.post("/out", stockOut);

router.post(
  "/in",
  (req, res, next) => {
    console.log("BATEU /IN");
    next();
  },
  stockIn,
);

console.log("STOCK ROUTES CARREGADAS");

export default router;
