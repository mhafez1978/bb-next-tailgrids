// import { NextResponse } from "next/server";

// export async function GET() {
//   const response = NextResponse.redirect("/login"); // Redirect to login page

//   // Clear the token cookie
//   response.cookies.set("token", "", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     path: "/",
//     maxAge: 0, // Expire immediately
//   });

//   return response;
// }

import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL_DEV}/login`
  ); // Use absolute URL

  // Clear the token cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, // Expire immediately
  });

  return response;
}
