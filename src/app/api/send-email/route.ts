import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Nodemailer route handler to send emails
export async function POST(req: Request) {
  const { firstName, lastName, email, phone, message } = await req.json();
  // Import necessary environment variables
  const smtpHost = process.env.SMTP_HOST; // Replace with default fallback if needed
  const smtpPort = process.env.SMTP_PORT
    ? parseInt(process.env.SMTP_PORT)
    : 465;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: true, // Use SSL/TLS for SMTP connection
    auth: {
      user: smtpUser,
      pass: smtpPassword,
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
