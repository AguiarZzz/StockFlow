"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.createProduct = void 0;
const product_service_1 = require("../services/product.service");
const productService = new product_service_1.ProductService();
const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        const product = await productService.create({
            name,
            price,
        });
        return res.status(201).json(product);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.createProduct = createProduct;
const getProducts = async (req, res) => {
    try {
        const products = await productService.list();
        return res.status(200).json(products);
    }
    catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.getProducts = getProducts;
