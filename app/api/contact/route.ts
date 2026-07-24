import { NextRequest, NextResponse } from "next/server"
import { transporter } from "@/util/mail/transporter"
import { getTestMessageUrl } from "nodemailer"
import { arrayBuffer } from "stream/consumers"
import { parse } from "path"

async function sendAutoReplyToClient(userEmail: string, userName: string) {
  const mailOptions = {
    from: `"Aadhyanta Fund Management Limited" <${process.env.EMAIL_USER}>`,
    // to: userEmail,
    to: userEmail,
    subject: "Thank You for Reaching Out to Us",
    attachments: [
      {
        filename: "logo.png",
        path: "./public/logo.png",
        cid: "companylogo",
      },
    ],
    html: ` <!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <title>Thank You</title> </head> <body style="margin:0; padding:0; background-color:#F5F2ED; font-family:Arial, sans-serif;"> <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;"> <tr> <td align="center"> <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden;"> <!-- Header --> <tr> <td align="center" style="background:#1C1C2E; padding:30px;"> <!-- Logo --> <img src="cid:companylogo" alt="Company Logo" width="240" style="display:block;" /> </td> </tr> <!-- Content --> <tr> <td style="padding:40px 35px; color:#333333;"> <h1 style="margin-top:0; font-size:28px; color:#111827;"> Thank You for Contacting Us </h1> <p style="font-size:16px; line-height:1.7;"> Dear ${userName || "Valued Customer"}, </p> <p style="font-size:16px; line-height:1.7;"> Thank you for reaching out to us. We have successfully received your message and appreciate your interest in our services. </p> <p style="font-size:16px; line-height:1.7;"> Our team will review your inquiry and get back to you as soon as possible. </p> <p style="font-size:16px; line-height:1.7;"> In the meantime, if your matter is urgent, please feel free to contact us directly. </p> <!-- Button --> <table cellpadding="0" cellspacing="0" style="margin-top:30px;"> <tr> <td align="center" bgcolor="#111827" style="border-radius:8px;"> <a href="https://aadhyanta.com" target="_blank" style=" display:inline-block; padding:14px 28px; color:#ffffff; text-decoration:none; font-size:15px; font-weight:bold; background:#B71E52 " > Visit Our Website </a> </td> </tr> </table> <p style="margin-top:40px; font-size:16px; line-height:1.7;"> Best Regards,<br/> <strong>Aadhyanta Fund Management</strong> </p> </td> </tr> <!-- Footer --> <tr> <td align="center" style="background:#f9fafb; padding:25px; font-size:13px; color:#6b7280;"> © 2026 Aadhyanta Fund Management. All rights reserved. <br/><br/> Kathmandu, Nepal <br/> <a href="https://aadhyanta.com" style="color:#111827; text-decoration:none;"> www.aadhyanta.com </a> </td> </tr> </table> </td> </tr> </table> </body> </html> `,
  }

  await transporter.sendMail(mailOptions)
}

async function sendAutoReplyToUs(
  subject: string,
  content: string,
  receiverEmail: string,
  senderEmail: string,
  attachment: {
    filename: string
    content: Buffer<ArrayBuffer>
    contentType: string
  }[],
) {
  const mailOptions = {
    from: senderEmail,
    // to: userEmail,
    to: receiverEmail,
    subject: subject,
    html: content,
    attachments:attachment,
  }

  await transporter.sendMail(mailOptions)
}

const emailContent = (
  data: Record<string, string | File | null>,
  topic: string,
) => {
  let content = ""

  switch (topic) {
    case "accelerator":
      content = `
      

<!DOCTYPE html>

<html>
<body style="margin:0;padding:0;background:#f8f7f4;font-family:Arial,Helvetica,sans-serif;color:#292524;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;padding:32px 16px;">
    <tr>
      <td align="center">

    <table width="700" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e7e5e4;">

      <!-- Header -->
      <tr>
        <td style="background:#1c1917;padding:24px 32px;">
          <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;">
            New Accelerator Program Application
          </h1>
          <p style="margin:8px 0 0;color:#d6d3d1;font-size:14px;">
            Submitted through the Aadhyanta website accelerator inquiry form
          </p>
        </td>
      </tr>

      <!-- Content -->
      <tr>
        <td style="padding:28px 32px;">

          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">

            <tr>
              <td colspan="2" style="padding:12px 0 16px;font-size:16px;font-weight:700;color:#1c1917;">
                Applicant Information
              </td>
            </tr>

            <tr>
              <td style="width:35%;padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">
                Name
              </td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.name || "Not Provided"}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">
                Email Address
              </td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.email || "Not Provided"}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">
                Phone Number
              </td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.phone || "Not Provided"}
              </td>
            </tr>

            <tr>
              <td colspan="2" style="padding:24px 0 16px;font-size:16px;font-weight:700;color:#1c1917;">
                Business Details
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">
                Business Name
              </td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.businessName || "Not Provided"}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">
                Primary Sector
              </td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.sector || "Not Provided"}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">
                Approximate Annual Revenue
              </td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.annualRevenue || "Not Provided"}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">
                Years in Operation
              </td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.yearsOperating || "Not Provided"}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">
                Province
              </td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.province || "Not Provided"}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">
                Capital Sought
              </td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.capitalNeeded || "Not Provided"}
              </td>
            </tr>

            <tr>
              <td colspan="2" style="padding:24px 0 16px;font-size:16px;font-weight:700;color:#1c1917;">
                Business Description & Support Required
              </td>
            </tr>

            <tr>
              <td colspan="2" style="
                padding:16px;
                border:1px solid #e7e5e4;
                background:#fafaf9;
                line-height:1.7;
                white-space:pre-wrap;
              ">
                ${data.message || "No message provided"}
              </td>
            </tr>

          </table>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#fafaf9;padding:18px 32px;border-top:1px solid #e7e5e4;">
          <p style="margin:0;font-size:12px;color:#78716c;">
            This email was automatically generated from the Aadhyanta website accelerator program form.
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
      break

    case "investment":
      content = `
<!DOCTYPE html>
<html>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/> 

<body style="margin:0;padding:0;background:#f8f7f4;font-family:Arial,Helvetica,sans-serif;color:#292524;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;padding:32px 16px;">
    <tr>
      <td align="center">

        <table width="700" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e7e5e4;">

          <tr>
            <td style="background:#1c1917;padding:24px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;">
                New Investment Inquiry
              </h1>
              <p style="margin:8px 0 0;color:#d6d3d1;font-size:14px;">
                Submitted through the Aadhyanta website contact form
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px;">

              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
                <tr>
                  <td colspan="2" style="padding:12px 0 16px;font-size:16px;font-weight:700;color:#1c1917;">
                    Applicant Details
                  </td>
                </tr>

                <tr>
                  <td style="width:35%;padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Name</td>
                  <td style="padding:10px;border:1px solid #e7e5e4;">${data.name || "Not Provided"}</td>
                </tr>

                <tr>
                  <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Email</td>
                  <td style="padding:10px;border:1px solid #e7e5e4;">${data.email || "Not Provided"}</td>
                </tr>

                <tr>
                  <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Phone</td>
                  <td style="padding:10px;border:1px solid #e7e5e4;">${data.phone || "Not Provided"}</td>
                </tr>

                <tr>
                  <td colspan="2" style="padding:24px 0 16px;font-size:16px;font-weight:700;color:#1c1917;">
                    Company & Investment Details
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Company Name</td>
                  <td style="padding:10px;border:1px solid #e7e5e4;">${data.companyName || "Not Provided"}</td>
                </tr>

                <tr>
                  <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Industry Sector</td>
                  <td style="padding:10px;border:1px solid #e7e5e4;">${data.sector || "Not Provided"}</td>
                </tr>

                <tr>
                  <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Investment Amount Sought</td>
                  <td style="padding:10px;border:1px solid #e7e5e4;">${data.fundingAmount || "Not Provided"}</td>
                </tr>

                <tr>
                  <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Registered Date</td>
                  <td style="padding:10px;border:1px solid #e7e5e4;">${data["registered date"] || "Not Provided"}</td>
                </tr>

                <tr>
                  <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Business Model</td>
                  <td style="padding:10px;border:1px solid #e7e5e4;">${data["business model"] || "Not Provided"}</td>
                </tr>

                <tr>
                  <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Product / Service</td>
                  <td style="padding:10px;border:1px solid #e7e5e4;">${data.product || "Not Provided"}</td>
                </tr>

                <tr>
                  <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Launched</td>
                  <td style="padding:10px;border:1px solid #e7e5e4;">${data["successfully launched"] ? "Yes" : "No"}</td>
                </tr>

                <tr>
                  <td colspan="2" style="padding:24px 0 16px;font-size:16px;font-weight:700;color:#1c1917;">
                    Financial & Operational Details
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Share Capital</td>
                  <td style="padding:10px;border:1px solid #e7e5e4;">${data["share capital"] || "Not Provided"}</td>
                </tr>

                <tr>
                  <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Book Networth</td>
                  <td style="padding:10px;border:1px solid #e7e5e4;">${data["book networth"] || "Not Provided"}</td>
                </tr>

                <tr>
                  <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Annual Revenue</td>
                  <td style="padding:10px;border:1px solid #e7e5e4;">${data.annualRevenue || "Not Provided"}</td>
                </tr>

                <tr>
                  <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Net Profit</td>
                  <td style="padding:10px;border:1px solid #e7e5e4;">${data["net profit"] || "Not Provided"}</td>
                </tr>

                <tr>
                  <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Province of Operation</td>
                  <td style="padding:10px;border:1px solid #e7e5e4;">${data.province || "Not Provided"}</td>
                </tr>

                <tr>
                  <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Years in Operation</td>
                  <td style="padding:10px;border:1px solid #e7e5e4;">${data.yearsOperating || "Not Provided"}</td>
                </tr>

                <tr>
                  <td colspan="2" style="padding:24px 0 16px;font-size:16px;font-weight:700;color:#1c1917;">
                    Investment Thesis & Use of Capital
                  </td>
                </tr>

                <tr>
                  <td colspan="2" style="padding:14px;border:1px solid #e7e5e4;background:#fafaf9;line-height:1.6;white-space:pre-wrap;">
                    ${data.message || "Not Provided"}
                  </td>
                </tr>

              </table>

            </td>
          </tr>

          <tr>
            <td style="background:#fafaf9;padding:18px 32px;border-top:1px solid #e7e5e4;">
              <p style="margin:0;font-size:12px;color:#78716c;">
                This email was automatically generated from the Aadhyanta website investment inquiry form.
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
      break

    case "investor":
      content = `

<!DOCTYPE html>

<html>
<body style="margin:0;padding:0;background:#f8f7f4;font-family:Arial,Helvetica,sans-serif;color:#292524;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;padding:32px 16px;">
    <tr>
      <td align="center">

    <table width="700" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e7e5e4;">

      <!-- Header -->
      <tr>
        <td style="background:#1c1917;padding:24px 32px;">
          <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;">
            New Investor Inquiry
          </h1>
          <p style="margin:8px 0 0;color:#d6d3d1;font-size:14px;">
            Submitted through the Aadhyanta website
          </p>
        </td>
      </tr>

      <!-- Content -->
      <tr>
        <td style="padding:28px 32px;">

          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">

            <tr>
              <td colspan="2" style="padding:12px 0 16px;font-size:16px;font-weight:700;color:#1c1917;">
                Contact Information
              </td>
            </tr>

            <tr>
              <td style="width:35%;padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Name</td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.name || 'Not Provided'}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Email Address</td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.email || 'Not Provided'}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Phone Number</td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.phone || 'Not Provided'}
              </td>
            </tr>

            <tr>
              <td colspan="2" style="padding:24px 0 16px;font-size:16px;font-weight:700;color:#1c1917;">
                Investor Profile
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Investor Type</td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.investorType || 'Not Provided'}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Fund of Interest</td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.fundInterest || 'Not Provided'}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Indicative Commitment Size</td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.commitmentSize || 'Not Provided'}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Impact / ESG Priorities</td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.impactFocus || 'Not Provided'}
              </td>
            </tr>

            <tr>
              <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Decision Timeline</td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.decisionTimeline || 'Not Provided'}
              </td>
            </tr>
              <tr>
              <td style="padding:10px;border:1px solid #e7e5e4;background:#fafaf9;font-weight:600;">Expected Return</td>
              <td style="padding:10px;border:1px solid #e7e5e4;">
                ${data.expectedReturn || 'Not Provided'} %
              </td>
            </tr>

            <tr>
              <td colspan="2" style="padding:24px 0 16px;font-size:16px;font-weight:700;color:#1c1917;">
                Investment Mandate & Questions
              </td>
            </tr>

            <tr>
              <td colspan="2" style="
                padding:16px;
                border:1px solid #e7e5e4;
                background:#fafaf9;
                line-height:1.7;
                white-space:pre-wrap;
              ">
                ${data.message || 'No message provided'}
              </td>
            </tr>

          </table>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#fafaf9;padding:18px 32px;border-top:1px solid #e7e5e4;">
          <p style="margin:0;font-size:12px;color:#78716c;">
            This email was automatically generated from the Aadhyanta website investor inquiry form.
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
      break

    default:
      content = `

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
                ${data.company || "Not Provided"}
              </td>
            </tr>

            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e7e5e4;">
                <strong>Phone Number</strong><br>
                ${data.phone || "Not Provided"}
              </td>
            </tr>

            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e7e5e4;">
                <strong>Inquiry Type</strong><br>
                ${data.topic || "General Inquiry"}
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
      break
  }

  return content
}



export async function POST(req: NextRequest) {


  const formData = await req.formData()

  const rawData = formData.get("data") as string
  const parsedData = await JSON.parse(rawData)
  const file = formData.get("attachment") as File | null
  let content = " "
  let subject = " "
  let receiverEmail = [""]
  let senderEmail = " "
  let attachments = []


  // console.log(parsedData)

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer())
    attachments.push({
      filename: file.name,
      content: buffer,
      contentType: file.type,
    })
  }

  switch (parsedData.topic) {
    case "accelerator":
      content = emailContent(parsedData, "accelerator")
      subject = `Accelerator Inquiry`
      receiverEmail = ["application@aadhyanta.com"]
      // receiverEmail = ["maharjanprasiddha8@gmail.com"]
      senderEmail = `"${parsedData.businessName}" <${parsedData.email}>`
      break

    case "investment":
      content = emailContent(parsedData, "investment")
      subject = `Investment Inquiry`
      // receiverEmail = ["swastika@aadhyanta.com"]
      receiverEmail = ["maharjanprasiddha8@gmail.com"]
      senderEmail = `"${parsedData.companyName}" <${parsedData.email}>`
      break

    case "investor":
      content = emailContent(parsedData, "investor")
      subject = `Investor's Inquiry`
      receiverEmail = ["swastika@aadhyanta.com"]
      senderEmail = `"${parsedData.name}" <${parsedData.email}>`
      break

    default:
      content = emailContent(parsedData, "general")
      subject = `General Inquiry`
      receiverEmail = ["contact@aadhyanta.com"]
      senderEmail = `"${parsedData.name}" <${parsedData.email}>`
      break
  }

  try {
    // sendAutoReply(body.email, body.name)
    await sendAutoReplyToClient(senderEmail, parsedData.name)

    receiverEmail.forEach(async (email) => {
      await sendAutoReplyToUs(subject, content, email, senderEmail, attachments)
    })
  } catch (err) {
    throw new Error("There is error")
  }

  return NextResponse.json({ message: "success", code: "200" })
}
;
;