import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = request.cookies;
    const token = cookieStore.get("token");

    if (!token) {
      //console.error("Token not found in cookies");
      return NextResponse.json(
        { error: "No token found in cookies." },
        { status: 401 }
      );
    }

    //console.log("Token found:", token);
    return NextResponse.json({ token: token.value });
  } catch (error) {
    //console.error("Error retrieving token:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
