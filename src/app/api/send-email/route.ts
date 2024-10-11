import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Nodemailer route handler to send emails
export async function POST(req: Request) {
  const { firstName, lastName, email, phone, message } = await req.json();

  // Nodemailer transport configuration for your custom domain's SMTP server
  const transporter = nodemailer.createTransport({
    host: "mail.blooming-brands.com", // Your SMTP server
    port: 465, // SMTP port for SSL
    secure: true, // Use SSL/TLS for SMTP connection
    auth: {
      user: "admin@blooming-brands.com", // Your email address
      pass: process.env.SMTP_PASSWORD, // Your email account’s password (ensure it's set in .env.local)
    },
  });

  try {
    // Send email using Nodemailer
    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${email}>`, // Sender information
      to: "admin@blooming-brands.com", // Your email address (or whoever should receive the form submission)
      subject: "New Contact Form Submission",
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
