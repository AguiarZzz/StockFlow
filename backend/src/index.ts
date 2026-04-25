import express, { Request, Response } from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import stockRoutes from "./routes/stock.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/products", productRoutes);
app.use("/stock", stockRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
