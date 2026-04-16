import { ProductService } from "../services/product.service";

const service = new ProductService();

async function main() {
  const products = await service.listWithStock();
  console.log(products);
}

main();
