import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import prisma from "@/db";

type Props = {
  email: string;
  userId: any;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

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

  await transporter
    .sendMail({
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
    })
    .then(() => {
      console.log("Message Sent");
    })
    .catch((err) => {
      throw Error("Failed to send email", err);
    });
}
