import { Request, Response } from "express";
import { StockMovementService } from "../services/stockMovement.service";
import { MovementType } from "@prisma/client";

const stockService = new StockMovementService();

export const stockOut = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    const movement = await stockService.createMovement({
      productId,
      quantity,
      type: MovementType.OUT,
    });
    return res.status(201).json(movement);
  } catch (error: any) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

export const stockIn = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    console.log("CHEGOU NO STOCK IN");

    const movement = await stockService.createMovement({
      productId,
      quantity,
      type: "IN",
    });

    return res.status(201).json(movement);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
