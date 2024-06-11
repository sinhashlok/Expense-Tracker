import { PrismaClient } from "@prisma/client";
import { EXPENSE_TABLE } from "../src/utils/data";
const prisma = new PrismaClient();
async function main() {
  const expenseTable = await prisma.eXPENSE_TYPE.createMany({
    data: EXPENSE_TABLE,
  });
  console.log(expenseTable);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
