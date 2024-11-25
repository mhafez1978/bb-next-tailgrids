// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   try {
//     const { email } = await request.json();

//     if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
//       return NextResponse.json(
//         { error: "Invalid email address" },
//         { status: 400 }
//       );
//     }

//     const response = await fetch(
//       `https://api.blooming-brands.com/wp/wp-json/newsletter/v2/signup`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to save email");
//     }
//     console.log("WP_API_URL:", process.env.WP_API_URL);
//     return NextResponse.json({ message: "Successfully subscribed!" });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, honeypot } = await request.json();

    // Check honeypot field
    if (honeypot) {
      return NextResponse.json(
        { error: "Spam detected. Submission rejected." },
        { status: 400 }
      );
    }

    // Validate email
    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Send the email to the WordPress API
    const response = await fetch(
      `${process.env.WORDPRESS_URL}/wp-json/newsletter/v2/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, honeypot }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save email");
    }

    console.log("WP_API_URL:", process.env.WP_API_URL);
    return NextResponse.json({ message: "Successfully subscribed!" });
  } catch (error) {
    console.error("Error processing request:", error);

    // Ensure error is properly serialized
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
