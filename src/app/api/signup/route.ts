import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { signupSchema } from "@/schema/signupSchema";
import bcryptjs from "bcryptjs";
import sendEmailVerificationToken from "@/utils/sendEmailVerificationToken";

import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.NODE_ENV !== "development",
  auht: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
} as SMTPTransport.Options);

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

    const sender = {
      name: "Shlok Sinha",
      address: process.env.NODEMAILER_USER || "",
    };

    const recipient = {
      name: user.name,
      address: user.email,
    };

    await sendEmailVerificationToken({
      sender: sender,
      recipient: recipient,
      userId: user.id,
    });

    return NextResponse.json(
      { message: "User created", success: true },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
