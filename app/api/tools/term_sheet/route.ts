import { NextRequest, NextResponse } from "next/server"
import docxtemplater from "docxtemplater"
import PizZip from "pizzip"
import fs from "fs"
import path from "path"

export async function POST(req: NextRequest) {
  const body: {
    hello: string
    hello1: string
    hello2: string
    hello3: string
  } = await req.json()

  console.log("This is the request body", body)

  const content = fs.readFileSync(
    path.resolve("util", `Term_Sheet_Template.docx`),
    "binary"
  )

  const zip = new PizZip(content)

  const doc = new docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  })

  doc.render({
    text_input_0: body.hello,
    text_input_1: body.hello1,
    text_input_2: body.hello2,
    text_input_3: body.hello3,
  })

  const buf = doc.getZip().generate({
    type: "nodebuffer",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  })

  // ✅ Convert Node Buffer to Uint8Array
  const uint8Array = new Uint8Array(buf)

  return new NextResponse(uint8Array, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": 'attachment; filename="Term_Sheet.docx"',
    },
  })
}
