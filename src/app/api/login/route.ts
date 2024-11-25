import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode"; // JWT decoding library

interface JwtPayload {
  iss: string; // Issuer (URL of your website)
  iat: number; // Issued at (timestamp)
  exp: number; // Expiration (timestamp)
  user: {
    id: number;
    login: string;
    email: string;
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Call WordPress API for user login
    const wpResponse = await fetch(
      `${process.env.WORDPRESS_URL}/wp-json/jwt/v1/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await wpResponse.json();

    // Handle WordPress API errors
    if (!wpResponse.ok) {
      return NextResponse.json(
        { error: data.error || "Login failed." },
        { status: wpResponse.status }
      );
    }

    // Decode JWT token to get user_id from the token
    const decodedToken: JwtPayload = jwtDecode(data.token); // Decoding the JWT token

    // Check if the user_id is available in the decoded token
    const user_id = decodedToken?.user?.id;

    if (!user_id) {
      console.error("User ID is missing in the decoded token.");
      return NextResponse.json(
        { error: "User ID is missing in the token" },
        { status: 400 }
      );
    }

    // Log the event in WordPress userTrack plugin
    const logResponse = await fetch(
      `${process.env.WORDPRESS_URL}/wp-json/usertrack/v1/log`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login", // Action type is login
          user_id: user_id, // Use the user_id from the decoded token
        }),
      }
    );

    const logData = await logResponse.json();

    if (!logResponse.ok) {
      console.error("Failed to log login event:", logData);
    }

    // Return the token and login success message
    return NextResponse.json({
      token: data.token,
      expires_in: data.expires_in,
      message: "Login successful.",
    });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
