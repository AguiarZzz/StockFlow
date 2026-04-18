import { PrismaClient, Prisma } from "@prisma/client";
import { StockMovementService } from "./stockMovement.service";

const prisma = new PrismaClient();
const stockService = new StockMovementService();

interface CreateProductDTO {
  name: string;
  price: number;
}

export class ProductService {
  async findByName(name: string) {
    return prisma.product.findUnique({
      where: { name },
    });
  }

  async create(data: CreateProductDTO) {
    if (!data.name || data.name.trim() === "") {
      throw new Error("Product name is required");
    }

    if (data.price == null || data.price <= 0) {
      throw new Error("Price must be greater than zero");
    }

    try {
      const product = await prisma.product.create({
        data: {
          name: data.name.trim(),
          price: data.price,
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

  async list() {
    return prisma.product.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  async listWithStock() {
    const products = await prisma.product.findMany({
      orderBy: {
        name: "asc",
      },
    });

    const productsWithStock = await Promise.all(
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

    return productsWithStock;
  }
}
