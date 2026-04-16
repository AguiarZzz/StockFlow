import { PrismaClient } from "@prisma/client";
import { MovementType } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateStockMovementDTO {
  productId: string;
  quantity: number;
  type: MovementType;
}

export class StockMovementService {
  async findByProductId(productId: string) {
    const movements = await prisma.stockMovement.findMany({
      where: { productId },
    });

    let stock = 0;

    for (const movement of movements) {
      if (movement.type === "IN") {
        stock += movement.quantity;
      } else {
        stock -= movement.quantity;
      }
    }

    return stock;
  }

  async getStock(productId: string): Promise<number> {
    const movements = await prisma.stockMovement.findMany({
      where: { productId },
    });
    let stock = 0;

    for (const movement of movements) {
      if (movement.type === "IN") {
        stock += movement.quantity;
      } else {
        stock -= movement.quantity;
      }
    }
    return stock;
  }

  async createMovement(data: CreateStockMovementDTO) {
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
