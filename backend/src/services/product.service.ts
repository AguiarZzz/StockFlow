import { PrismaClient, Prisma } from "@prisma/client";
import { StockMovementService } from "./stockMovement.service";
import { ProductResponseDTO } from "../dtos/product.dto";

const prisma = new PrismaClient();
const stockService = new StockMovementService();

interface CreateProductDTO {
  name: string;
}

export class ProductService {
  async findUnique(name: string) {
    const product = await prisma.product.findUnique({
      where: { name },
    });

    if (product) {
      throw new Error("Product already exists");
    }

    return product;
  }

  async create(data: CreateProductDTO) {
    if (!data.name || data.name.trim() === "") {
      throw new Error("Product name is required");
    }

    try {
      const product = await prisma.product.create({
        data: {
          name: data.name.trim(),
        },
      });
      return product;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new Error("Product already exists");
      }
      throw error;
    }
  }

  async findMany() {
    const products = await prisma.product.findMany();
    return products;
  }

  async listWithStock() {
    const products = await prisma.product.findMany({
      orderBy: {
        name: "asc",
      },
    });

    const productWithStock = await Promise.all(
      products.map(async (product) => {
        const stock = await stockService.getStock(product.id);
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          stock,
        };
      }),
    );
    return productWithStock;
  }
}
