import { Request, Response } from "express";
import { StockMovementService } from "../services/stockMovement.service";

const stockService = new StockMovementService();

export const stockOut = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    const movement = await stockService.createMovement({
      productId,
      quantity,
      type: "OUT",
    });
    return res.status(201).json(movement);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
