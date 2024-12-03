import { NextResponse } from "next/server";

export async function GET() {
  const whmcsURL = process.env.WHMCS_URL;
  const whmcsIdentifier = process.env.WHMCS_IDENTIFIER;
  const whmcsSecret = process.env.WHMCS_SECRET;

  if (!whmcsURL || !whmcsIdentifier || !whmcsSecret) {
    return NextResponse.json(
      { error: "WHMCS API credentials are missing" },
      { status: 500 }
    );
  }

  // Configure POST fields
  const postFields = new URLSearchParams({
    identifier: whmcsIdentifier,
    secret: whmcsSecret,
    action: "GetProducts",
    responsetype: "json",
  });

  try {
    // Make the request
    const response = await fetch(`${whmcsURL}/includes/api.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: postFields.toString(),
    });

    // Check if response is OK, then parse JSON
    if (!response.ok) {
      throw new Error(
        `WHMCS API request failed with status: ${response.status}`
      );
    }

    const products = await response.json();
    //console.log("Products: ", products);

    return NextResponse.json({ products });
  } catch (error) {
    console.error("WHMCS API Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
