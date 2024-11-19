// // export async function GET() {
// //   const baseUrl = process.env.BASE_URL || "http://localhost:3000"; // Use environment variables for flexibility

// //   try {
// //     // Fetch posts from your `/api/latest-news` route
// //     const response = await fetch(`${baseUrl}/api/latest-news`);

// //     if (!response.ok) {
// //       throw new Error(`Failed to fetch posts: ${response.statusText}`);
// //     }

// //     const posts = await response.json();

// //     // Build the RSS feed dynamically
// //     const items = posts
// //       .map(
// //         (post: {
// //           title: string | undefined;
// //           id: string;
// //           excerpt: string | undefined;
// //           date: string;
// //           author: string | undefined;
// //           category: string | undefined;
// //           featured_image: string | undefined;
// //         }) => `
// //       <item>
// //         <title>${escapeXml(post.title ?? "No Title")}</title>
// //         <link>${baseUrl}/latest-news/${post.id}</link>
// //         <description>${escapeXml(
// //           post.excerpt ?? "No Description"
// //         )}</description>
// //         <pubDate>${new Date(post.date).toUTCString()}</pubDate>
// //         <author>${escapeXml(post.author ?? "Unknown Author")}</author>
// //         <category>${escapeXml(post.category ?? "General")}</category>
// //         <enclosure url="${post.featured_image ?? ""}" type="image/jpeg" />
// //       </item>
// //     `
// //       )
// //       .join("");

// //     // Final RSS feed
// //     const rss = `<?xml version="1.0" encoding="UTF-8" ?>
// //     <rss version="2.0">
// //       <channel>
// //         <title>Next.js Documentation</title>
// //         <link>${baseUrl}/latest-news</link>
// //         <description>Latest News from Boston's Blooming Brands LLC. A Web Design And Online Marketing Agency....</description>
// //         <language>en</language>
// //         ${items}
// //       </channel>
// //     </rss>`;

// //     return new Response(rss, {
// //       headers: {
// //         "Content-Type": "text/xml",
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Failed to generate RSS feed:", error);
// //     return new Response(
// //       `<?xml version="1.0" encoding="UTF-8" ?>
// //       <rss version="2.0">
// //         <channel>
// //           <title>Error Generating RSS Feed</title>
// //           <link>${baseUrl}/latest-news</link>
// //           <description>${escapeXml(
// //             error.message || "An unknown error occurred"
// //           )}</description>
// //           <language>en</language>
// //         </channel>
// //       </rss>`,
// //       {
// //         headers: {
// //           "Content-Type": "text/xml",
// //         },
// //         status: 500,
// //       }
// //     );
// //   }
// // }

// // function escapeXml(unsafe: string): string {
// //   if (typeof unsafe !== "string") {
// //     return ""; // Return an empty string for non-string inputs
// //   }
// //   return unsafe
// //     .replace(/&/g, "&amp;")
// //     .replace(/</g, "&lt;")
// //     .replace(/>/g, "&gt;")
// //     .replace(/"/g, "&quot;")
// //     .replace(/'/g, "&apos;");
// // }

// //api.blooming-brands.com/wp/wp-json/wp/v2/posts

// export async function GET() {
//   const baseUrl = process.env.BASE_URL || "https://api.blooming-brands.com"; // Use environment variables for flexibility

//   try {
//     // Fetch posts from your `/api/latest-news` route
//     const response = await fetch(`${baseUrl}/wp/wp-json/wp/v2/posts`);

//     if (!response.ok) {
//       throw new Error(`Failed to fetch posts: ${response.statusText}`);
//     }

//     const posts = await response.json();

//     // Build the RSS feed dynamically
//     const items = posts
//       .map(
//         (post: {
//           title: string | undefined;
//           id: string;
//           excerpt: string | undefined;
//           date: string;
//           author: string | undefined;
//           category: string | undefined;
//           featured_image: string | undefined;
//         }) => `
//       <item>
//         <title>${escapeXml(post.title ?? "No Title")}</title>
//         <link>${baseUrl}/latest-news/${post.id}</link>
//         <description>${escapeXml(
//           post.excerpt ?? "No Description"
//         )}</description>
//         <pubDate>${new Date(post.date).toUTCString()}</pubDate>
//         <author>${escapeXml(post.author ?? "Unknown Author")}</author>
//         <category>${escapeXml(post.category ?? "General")}</category>
//         <enclosure url="${post.featured_image ?? ""}" type="image/jpeg" />
//       </item>
//       `
//       )
//       .join("");

//     // Final RSS feed
//     const rss = `<?xml version="1.0" encoding="UTF-8" ?>
//     <rss version="2.0">
//       <channel>
//         <title>Next.js Documentation</title>
//         <link>${baseUrl}/latest-news</link>
//         <description>Latest News from Boston's Blooming Brands LLC. A Web Design And Online Marketing Agency....</description>
//         <language>en</language>
//         ${items}
//       </channel>
//     </rss>`;

//     return new Response(rss, {
//       headers: {
//         "Content-Type": "text/xml",
//       },
//     });
//   } catch (error) {
//     console.error("Failed to generate RSS feed:", error);

//     // Safely extract error message
//     const errorMessage =
//       error instanceof Error ? error.message : "An unknown error occurred";

//     return new Response(
//       `<?xml version="1.0" encoding="UTF-8" ?>
//       <rss version="2.0">
//         <channel>
//           <title>Error Generating RSS Feed</title>
//           <link>${baseUrl}/latest-news</link>
//           <description>${escapeXml(errorMessage)}</description>
//           <language>en</language>
//         </channel>
//       </rss>`,
//       {
//         headers: {
//           "Content-Type": "text/xml",
//         },
//         status: 500,
//       }
//     );
//   }
// }

// // Function to escape special XML characters
// function escapeXml(unsafe: string): string {
//   if (typeof unsafe !== "string") {
//     return ""; // Return an empty string for non-string inputs
//   }
//   return unsafe
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&apos;");
// }

export async function GET() {
  const baseUrl = process.env.BASE_URL || "https://api.blooming-brands.com";

  try {
    // Fetch posts from your WordPress API
    const response = await fetch(`${baseUrl}/wp/wp-json/wp/v2/posts`);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const posts = await response.json();

    // Function to get file size
    async function getFileSize(url: string): Promise<number | null> {
      try {
        const headResponse = await fetch(url, { method: "HEAD" });
        const contentLength = headResponse.headers.get("content-length");
        return contentLength ? parseInt(contentLength, 10) : null;
      } catch {
        return null;
      }
    }

    // Build the RSS feed dynamically
    const items = await Promise.all(
      posts.map(
        async (post: {
          title: string | undefined;
          id: string;
          excerpt: string | undefined;
          date: string;
          author: string | undefined;
          category: string | undefined;
          featured_image: string | undefined;
        }) => {
          const featuredImage = post.featured_image ?? "";
          const fileSize = featuredImage
            ? await getFileSize(featuredImage)
            : null;

          return `
          <item>
            <title>${escapeXml(post.title ?? "No Title")}</title>
            <link>${baseUrl}/latest-news/${post.id}</link>
            <description>${escapeXml(
              post.excerpt ?? "No Description"
            )}</description>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            <author>${escapeXml(post.author ?? "Unknown Author")}</author>
            <category>${escapeXml(post.category ?? "General")}</category>
            <enclosure url="${featuredImage}" type="image/jpeg" length="${
            fileSize ?? 0
          }" />
          </item>
        `;
        }
      )
    );

    // Final RSS feed
    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Next.js Documentation</title>
        <link>${baseUrl}/latest-news</link>
        <description>Latest News from Boston's Blooming Brands LLC. A Web Design And Online Marketing Agency....</description>
        <language>en</language>
        ${items.join("")}
      </channel>
    </rss>`;

    return new Response(rss, {
      headers: {
        "Content-Type": "text/xml",
      },
    });
  } catch (error) {
    console.error("Failed to generate RSS feed:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return new Response(
      `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
        <channel>
          <title>Error Generating RSS Feed</title>
          <link>${baseUrl}/latest-news</link>
          <description>${escapeXml(errorMessage)}</description>
          <language>en</language>
        </channel>
      </rss>`,
      {
        headers: {
          "Content-Type": "text/xml",
        },
        status: 500,
      }
    );
  }
}

// Function to escape special XML characters
function escapeXml(unsafe: string): string {
  if (typeof unsafe !== "string") {
    return ""; // Return an empty string for non-string inputs
  }
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
