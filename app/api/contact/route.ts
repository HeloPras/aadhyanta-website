import { NextRequest, NextResponse } from "next/server"
import { transporter } from "@/util/mail/transporter"
import { getTestMessageUrl } from "nodemailer"
import { arrayBuffer } from "stream/consumers"
import { parse } from "path"

async function sendAutoReplyToClient(userEmail: string, userName: string) {
  const mailOptions = {
    from: `"Aadhyanta Fund Management Limited" <${process.env.EMAIL_USER}>`,
    // to: userEmail,
    to:userEmail,
    subject: "Thank You for Reaching Out to Us",
    attachments: [
      {
        filename: "logo.png",
        path: "./public/aadhyanta/logo.png",
        cid: "companylogo",
      },
    ],
    html: ` <!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <title>Thank You</title> </head> <body style="margin:0; padding:0; background-color:#F5F2ED; font-family:Arial, sans-serif;"> <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;"> <tr> <td align="center"> <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden;"> <!-- Header --> <tr> <td align="center" style="background:#1C1C2E; padding:30px;"> <!-- Logo --> <img src="cid:companylogo" alt="Company Logo" width="240" style="display:block;" /> </td> </tr> <!-- Content --> <tr> <td style="padding:40px 35px; color:#333333;"> <h1 style="margin-top:0; font-size:28px; color:#111827;"> Thank You for Contacting Us </h1> <p style="font-size:16px; line-height:1.7;"> Dear ${userName || "Valued Customer"}, </p> <p style="font-size:16px; line-height:1.7;"> Thank you for reaching out to us. We have successfully received your message and appreciate your interest in our services. </p> <p style="font-size:16px; line-height:1.7;"> Our team will review your inquiry and get back to you as soon as possible. </p> <p style="font-size:16px; line-height:1.7;"> In the meantime, if your matter is urgent, please feel free to contact us directly. </p> <!-- Button --> <table cellpadding="0" cellspacing="0" style="margin-top:30px;"> <tr> <td align="center" bgcolor="#111827" style="border-radius:8px;"> <a href="https://aadhyanta.com" target="_blank" style=" display:inline-block; padding:14px 28px; color:#ffffff; text-decoration:none; font-size:15px; font-weight:bold; background:#B71E52 " > Visit Our Website </a> </td> </tr> </table> <p style="margin-top:40px; font-size:16px; line-height:1.7;"> Best Regards,<br/> <strong>Aadhyanta Fund Management</strong> </p> </td> </tr> <!-- Footer --> <tr> <td align="center" style="background:#f9fafb; padding:25px; font-size:13px; color:#6b7280;"> © 2026 Aadhyanta Fund Management. All rights reserved. <br/><br/> Kathmandu, Nepal <br/> <a href="https://aadhyanta.com" style="color:#111827; text-decoration:none;"> www.aadhyanta.com </a> </td> </tr> </table> </td> </tr> </table> </body> </html> `,

  }

  await transporter.sendMail(mailOptions)
}

async function sendAutoReplyToUs(data:Record<string,string|null|File>, content:string){


    const mailOptions = {
    from: `${data.email}`,
    // to: userEmail,
    to:'contact@aadhyanta.com',
    subject: "General Inquery",
    html: ` <!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <title>Thank You</title> </head> <body style="margin:0; padding:0; background-color:#F5F2ED; font-family:Arial, sans-serif;"> <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;"> <tr> <td align="center"> <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden;"> <!-- Header --> <tr> <td align="center" style="background:#1C1C2E; padding:30px;"> <!-- Logo --> <img src="cid:companylogo" alt="Company Logo" width="240" style="display:block;" /> </td> </tr> <!-- Content --> <tr> <td style="padding:40px 35px; color:#333333;"> <h1 style="margin-top:0; font-size:28px; color:#111827;"> Thank You for Contacting Us </h1> <p style="font-size:16px; line-height:1.7;"> Dear ${data.userName || "Valued Customer"}, </p> <p style="font-size:16px; line-height:1.7;"> Thank you for reaching out to us. We have successfully received your message and appreciate your interest in our services. </p> <p style="font-size:16px; line-height:1.7;"> Our team will review your inquiry and get back to you as soon as possible. </p> <p style="font-size:16px; line-height:1.7;"> In the meantime, if your matter is urgent, please feel free to contact us directly. </p> <!-- Button --> <table cellpadding="0" cellspacing="0" style="margin-top:30px;"> <tr> <td align="center" bgcolor="#111827" style="border-radius:8px;"> <a href="https://aadhyanta.com" target="_blank" style=" display:inline-block; padding:14px 28px; color:#ffffff; text-decoration:none; font-size:15px; font-weight:bold; background:#B71E52 " > Visit Our Website </a> </td> </tr> </table> <p style="margin-top:40px; font-size:16px; line-height:1.7;"> Best Regards,<br/> <strong>Aadhyanta Fund Management</strong> </p> </td> </tr> <!-- Footer --> <tr> <td align="center" style="background:#f9fafb; padding:25px; font-size:13px; color:#6b7280;"> © 2026 Aadhyanta Fund Management. All rights reserved. <br/><br/> Kathmandu, Nepal <br/> <a href="https://aadhyanta.com" style="color:#111827; text-decoration:none;"> www.aadhyanta.com </a> </td> </tr> </table> </td> </tr> </table> </body> </html> `,

  }

  await transporter.sendMail(mailOptions)


}

const emailContent = (data:Record<string,string|File|null>,topic:string)=>{

const generalContent = `

<!DOCTYPE html>

<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New General Inquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#f8f7f4;font-family:Arial,Helvetica,sans-serif;color:#333333;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f7f4;padding:40px 20px;">
    <tr>
      <td align="center">

    <table width="650" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr>
        <td style="background:#1c1917;padding:24px 32px;">
          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:600;">
            New General Inquiry
          </h1>
          <p style="margin:8px 0 0;color:#d6d3d1;font-size:14px;">
            Submitted through the Aadhyanta website
          </p>
        </td>
      </tr>

      <!-- Content -->
      <tr>
        <td style="padding:32px;">

          <table width="100%" cellpadding="0" cellspacing="0">

            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e7e5e4;">
                <strong>Name</strong><br>
                ${data.name}
              </td>
            </tr>

            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e7e5e4;">
                <strong>Email Address</strong><br>
                ${data.email}
              </td>
            </tr>

            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e7e5e4;">
                <strong>Company</strong><br>
                ${data.company || 'Not Provided'}
              </td>
            </tr>

            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e7e5e4;">
                <strong>Phone Number</strong><br>
                ${data.phone || 'Not Provided'}
              </td>
            </tr>

            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e7e5e4;">
                <strong>Inquiry Type</strong><br>
                ${data.topic || 'General Inquiry'}
              </td>
            </tr>

            <tr>
              <td style="padding:20px 0;">
                <strong>Message</strong>

                <div style="
                  margin-top:10px;
                  padding:16px;
                  background:#fafaf9;
                  border:1px solid #e7e5e4;
                  border-radius:8px;
                  white-space:pre-wrap;
                  line-height:1.6;
                ">
                  ${data.message}
                </div>
              </td>
            </tr>

          </table>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#fafaf9;padding:20px 32px;border-top:1px solid #e7e5e4;">
          <p style="margin:0;font-size:12px;color:#78716c;">
            This email was automatically generated from the Aadhyanta website contact form.
          </p>
        </td>
      </tr>

    </table>

  </td>
</tr>

  </table>

</body>
</html>
`

switch (topic) {
  case 'accelerator':

  return " "
    break;
  case 'investment':

    return " "

    break;
    case 'investor':

    return " "

    break;
  default:

    return generalContent || ""
    break;
}



} 




export async function POST(req: NextRequest) {
  const formData = await req.formData()

  const rawData = formData.get('data')  as string
  const parsedData = await JSON.parse(rawData)
  const file = formData.get('attachment') as File | null
  let content = " "
  let subject = " "
  let receiverEmail = " "
  let senderEmail = " "

  // console.log(parsedData)

  if(!file)return
  const buffer = Buffer.from(await file.arrayBuffer())

    switch (parsedData.topic) {
      case 'accelerator':
        content = emailContent(parsedData,'accelerator')
        
        break;

      case 'investment':
        
        break;
      
      case 'investor':
        
        break;
    
      default:

        break;
    }

  console.log(buffer)

  try {


    // sendAutoReply(body.email, body.name)
    sendAutoReplyToClient(parsedData.email,parsedData.name)
    sendAutoReplyToUs(parsedData,content)



  } catch (err) {
    throw new Error("There is error")
  }

  return NextResponse.json({ message: "success", code: "200" })
}
