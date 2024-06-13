import prisma from "@/db";
import { UserData } from "@/schema/dbScehma";
import { verifyJwtToken } from "@/utils/jwtToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const payload = await verifyJwtToken(token);
    const { userId } = payload?.payload;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        expenses: {
          select: {
            id: true,
            title: true,
            amount: true,
            createdAt: true,
            month: true,
            expenseType: true,
          },
        },
        budget: {
          select: {
            id: true,
            spendingAmount: true,
            investmentAmount: true,
            totalIncome: true,
          },
        },
      },
    });
    return NextResponse.json(
      { message: "User found", success: true, data: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
