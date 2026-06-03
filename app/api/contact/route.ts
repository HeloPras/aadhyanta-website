import { NextRequest, NextResponse } from "next/server"
import { transporter } from "@/util/mail/transporter"
import { getTestMessageUrl } from "nodemailer";

export async function POST(req: NextRequest) {
  const body  = await req.json()


    try {
  const info = await transporter.sendMail({
    from: `${process.env.SMTP_USER}`, // sender address
    to: `${process.env.SMTP_USER}`, // list of recipients
    subject: "Hello", // subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}




return NextResponse.json({ message: "success", code: "200" })

  
}