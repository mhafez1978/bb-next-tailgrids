// import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";
// export async function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     //console.log("No token found, redirecting to /login.");
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
//     const { payload } = await jwtVerify(token, secret);

//     //console.log("Decoded payload:", payload);

//     const role = payload?.user?.role;

//     // Adjust roles to include WordPress-specific ones
//     if (["admin", "editor", "superadmin", "administrator"].includes(role)) {
//       //console.log("Role is admin-related, allowing access.");
//       return NextResponse.next();
//     } else if (["author", "contributor", "subscriber"].includes(role)) {
//       //console.log("Role is user-related, allowing access.");
//       return NextResponse.next();
//     } else {
//       //console.log("Invalid role, redirecting to /login.");
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   } catch (err) {
//     console.error("Token verification failed:", err);
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

type JWTPayload = {
  user?: {
    role?: string;
  };
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // No token, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    // Cast payload to the JWTPayload type
    const typedPayload = payload as JWTPayload;

    // Safely access user.role
    const role = typedPayload?.user?.role;

    if (["admin", "editor", "superadmin", "administrator"].includes(role!)) {
      return NextResponse.next();
    } else if (["author", "contributor", "subscriber"].includes(role!)) {
      return NextResponse.next();
    } else {
      // Invalid role
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (err) {
    console.error("Token verification failed:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
