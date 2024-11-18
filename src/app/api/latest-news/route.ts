// import { NextRequest, NextResponse } from "next/server";

// // Define the WordPressPost interface
// interface WordPressPost {
//   id: number;
//   date: string;
//   title: { rendered: string };
//   excerpt: { rendered: string };
//   content: { rendered: string };
//   featured_image?: string;
//   author: number;
//   categories: number[];
//   _links: {
//     "wp:attachment": Array<{ href: string }>;
//   };
// }

// export async function GET(req: NextRequest) {
//   const wordpressApiUrl =
//     "https://api.blooming-brands.com/wp/wp-json/wp/v2/posts?order=desc&status=publish";

//   try {
//     // Fetch posts from the WordPress REST API
//     const response = await fetch(wordpressApiUrl);

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: `Failed to fetch posts: ${response.statusText}` },
//         { status: response.status }
//       );
//     }

//     // Parse the response JSON
//     const posts = (await response.json()) as WordPressPost[];

//     // Map the posts to a simplified structure
//     const simplifiedPosts = posts.map((post) => ({
//       id: post.id,
//       date: post.date,
//       title: post.title.rendered,
//       excerpt: post.excerpt.rendered,
//       content: post.content.rendered,
//       featured_image: post.featured_image || "",
//       author: post.author,
//       categories: post.categories,
//     }));

//     // Return the simplified posts
//     return NextResponse.json(simplifiedPosts);
//   } catch (error) {
//     console.error("Error fetching WordPress posts:", error);
//     return NextResponse.json(
//       { error: "An unexpected error occurred" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

interface WordPressPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_image?: string;
  author: number;
  categories: number[];
  _links: {
    "wp:attachment": Array<{ href: string }>;
  };
}

interface WordPressAuthor {
  id: number;
  name: string;
}

export async function GET() {
  const postsUrl =
    "https://api.blooming-brands.com/wp/wp-json/wp/v2/posts?order=desc&status=publish";

  try {
    // Fetch posts
    const postsResponse = await fetch(postsUrl);

    if (!postsResponse.ok) {
      return NextResponse.json(
        { error: `Failed to fetch posts: ${postsResponse.statusText}` },
        { status: postsResponse.status }
      );
    }

    const posts = (await postsResponse.json()) as WordPressPost[];

    // Get unique author IDs
    const authorIds = [...new Set(posts.map((post) => post.author))];

    // Fetch author details for all unique authors
    const authors = await Promise.all(
      authorIds.map(async (id) => {
        const authorResponse = await fetch(
          `https://api.blooming-brands.com/wp/wp-json/wp/v2/users/${id}`
        );
        if (authorResponse.ok) {
          const author = (await authorResponse.json()) as WordPressAuthor;
          return { id: author.id, name: author.name };
        }
        return { id, name: "Unknown Author" };
      })
    );

    // Map authors by ID for easy lookup
    const authorMap = Object.fromEntries(authors.map((a) => [a.id, a.name]));

    // Add author names to posts
    const enrichedPosts = posts.map((post) => ({
      id: post.id,
      date: post.date,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      featured_image: post.featured_image || "",
      author: authorMap[post.author] || "Unknown Author",
      categories: post.categories,
    }));

    return NextResponse.json(enrichedPosts);
  } catch (error) {
    console.error("Error fetching WordPress posts:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
