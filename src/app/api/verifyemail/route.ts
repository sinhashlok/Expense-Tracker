import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;

    const user = await prisma.user.findUnique({
      where: {
        verifyToken: token,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    user.isVerified = true;
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verifyToken: null,
        isVerified: true,
      },
    });

    return NextResponse.json(
      { message: "Email Verified", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
