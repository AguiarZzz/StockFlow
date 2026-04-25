"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controller/product.controller");
const router = (0, express_1.Router)();
// GET → listar produtos
router.get("/", product_controller_1.getProducts);
// POST → criar produto
router.post("/", product_controller_1.createProduct);
exports.default = router;
