import { StockMovementService } from "../services/stockMovement.service";

const service = new StockMovementService();

async function main() {
  await service.createMovement({
    productId: "b5cf34f0-5eec-40c5-914f-70e38aa8e97d",
    quantity: 10,
    type: "IN",
  });

  await service.createMovement({
    productId: "b5cf34f0-5eec-40c5-914f-70e38aa8e97d",
    quantity: 3,
    type: "OUT",
  });

  const stock = await service.getStock("b5cf34f0-5eec-40c5-914f-70e38aa8e97d");
  console.log(stock);
}
main();
