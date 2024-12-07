import { NextResponse } from "next/server";
import axios from "axios";

const senderEmail = process.env.SMTP_USER as string;

interface FormData {
  name: string;
  phone: string;
  email: string;
  businessName?: string;
  goods?: boolean;
  services?: boolean;
  both?: boolean;
  websitePurpose?: string;
  featuresNeeded?: string[];
  projectTimeframe?: string;
  projectBudget?: string;
  idealCustomers?: string;
  projectGoals?: string;
  pagesNeeded?: number;
  needContent?: boolean;
  needDomain?: boolean;
  needHosting?: boolean;
  needMarketing?: boolean;
  needMaintenance?: boolean;
  needOtherServices?: boolean;
  otherServiceDetails?: string;
}

async function getOAuthToken() {
  const tenantId = process.env.APPTENANTID as string;
  const clientId = process.env.APPCLIENTID as string;
  const clientSecret = process.env.APPSECRET as string;

  // Check that required environment variables are defined
  if (!tenantId || !clientId || !clientSecret) {
    console.error("Missing environment variables:", {
      tenantId,
      clientId,
      clientSecret,
    });
    throw new Error("Missing required environment variables for OAuth");
  }

  try {
    // Create URLSearchParams and append each parameter
    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    });

    const response = await axios.post(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    //console.log(error);
    throw new Error(`Failed to obtain OAuth token: ${error}`);
  }
}

export async function POST(req: Request) {
  try {
    const formData: FormData = await req.json();
    // const {
    //   name,
    //   phone,
    //   email,
    //   businessName,
    //   goods,
    //   services,
    //   both,
    //   websitePurpose,
    //   featuresNeeded = [],
    //   projectTimeframe,
    //   projectBudget,
    //   idealCustomers,
    //   projectGoals,
    //   pagesNeeded,
    //   needContent,
    //   needDomain,
    //   needHosting,
    //   needMarketing,
    //   needMaintenance,
    //   needOtherServices,
    //   otherServiceDetails,
    // } = formData;

    // Email content in HTML
    const emailContent = `
      <br/>
      <h1>New Website Customer Lead</h1>
      <hr/>
      <p><strong>Full Name:</strong> ${formData.name}</p>
      <p><strong>Phone Number:</strong> ${formData.phone}</p>
      <p><strong>Email Address:</strong> ${formData.email}</p>
      <p><strong>Business Name:</strong> ${formData.businessName}</p>
      <p><strong>Project Type:</strong>
        ${formData.goods ? "Goods" : ""}
        ${formData.services ? "Services" : ""}
        ${formData.both ? "Both" : ""}
      </p>
      <p><strong>Ideal Customers (Age Range):</strong> ${
        formData.idealCustomers
      }</p>
      <p><strong>Website Purpose:</strong> ${formData.websitePurpose}</p>
      <p><strong>Project Goals:</strong> ${formData.projectGoals}</p>
      <p><strong>Number of Pages:</strong> ${formData.pagesNeeded}</p>
      <p><strong>Features Needed:</strong>
      ${
        Array.isArray(formData.featuresNeeded)
          ? formData.featuresNeeded.join(", ")
          : ""
      }</p>
      <p><strong>Timeframe & Budget:</strong>
      ${formData.projectTimeframe} / $ ${formData.projectBudget}.00</p>
      <p><strong>Need Content Creation:</strong> ${
        formData.needContent ? "Yes" : "No"
      }</p>
      <p><strong>Own a Domain:</strong> ${
        formData.needDomain ? "Yes" : "No"
      }</p>
      <p><strong>Have Hosting:</strong> ${
        formData.needHosting ? "Yes" : "No"
      }</p>
      <p><strong>Need Online Marketing:</strong> ${
        formData.needMarketing ? "Yes" : "No"
      }</p>
      <p><strong>Need Maintenance:</strong> ${
        formData.needMaintenance ? "Yes" : "No"
      }</p>
      <p><strong>Need Other Services:</strong> ${
        formData.needOtherServices ? "Yes" : "No"
      }</p>
      ${
        formData.needOtherServices && formData.otherServiceDetails?.trim()
          ? `<p><strong>Other Services Details:</strong><br/> ${formData.otherServiceDetails}</p>`
          : ""
      }
      <p>End of lead.</p>
    `;

    // Get OAuth token
    const oAuthToken = await getOAuthToken();

    // Email payload for Microsoft Graph
    const emailPayload = {
      message: {
        subject: "New Website Customer Lead",
        body: {
          contentType: "HTML",
          content: emailContent,
        },
        toRecipients: [
          {
            emailAddress: {
              address: senderEmail, // Recipient email
            },
          },
        ],
        from: {
          emailAddress: {
            address: senderEmail, // Sender email
          },
        },
      },
    };

    // Send the email using Microsoft Graph API
    const graphUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      senderEmail
    )}/sendMail`;

    await axios.post(graphUrl, emailPayload, {
      headers: {
        Authorization: `Bearer ${oAuthToken}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { message: "Error sending email", error: errorMessage },
      { status: 500 }
    );
  }
}
