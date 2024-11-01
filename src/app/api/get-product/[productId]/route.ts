// // import { NextResponse } from "next/server";

// // export async function GET(
// //   req: Request,
// //   { params }: { params: { productId: string } }
// // ) {
// //   const whmcsURL = process.env.WHMCS_URL;
// //   const whmcsIdentifier = process.env.WHMCS_IDENTIFIER;
// //   const whmcsSecret = process.env.WHMCS_SECRET;

// //   if (!whmcsURL || !whmcsIdentifier || !whmcsSecret) {
// //     return NextResponse.json(
// //       { error: "WHMCS API credentials are missing" },
// //       { status: 500 }
// //     );
// //   }

// //   const postFields = new URLSearchParams({
// //     identifier: whmcsIdentifier,
// //     secret: whmcsSecret,
// //     action: "GetProducts",
// //     pid: params.productId, // Set the product ID dynamically
// //     responsetype: "json",
// //   });

// //   try {
// //     const response = await fetch(`${whmcsURL}/includes/api.php`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/x-www-form-urlencoded",
// //       },
// //       body: postFields.toString(),
// //     });

// //     if (!response.ok) {
// //       throw new Error(
// //         `WHMCS API request failed with status: ${response.status}`
// //       );
// //     }

// //     const productData = await response.json();
// //     return NextResponse.json({ product: productData });
// //   } catch (error) {
// //     console.error("WHMCS API Error:", error);
// //     return NextResponse.json({ error: error.message }, { status: 500 });
// //   }
// // }

// import { NextResponse } from "next/server";

// export async function GET(
//   request: Request,
//   { params }: { params: { productId: string } }
// ) {
//   const whmcsURL = process.env.WHMCS_URL;
//   const whmcsIdentifier = process.env.WHMCS_IDENTIFIER;
//   const whmcsSecret = process.env.WHMCS_SECRET;

//   if (!whmcsURL || !whmcsIdentifier || !whmcsSecret) {
//     return NextResponse.json(
//       { error: "WHMCS API credentials are missing" },
//       { status: 500 }
//     );
//   }

//   const postFields = new URLSearchParams({
//     identifier: whmcsIdentifier,
//     secret: whmcsSecret,
//     action: "GetProducts",
//     pid: params.productId, // Use the product ID here
//     responsetype: "json",
//   });

//   try {
//     const response = await fetch(`${whmcsURL}/includes/api.php`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: postFields.toString(),
//     });

//     if (!response.ok) {
//       throw new Error(
//         `WHMCS API request failed with status: ${response.status}`
//       );
//     }

//     const product = await response.json();
//     return NextResponse.json({ product });
//   } catch (error) {
//     console.error("WHMCS API Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";

export async function POST(
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
    action: "GetProducts",
    identifier: whmcsIdentifier, // Use the correct identifier from your .env
    secret: whmcsSecret, // Use the correct secret from your .env
    pid: params.productId, // Product ID from route parameter
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

    if (!response.ok) {
      throw new Error(
        `WHMCS API request failed with status: ${response.status}`
      );
    }

    const product = await response.json();
    return NextResponse.json(product);
  } catch (error) {
    console.error("WHMCS API Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
