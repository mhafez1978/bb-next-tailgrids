import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.blooming-brands.com/wp/wp-json/newsletter/v2/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save email");
    }

    return NextResponse.json({ message: "Successfully subscribed!" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
