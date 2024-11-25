import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, email } = body;

    // Validate input
    if (!username || !password || !email) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Call WordPress API for user registration
    const wpResponse = await fetch(
      `${process.env.WORDPRESS_URL}/wp-json/jwt/v1/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      }
    );

    const data = await wpResponse.json();

    if (!wpResponse.ok) {
      return NextResponse.json(
        { error: data.error || "Registration failed." },
        { status: wpResponse.status }
      );
    }

    // Log the event in WordPress userTrack plugin
    await fetch(`${process.env.WORDPRESS_URL}/wp-json/usertrack/v1/log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "register", // Action type is register
        user_id: data.user_id, // Use the user_id returned from the WordPress API
      }),
    });

    return NextResponse.json({ message: "Registration successful." });
  } catch (error) {
    console.error("Registration API Error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
