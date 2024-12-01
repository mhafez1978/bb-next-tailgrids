type User = {
  id: number;
  name: string;
  slug: string; // Slug is used for the email-like identifier in <author>
};

type Post = {
  id: number;
  author: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string; // Date in string format from API
};

export async function GET() {
  try {
    // Fetch posts and users from the API
    const [postsResponse, usersResponse] = await Promise.all([
      fetch("https://api.blooming-brands.com/wp-json/wp/v2/posts"),
      fetch("https://api.blooming-brands.com/wp-json/wp/v2/users"),
    ]);

    // Validate API responses
    if (!postsResponse.ok || !usersResponse.ok) {
      throw new Error("Failed to fetch posts or users");
    }

    const posts: Post[] = await postsResponse.json();
    const users: User[] = await usersResponse.json();

    // Map users by their ID for quick lookup
    const usersMap = users.reduce((map: Record<number, string>, user) => {
      map[user.id] = user.slug; // Use slug for generating email-like author identifier
      return map;
    }, {});

    // Build RSS items dynamically
    const frontendBaseURL = "https://blooming-brands.com/latest-news/article";
    const feedURL = "https://blooming-brands.com/rss.xml"; // Self-referential link for Atom compatibility

    const items = posts
      .map((post) => {
        const authorSlug = usersMap[post.author] || "unknown-author";
        const sanitizedTitle = sanitizeContent(post.title.rendered);
        const sanitizedDescription = sanitizeContent(post.excerpt.rendered);
        const frontendLink = `${frontendBaseURL}/${post.id}`;

        return `
          <item>
            <title>${sanitizedTitle}</title>
            <link>${frontendLink}</link>
            <description><![CDATA[${sanitizedDescription}]]></description>
            <author>${authorSlug}@blooming-brands.com</author>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            <guid isPermaLink="true">${frontendLink}</guid>
          </item>
        `;
      })
      .join("\n");

    // Construct the complete RSS XML
    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blooming Brands Blog</title>
    <link>https://blooming-brands.com</link>
    <description>Insights and updates from Blooming Brands</description>
    <atom:link href="${feedURL}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        "Content-Type": "text/xml",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);

    // Return an empty RSS feed on error
    const emptyRSS = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Blooming Brands Blog</title>
    <link>https://blooming-brands.com</link>
    <description>An error occurred while generating the feed</description>
  </channel>
</rss>`;

    return new Response(emptyRSS, {
      headers: {
        "Content-Type": "text/xml",
      },
      status: 500,
    });
  }
}

function sanitizeContent(content: string): string {
  if (!content) return ""; // Handle undefined or null content gracefully
  return content
    .replace(/&hellip;/g, "&#8230;") // Replace ellipsis with its numeric entity
    .replace(/&/g, "&amp;") // Encode &
    .replace(/</g, "&lt;") // Encode <
    .replace(/>/g, "&gt;") // Encode >
    .replace(/"/g, "&quot;") // Encode "
    .replace(/'/g, "&apos;"); // Encode '
}
