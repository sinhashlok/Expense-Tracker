-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isVerified" SET DEFAULT false,
ALTER COLUMN "verifyToken" DROP NOT NULL;
