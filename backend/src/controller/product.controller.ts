import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

const productService = new ProductService();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;

    const product = await productService.create({
      name,
      price,
    });

    return res.status(201).json(product);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.list();

    return res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
