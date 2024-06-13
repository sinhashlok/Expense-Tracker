import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const res = NextResponse.json(
      { message: "Logout successful", success: true },
      { status: 200 }
    );
    res.cookies.delete("token");
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
