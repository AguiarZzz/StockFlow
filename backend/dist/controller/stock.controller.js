"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockOut = void 0;
const stockMovement_service_1 = require("../services/stockMovement.service");
const stockService = new stockMovement_service_1.StockMovementService();
const stockOut = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const movement = await stockService.createMovement({
            productId,
            quantity,
            type: "OUT",
        });
        return res.status(201).json(movement);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.stockOut = stockOut;
