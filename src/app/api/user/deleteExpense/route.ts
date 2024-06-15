import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { verifyJwtToken } from "@/utils/jwtToken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    const token = req.cookies.get("token")?.value;
    const payload = await verifyJwtToken(token);
    const { userId } = payload?.payload;

    await prisma.expense.delete({
      where: {
        id: id,
        userId: userId,
      },
    });

    return NextResponse.json(
      { message: "Expense added", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
