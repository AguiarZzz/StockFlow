import { Router } from "express";
import { getProducts, createProduct } from "../controller/product.controller";

const router = Router();

// GET → listar produtos
router.get("/", getProducts);

// POST → criar produto
router.post("/", createProduct);

export default router;
