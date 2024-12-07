import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json();

  try {
    // Register the user via WordPress API
    const response = await fetch(
      `https://api.blooming-brands.com/wp-json/jwt/v1/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );

    if (!response.ok) {
      const { error } = await response.json();
      return NextResponse.json({ error }, { status: 400 });
    }

    const data = await response.json();

    return NextResponse.json({ success: true, user: data });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
