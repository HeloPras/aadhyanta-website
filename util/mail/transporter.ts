import nodemailer from "nodemailer";

// Create a transporter using SMTP
export const transporter = nodemailer.createTransport({
  host:'smtp.google.com',
  secure:true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});




