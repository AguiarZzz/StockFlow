"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockMovementService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class StockMovementService {
    async findByProductId(productId) {
        const movements = await prisma.stockMovement.findMany({
            where: { productId },
        });
        let stock = 0;
        for (const movement of movements) {
            if (movement.type === "IN") {
                stock += movement.quantity;
            }
            else {
                stock -= movement.quantity;
            }
        }
        return stock;
    }
    async getStock(productId) {
        const movements = await prisma.stockMovement.findMany({
            where: { productId },
        });
        let stock = 0;
        for (const movement of movements) {
            if (movement.type === "IN") {
                stock += movement.quantity;
            }
            else {
                stock -= movement.quantity;
            }
        }
        return stock;
    }
    async createMovement(data) {
        if (data.quantity <= 0) {
            throw new Error("Quantity must be greater than zero");
        }
        const product = await prisma.product.findUnique({
            where: { id: data.productId },
        });
        if (!product) {
            throw new Error("Product not found");
        }
        const currentStock = await this.getStock(data.productId);
        if (data.type === "OUT" && data.quantity > currentStock) {
            throw new Error("Insufficient stock for this movement");
        }
        const movement = await prisma.stockMovement.create({
            data,
        });
        return movement;
    }
}
exports.StockMovementService = StockMovementService;
