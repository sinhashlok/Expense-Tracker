import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import prisma from "@/db";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import errorMap from "zod/locales/en.js";

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.NODE_ENV !== "development",
  auht: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
} as SMTPTransport.Options);

type Props = {
  sender: Mail.Address;
  recipient: Mail.Address;
  userId: any;
};

export default async function sendEmailVerificationToken({
  sender,
  recipient,
  userId,
}: Props) {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        verifyToken: hashedToken,
      },
    });

    return await transport.sendMail({
      from: sender,
      to: recipient,
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
  } catch (error) {
    console.log("Failed to send mail", error);
    throw Error("Failed to send mail");
  }
}
