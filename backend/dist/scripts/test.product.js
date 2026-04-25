"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = require("../services/product.service");
const service = new product_service_1.ProductService();
async function main() {
    const products = await service.listWithStock();
    console.log(products);
}
main();
