import { PrismaClient, MovementType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const product1 = await prisma.product.create({
    data: {
      name: "Notebook",
      price: 3500,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Mouse",
      price: 80,
    },
  });

  await prisma.stockMovement.createMany({
    data: [
      {
        productId: product1.id,
        type: MovementType.IN,
        quantity: 10,
      },
      {
        productId: product1.id,
        type: MovementType.OUT,
        quantity: 2,
      },
      {
        productId: product2.id,
        type: MovementType.IN,
        quantity: 50,
      },
    ],
  });

  console.log("🌱 Seed executado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
