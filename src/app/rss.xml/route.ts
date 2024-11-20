// export async function GET() {
//   const baseUrl = process.env.BASE_URL || "https://api.blooming-brands.com";

//   try {
//     // Fetch posts
//     const postsResponse = await fetch(`${baseUrl}/wp/wp-json/wp/v2/posts`);
//     if (!postsResponse.ok) {
//       throw new Error(`Failed to fetch posts: ${postsResponse.statusText}`);
//     }
//     const posts = await postsResponse.json();

//     // Function to fetch user details by ID
//     async function fetchUserById(userId: string) {
//       const userResponse = await fetch(
//         `${baseUrl}/wp/wp-json/wp/v2/users/${userId}`
//       );
//       if (!userResponse.ok) {
//         console.warn(`Failed to fetch user with ID ${userId}`);
//         return { name: "Unknown Author", email: "unknown@blooming-brands.com" };
//       }
//       const user = await userResponse.json();
//       return {
//         name: user.name || "Unknown Author",
//         email: user.email || "unknown@blooming-brands.com",
//       };
//     }

//     // Cache fetched authors to avoid duplicate requests
//     const authorCache: Record<string, { name: string; email: string }> = {};

//     async function getAuthorDetails(authorId: string) {
//       if (authorCache[authorId]) {
//         return authorCache[authorId];
//       }
//       const author = await fetchUserById(authorId);
//       authorCache[authorId] = author;
//       return author;
//     }

//     // Fetch file size for featured images
//     async function getFileSize(url: string): Promise<number | null> {
//       try {
//         const headResponse = await fetch(url, { method: "HEAD" });
//         const contentLength = headResponse.headers.get("content-length");
//         return contentLength ? parseInt(contentLength, 10) : null;
//       } catch {
//         return null;
//       }
//     }

//     // Map posts to RSS items
//     const items = await Promise.all(
//       posts.map(
//         async (post: {
//           title: string | undefined;
//           id: string;
//           excerpt: string | undefined;
//           date: string;
//           author: string | undefined;
//           category: string | undefined;
//           featured_image: string | undefined;
//         }) => {
//           const featuredImage = post.featured_image ?? "";
//           const fileSize = featuredImage
//             ? await getFileSize(featuredImage)
//             : null;

//           // Fetch author details by ID
//           const authorInfo = post.author
//             ? await getAuthorDetails(post.author)
//             : { name: "Unknown Author", email: "unknown@blooming-brands.com" };

//           return `
//           <item>
//             <title>${escapeXml(post.title || "Untitled Post")}</title>
//             <link>${baseUrl}/latest-news/${post.id}</link>
//             <description>${escapeXml(
//               post.excerpt || "No Description"
//             )}</description>
//             <pubDate>${new Date(post.date).toUTCString()}</pubDate>
//             <author>${escapeXml(
//               `${authorInfo.email} (${authorInfo.name})`
//             )}</author>
//             <category>${escapeXml(post.category || "General")}</category>
//             ${
//               featuredImage
//                 ? `<enclosure url="${featuredImage}" type="image/jpeg" length="${
//                     fileSize || 0
//                   }" />`
//                 : ""
//             }
//             <guid isPermaLink="true">${baseUrl}/latest-news/${post.id}</guid>
//           </item>
//           `;
//         }
//       )
//     );

//     // Generate the final RSS feed
//     const rss = `<?xml version="1.0" encoding="UTF-8" ?>
//     <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
//       <channel>
//         <title>Blooming Brands LLC RSS Feed</title>
//         <link>${baseUrl}/rss.xml</link>
//         <description>Latest News from Boston's Blooming Brands LLC. A Web Design And Online Marketing Agency....</description>
//         <language>en</language>
//         <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
//         <copyright>Copyright ${new Date().getFullYear()} Blooming Brands LLC</copyright>
//         <webMaster>webmaster &lt;admin@blooming-brands.com&gt;</webMaster>
//         ${items.join("")}
//       </channel>
//     </rss>`;

//     return new Response(rss, {
//       headers: {
//         "Content-Type": "text/xml",
//       },
//     });
//   } catch (error) {
//     console.error("Failed to generate RSS feed:", error);

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

// // Escape XML special characters
// function escapeXml(unsafe: string): string {
//   if (typeof unsafe !== "string") {
//     return "";
//   }
//   return unsafe
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&apos;");
// }

import { Feed } from "feed";

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  author: number; // Author ID
}

interface User {
  id: number;
  name: string;
  email?: string;
}

// Simulated WordPress API endpoints
const POSTS_ENDPOINT = "https://api.blooming-brands.com/wp/wp-json/wp/v2/posts";
const USERS_ENDPOINT = "https://api.blooming-brands.com/wp/wp-json/wp/v2/users";

// Function to fetch data from an API
async function fetchAPI(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return response.json();
}

export async function GET() {
  try {
    // Fetch posts and users
    const posts = await fetchAPI(POSTS_ENDPOINT);
    const users = await fetchAPI(USERS_ENDPOINT);

    // Create a map of users by ID
    const userMap = users.reduce(
      (map: Record<string, { name: string; email: string }>, user: User) => {
        map[user.id] = {
          name: user.name,
          email: user.email || "unknown@blooming-brands.com",
        };
        return map;
      },
      {}
    );
    function convertRelativeUrlsToAbsolute(
      content: string,
      baseUrl: string
    ): string {
      return content.replace(/href="\/(.*?)"/g, (match, path) => {
        return `href="${baseUrl}/${path}"`;
      });
    }

    // Initialize the RSS feed
    const feed = new Feed({
      title: "Blooming Brands LLC RSS Feed",
      description:
        "Latest News from Boston's Blooming Brands LLC. A Web Design and Online Marketing Agency.",
      id: "https://api.blooming-brands.com/rss.xml", // Ensure this is the correct feed URL
      link: "https://api.blooming-brands.com/rss.xml", // Ensure this is correct
      language: "en",
      copyright: `Copyright ${new Date().getFullYear()} Blooming Brands LLC`,
      updated: new Date(),
      generator: "Feed for Node.js",
      feedLinks: {
        rss: "https://api.blooming-brands.com/rss.xml", // Ensure this matches exactly
      },
    });

    // Add posts to the feed
    // posts.forEach((post: Post) => {
    //   const author = userMap[post.author] || {
    //     name: "Unknown Author",
    //     email: "unknown@blooming-brands.com",
    //   };

    //   feed.addItem({
    //     title: post.title.rendered || "Untitled Post",
    //     id: `https://api.blooming-brands.com/latest-news/${post.id}`,
    //     link: `https://api.blooming-brands.com/latest-news/${post.id}`,
    //     description: post.excerpt.rendered || "No Description",
    //     content: post.content.rendered || "No Content",
    //     author: [
    //       {
    //         name: author.name,
    //         email: author.email,
    //       },
    //     ],
    //     date: new Date(post.date),
    //   });
    // });
    posts.forEach((post: Post) => {
      const author = userMap[post.author] || {
        name: "Unknown Author",
        email: "unknown@blooming-brands.com",
      };

      feed.addItem({
        title: post.title.rendered || "Untitled Post",
        id: `https://api.blooming-brands.com/latest-news/${post.id}`,
        link: `https://api.blooming-brands.com/latest-news/${post.id}`,
        description: convertRelativeUrlsToAbsolute(
          post.excerpt.rendered || "No Description",
          "https://blooming-brands.com"
        ),
        content: convertRelativeUrlsToAbsolute(
          post.content.rendered || "No Content",
          "https://blooming-brands.com"
        ),
        author: [
          {
            name: author.name,
            email: author.email,
          },
        ],
        date: new Date(post.date),
      });
    });

    // Return the RSS feed as the response
    return new Response(feed.rss2(), {
      headers: {
        "Content-Type": "application/rss+xml",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new Response(
      `Error generating RSS feed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { status: 500 }
    );
  }
}
