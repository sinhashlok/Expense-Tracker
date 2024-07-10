import prisma from "@/db";
import { verifyJwtToken } from "@/utils/jwtToken";
import sendDeleteAccountOTPEmail from "@/utils/sendDeleteAccountOTPEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const payload = await verifyJwtToken(token);
    const { userId } = payload?.payload;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
      },
    });

    await sendDeleteAccountOTPEmail({
      email: user?.email || "",
      userId: user?.id || "",
    });
    return NextResponse.json(
      { message: "OTP sent on Email", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
