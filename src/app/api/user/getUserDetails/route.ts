import prisma from "@/db";
import { verifyJwtToken } from "@/utils/jwtToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const payload = await verifyJwtToken(token);
    const { userId } = payload?.payload;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
      },
    });

    const expenseDetails = await prisma.expense.findMany({
      where: {
        userId: userId,
      },
      select: {
        amount: true,
        expenseType: true,
      },
    });

    return NextResponse.json({
      message: "User Details Found",
      success: true,
      data: [user, expenseDetails],
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
