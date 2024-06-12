import { Resend } from "resend";
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
  const resend = new Resend(process.env.RESEND_API || "");

  const hashedToken = await bcryptjs.hash(userId.toString(), 10);
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      verifyToken: hashedToken,
    },
  });

  await resend.emails
    .send({
      from: "dev.me@resend.dev",
      to: email,
      subject: "Verification Email",
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
    .catch((error) => console.log("Email Error", error));
}
