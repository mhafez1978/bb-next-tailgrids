import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.blooming-brands.com/wp-json/wp/v2/posts"
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch posts: ${response.statusText}` },
        { status: response.status }
      );
    }

    const posts = await response.json();
    console.log(posts);

    return NextResponse.json(posts);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
