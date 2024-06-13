import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "@/utils/jwtToken";

export async function middleware(req: NextRequest) {
  console.log(req.method);
  const token = req.cookies?.get("token");
  const verified = await verifyJwtToken(token?.value || "");

  if (req.nextUrl.pathname.startsWith("/user/")) {
    if (!verified) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else {
    if (verified) {
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }
  }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/user/dashboard", "/user/budget"],
};
