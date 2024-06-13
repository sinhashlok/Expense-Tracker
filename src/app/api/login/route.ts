import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { loginSchema } from "@/schema/loginSchema";
import bcryptjs from "bcryptjs";
import { createJwtToken } from "@/utils/jwtToken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Zod validation
    const isValidLogInData = loginSchema.safeParse(body);
    if (!isValidLogInData) {
      return NextResponse.json(
        { message: "Invalid Input", success: false },
        { status: 400 }
      );
    }

    const { email, password } = body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { message: "No such user exists", success: false },
        { status: 400 }
      );
    }

    // Password verify
    const verifyPassword = await bcryptjs.compare(password, user.password);
    if (!verifyPassword) {
      return NextResponse.json(
        { message: "Invalid password", success: false },
        { status: 400 }
      );
    }

    // User verified before signing
    if (!user.isVerified) {
      return NextResponse.json(
        { message: "User not verified", success: false },
        { status: 400 }
      );
    }

    const token = await createJwtToken(user.id, user.name);

    // Check: First time login -> Create Budget Data
    const budgetExist = await prisma.budget.findUnique({
      where: {
        userId: user.id,
      },
    });
    console.log(budgetExist);
    
    let exists = true;
    if (!budgetExist) {
      exists = false;
      await prisma.budget.create({
        data: {
          userId: user.id,
        },
      });
    }

    const res = NextResponse.json(
      { message: "Login successful", success: true, data: exists },
      { status: 200 }
    );
    res.cookies.set("token", token);
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
