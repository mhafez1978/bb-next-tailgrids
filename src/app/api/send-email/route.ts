import { NextResponse } from "next/server";
import axios from "axios";

const senderEmail = process.env.SMTP_USER as string;

export async function POST(req: Request) {
  const { firstName, lastName, email, phone, message } = await req.json();

  // Function to get an OAuth token
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
      throw new Error(String(error));
    }
  }

  // Function to send the email using Microsoft Graph API
  async function sendEmail(oAuthToken: string) {
    const graphUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      senderEmail
    )}/sendMail`;

    const emailPayload = {
      message: {
        subject: "New Contact Form Submission",
        body: {
          contentType: "HTML",
          content: `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Message:</strong> ${message}</p>`,
        },
        toRecipients: [
          {
            emailAddress: {
              address: senderEmail, // Recipient email (replace if different)
            },
          },
        ],
        from: {
          emailAddress: {
            address: senderEmail, // Sender email address
          },
        },
      },
    };

    try {
      await axios.post(graphUrl, emailPayload, {
        headers: {
          Authorization: `Bearer ${oAuthToken}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      //console.log(error);
      throw new Error(String(error));
    }
  }

  try {
    // Step 1: Obtain an OAuth token
    const oAuthToken = await getOAuthToken();

    // Step 2: Send the email using Microsoft Graph
    await sendEmail(oAuthToken);

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    //console.error("Error in POST handler:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
