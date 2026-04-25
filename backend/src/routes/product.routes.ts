import { Router } from "express";
import { ProductService } from "../services/product.service";
import { getProducts, createProduct } from "../controller/product.controller";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);

export default router;