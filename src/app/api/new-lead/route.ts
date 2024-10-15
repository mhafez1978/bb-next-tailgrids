import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    // Debug log for formData
    console.log("Form Data: ", formData);

    const {
      name,
      phone,
      email,
      businessName,
      goods,
      services,
      both,
      websitePurpose,
      featuresNeeded = [],
      projectTimeframe,
      projectBudget,
      idealCustomers,
      projectGoals,
      pagesNeeded,
      needContent,
      needDomain,
      needHosting,
      needMarketing,
      needMaintenance,
      needOtherServices,
      otherServiceDetails,
    } = formData;

    // Debug log for other services
    console.log("Need Other Services:", needOtherServices);
    console.log("Other Services Details:", otherServiceDetails);

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT
      ? parseInt(process.env.SMTP_PORT)
      : 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASS;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    const mailOptions = {
      from: email,
      to: smtpUser,
      subject: "New Website Customer Lead",
      html: `
        <br/>
        <h1>New Website Customer Lead</h1>
        <hr/>
        <p><strong>Full Name:</strong> ${name}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p><strong>Project Type:</strong> 
          ${goods ? "Goods" : ""} 
          ${services ? "Services" : ""} 
          ${both ? "Both" : ""}
        </p>
        <p><strong>Ideal Customers (Age Range):</strong> ${idealCustomers}</p>
        <p><strong>Website Purpose:</strong> ${websitePurpose}</p>
        <p><strong>Project Goals:</strong> ${projectGoals}</p>
        <p><strong>Number of Pages:</strong> ${pagesNeeded}</p>
        <p><strong>Features Needed:</strong> 
        ${Array.isArray(featuresNeeded) ? featuresNeeded.join(", ") : ""}</p>
        <p><strong>Timeframe & Budget:</strong> 
        ${projectTimeframe} / ${projectBudget}</p>
        <p><strong>Need Content Creation:</strong> ${
          needContent ? "Yes" : "No"
        }</p>
        <p><strong>Own a Domain:</strong> ${needDomain ? "Yes" : "No"}</p>
        <p><strong>Have Hosting:</strong> ${needHosting ? "Yes" : "No"}</p>
        <p><strong>Need Online Marketing:</strong> ${
          needMarketing ? "Yes" : "No"
        }</p>
        <p><strong>Need Maintenance:</strong> ${
          needMaintenance ? "Yes" : "No"
        }</p>
        <p><strong>Need Other Services:</strong> ${
          needOtherServices ? "Yes" : "No"
        }</p>
        ${
          needOtherServices && otherServiceDetails?.trim()
            ? `<p><strong>Other Services Details:</strong><br/> ${otherServiceDetails}</p>`
            : ""
        }
        <p>
        End of lead.
        </p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    // Type check and ensure error is an object with a `message`
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { message: "Error sending email", error: errorMessage },
      { status: 500 }
    );
  }
}
