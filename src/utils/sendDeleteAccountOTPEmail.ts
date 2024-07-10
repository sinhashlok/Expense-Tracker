import { Resend } from "resend";
import prisma from "@/db";

type Props = {
  email: string;
  userId: any;
};

export default async function sendDeleteAccountOTPEmail({
  email,
  userId,
}: Props) {
  const resend = new Resend(process.env.RESEND_API || "");
  const code = Math.ceil(Math.random() * 8999 + 1000);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      deleteToken: code + "",
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
    <p>Code: ${code}</p>
    </div>`,
    })
    .catch((error) => console.log("Email Error", error));
}
