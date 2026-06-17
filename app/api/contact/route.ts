import { NextRequest, NextResponse } from "next/server"
import { transporter } from "@/util/mail/transporter"
import { getTestMessageUrl } from "nodemailer"

async function sendAutoReply(userEmail: string, userName: string) {
  const mailOptions = {
    from: `"Aadhyanta Fund Management Limited" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Thank You for Reaching Out to Us",
    attachments: [
      {
        filenam: "logo.png",
        path: "./public/aadhyanta/logo.png",
        cid: "companylogo",
      },
    ],
    html: ` <!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <title>Thank You</title> </head> <body style="margin:0; padding:0; background-color:#F5F2ED; font-family:Arial, sans-serif;"> <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;"> <tr> <td align="center"> <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden;"> <!-- Header --> <tr> <td align="center" style="background:#1C1C2E; padding:30px;"> <!-- Logo --> <img src="cid:companylogo" alt="Company Logo" width="240" style="display:block;" /> </td> </tr> <!-- Content --> <tr> <td style="padding:40px 35px; color:#333333;"> <h1 style="margin-top:0; font-size:28px; color:#111827;"> Thank You for Contacting Us </h1> <p style="font-size:16px; line-height:1.7;"> Dear ${userName || "Valued Customer"}, </p> <p style="font-size:16px; line-height:1.7;"> Thank you for reaching out to us. We have successfully received your message and appreciate your interest in our services. </p> <p style="font-size:16px; line-height:1.7;"> Our team will review your inquiry and get back to you as soon as possible. </p> <p style="font-size:16px; line-height:1.7;"> In the meantime, if your matter is urgent, please feel free to contact us directly. </p> <!-- Button --> <table cellpadding="0" cellspacing="0" style="margin-top:30px;"> <tr> <td align="center" bgcolor="#111827" style="border-radius:8px;"> <a href="https://yourwebsite.com" target="_blank" style=" display:inline-block; padding:14px 28px; color:#ffffff; text-decoration:none; font-size:15px; font-weight:bold; background:#B71E52 " > Visit Our Website </a> </td> </tr> </table> <p style="margin-top:40px; font-size:16px; line-height:1.7;"> Best Regards,<br/> <strong>Aadhyanta Fund Management</strong> </p> </td> </tr> <!-- Footer --> <tr> <td align="center" style="background:#f9fafb; padding:25px; font-size:13px; color:#6b7280;"> © 2026 Aadhyanta Fund Management. All rights reserved. <br/><br/> Kathmandu, Nepal <br/> <a href="https://yourwebsite.com" style="color:#111827; text-decoration:none;"> www.aadhyanta.com </a> </td> </tr> </table> </td> </tr> </table> </body> </html> `,
  }

  await transporter.sendMail(mailOptions)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const email = process.env.SMTP_USER || "nothing"

  console.log(body)

  try {
    //   const info = await transporter.sendMail({
    //   from: `${process.env.SMTP_USER}`, // sender address
    //   to: `${process.env.SMTP_USER}`, // list of recipients
    //   subject: "Hello", // subject line
    //   text: "Hello world?", // plain text body
    //   html: "<b>Hello world?</b>", // HTML body
    // });
    // console.log("Message sent: %s", info.messageId);
    // // Preview URL is only available when using an Ethereal test account
    // console.log("Preview URL: %s", getTestMessageUrl(info));
    // const info =  await transpoerter.''

    // sendAutoReply(body.email, body.name)

  } catch (err) {
    throw new Error("There is error")
  }

  return NextResponse.json({ message: "success", code: "200" })
}
