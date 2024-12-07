import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No refresh token provided" },
      { status: 401 }
    );
  }

  try {
    // Refresh the token via WordPress API
    const response = await fetch(`${process.env.WP_API_URL}/jwt/v1/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    if (!response.ok) {
      const { error } = await response.json();
      return NextResponse.json({ error }, { status: 401 });
    }

    const data = await response.json();

    // Update JWT and refresh token cookies
    const jwtCookie = `token=${data.token}; HttpOnly; Secure; Path=/; Max-Age=3600`;
    const res = NextResponse.json({ success: true });
    res.headers.set("Set-Cookie", jwtCookie);

    return res;
  } catch (err) {
    console.error("Token refresh error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
