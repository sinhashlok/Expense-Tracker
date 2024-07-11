import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { signupSchema } from "@/schema/signupSchema";
import bcryptjs from "bcryptjs";
// import sendEmailVerificationToken from "@/utils/sendEmailVerificationToken";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const isValidData = signupSchema.safeParse(body);

    if (!isValidData) {
      return NextResponse.json(
        { message: "Invalid data", success: false },
        { status: 400 }
      );
    }

    const { fullname, email, password } = body;

    // Check: If Email already exists
    const userExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userExists) {
      return NextResponse.json(
        { message: "Email already exists", success: false },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create User
    const user = await prisma.user.create({
      data: {
        name: fullname,
        email: email,
        password: hashedPassword,
      },
    });
    const userId = user.id;

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        verifyToken: hashedToken,
      },
    });

    await transporter.sendMail({
      from: "shlokjp@gmail.com",
      to: email,
      subject: "Verification Emai",
      text: "",
      html: `<div>
    <h1>Email Verification</h1>
    <br />
    <p>Click here for <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">email verification</a>
    <br />
    Or Copy Paste the below URL in your browser:
    <br />
    ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    </p>
    </div>`,
    });
    console.log("Message sent");

    return NextResponse.json(
      { message: "User created", success: true },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
