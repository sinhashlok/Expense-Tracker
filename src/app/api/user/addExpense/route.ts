import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { targetSchema } from "@/schema/targetSchema";
import { verifyJwtToken } from "@/utils/jwtToken";

export async function POST(req: NextRequest) {
  try {
    // Zod validation
    // const isValidLogInData = targetSchema.safeParse(body);
    // if (!isValidLogInData) {
    //   return NextResponse.json(
    //     { message: "Invalid Input", success: false },
    //     { status: 400 }
    //   );
    // }

    const body = await req.json();
    const {
      title,
      amount,
      expenseType,
      createdAt,
    }: {
      title: string;
      amount: number;
      expenseType: number;
      createdAt: string;
    } = body;
    const token = req.cookies.get("token")?.value;
    const payload = await verifyJwtToken(token);
    const { userId } = payload?.payload;
    const date = new Date(createdAt);
    const month = date.getMonth();

    await prisma.expense.create({
      data: {
        userId: userId,
        title: title,
        amount: amount,
        expenseType: expenseType,
        month: month,
        createdAt: date,
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
