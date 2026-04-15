import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Teste 1: buscar usuários
  const users = await prisma.user.findMany();
  console.log("Users:", users);

  // Teste 2: buscar produtos
  const products = await prisma.product.findMany();
  console.log("Products:", products);

  // Teste 3: buscar movimentações
  const movements = await prisma.stockMovement.findMany({
    include: {
      product: true,
    },
  });
  console.log("Movements:", movements);
}

main()
  .catch((e) => {
    console.error("Erro:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
