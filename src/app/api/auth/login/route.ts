// import { NextRequest, NextResponse } from "next/server";
// import https from "https";

// export async function POST(request: NextRequest) {
//   try {
//     // Parse the request body
//     const { username, password } = await request.json();

//     if (!username || !password) {
//       return NextResponse.json(
//         { error: "Username and password are required." },
//         { status: 400 }
//       );
//     }

//     // Create an HTTPS agent to bypass SSL issues temporarily
//     const agent = new https.Agent({
//       rejectUnauthorized: false, // Bypass SSL validation (not recommended for production)
//       keepAlive: true,
//     });

//     // Authenticate against WordPress API
//     const response = await fetch(
//       `https://api.blooming-brands.com/wp-json/jwt/v1/login`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//         agent, // Use the custom HTTPS agent
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       return NextResponse.json(
//         { error: errorData.error || "Invalid credentials" },
//         { status: response.status }
//       );
//     }

//     // Parse the response from the WordPress API
//     const data = await response.json();
//     console.log(data.user.login);
//     console.log(data.user.email);
//     console.log(data.user.role);
//     //console.log(data.token);
//     // Set the JWT as an HTTP-only cookie
//     const cookieOptions = {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//       maxAge: data.expires_in, // Expires in seconds
//       sameSite: "strict" as const,
//     };

//     const res = NextResponse.json({ success: true, user: data.user });
//     res.cookies.set("token", data.token, cookieOptions);
//     return res;
//   } catch (error) {
//     // Log the error for debugging
//     //console.error("Error during login:", error);
//     const errorMessage =
//       error instanceof Error ? error.message : "An unknown error occurred";
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    // Authenticate against WordPress API (no agent needed)
    const response = await fetch(
      "https://api.blooming-brands.com/wp-json/jwt/v1/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || "Invalid credentials" },
        { status: response.status }
      );
    }

    // Parse the response from the WordPress API
    const data = await response.json();
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: data.expires_in, // Expires in seconds
      sameSite: "strict" as const,
    };

    const res = NextResponse.json({ success: true, user: data.user });
    res.cookies.set("token", data.token, cookieOptions);
    return res;
  } catch (error) {
    // Log the error for debugging
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
