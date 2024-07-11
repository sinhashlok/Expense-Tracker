import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import prisma from "@/db";

type Props = {
  email: string;
  userId: any;
};

export default async function sendEmailVerificationToken({
  email,
  userId,
}: Props) {
  const hashedToken = await bcryptjs.hash(userId.toString(), 10);
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      verifyToken: hashedToken,
    },
  });

  try {
    await nodemailer
      .createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
      })
      .sendMail({
        from: process.env.NODEMAILER_USER,
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
    console.log("Email sent to " + email);
  } catch (e) {
    console.error(e);
  }
}
