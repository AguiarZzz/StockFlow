import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import stockRoutes from "./routes/stock.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use("/stock", stockRoutes);
app.use("/products", productRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
