/*
  Warnings:

  - You are about to drop the column `targetAmount` on the `Budget` table. All the data in the column will be lost.
  - Changed the type of `expenseType` on the `Expense` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "targetAmount",
ADD COLUMN     "investmentAmount" INTEGER NOT NULL DEFAULT 10000,
ADD COLUMN     "spendingAmount" INTEGER NOT NULL DEFAULT 10000;

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "expenseType",
ADD COLUMN     "expenseType" INTEGER NOT NULL;
