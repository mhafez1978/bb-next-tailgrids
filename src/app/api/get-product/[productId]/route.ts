import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const whmcsURL = process.env.WHMCS_URL;
  const whmcsIdentifier = process.env.WHMCS_IDENTIFIER;
  const whmcsSecret = process.env.WHMCS_SECRET;

  if (!whmcsURL || !whmcsIdentifier || !whmcsSecret) {
    return NextResponse.json(
      { error: "WHMCS API credentials are missing" },
      { status: 500 }
    );
  }

  const postFields = new URLSearchParams({
    identifier: whmcsIdentifier,
    secret: whmcsSecret,
    action: "GetProducts",
    pid: params.productId, // Use the product ID here
    responsetype: "json",
  });

  try {
    const response = await fetch(`${whmcsURL}/includes/api.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: postFields.toString(),
    });

    const responseText = await response.text();
    //console.log("Raw response:", responseText);

    if (!response.ok) {
      throw new Error(
        `WHMCS API request failed with status: ${response.status}`
      );
    }

    if (response.headers.get("content-type")?.includes("application/json")) {
      const productData = JSON.parse(responseText);
      return NextResponse.json({ product: productData });
    } else {
      throw new Error("Received a non-JSON response from the API");
    }
  } catch (error: unknown) {
    console.error("WHMCS API Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
