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
  } catch (err: any) {
    console.error("ERRO NO CREATE:", err);
    return res.status(400).json({ error: err.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.listWithStock();
    return res.json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};
