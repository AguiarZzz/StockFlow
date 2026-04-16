import { ProductService } from "../services/product.service";

const productService = new ProductService();

async function main() {
  const products = await productService.findMany();
  console.log(products);
}
main();
