import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { targetSchema } from "@/schema/targetSchema";
import { verifyJwtToken } from "@/utils/jwtToken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Zod validation
    const isValidLogInData = targetSchema.safeParse(body);
    if (!isValidLogInData) {
      return NextResponse.json(
        { message: "Invalid Input", success: false },
        { status: 400 }
      );
    }

    const { spendingAmount, investmentAmount, totalIncome } = body;
    const token = req.cookies.get("token")?.value;
    const payload = await verifyJwtToken(token);
    const { userId } = payload?.payload;

    const data = await prisma.budget.update({
      where: {
        userId: userId,
      },
      data: {
        spendingAmount: spendingAmount,
        investmentAmount: investmentAmount,
        totalIncome: totalIncome,
      },
    });

    return NextResponse.json(
      { message: "Budget Target Added", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
