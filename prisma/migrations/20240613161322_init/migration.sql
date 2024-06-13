/*
  Warnings:

  - You are about to drop the column `amountLeft` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `totalSpent` on the `Budget` table. All the data in the column will be lost.
  - Added the required column `month` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "amountLeft",
DROP COLUMN "totalSpent";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "month" INTEGER NOT NULL;
