import prisma from "@/db";
import { verifyJwtToken } from "@/utils/jwtToken";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code }: { code: string } = body;

    const token = req.cookies.get("token")?.value;
    const payload = await verifyJwtToken(token);
    const { userId } = payload?.payload;

    const userDeleteCode = await prisma.user.findUnique({
      where: {
        id: userId || "",
      },
      select: {
        deleteToken: true,
      },
    });

    if (code != (userDeleteCode?.deleteToken || "")) {
      return NextResponse.json(
        { message: "Invalid OTP", success: false },
        { status: 400 }
      );
    } else {
      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
    }

    const res = NextResponse.json(
      { message: "User deleted", success: true },
      { status: 200 }
    );
    res.cookies.delete("token");
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
