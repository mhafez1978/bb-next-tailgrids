type User = {
  id: number;
  name: string;
};

type Post = {
  id: number;
  author: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string; // Date in string format from API
};

export async function GET() {
  const postsResponse = await fetch(
    "https://api.blooming-brands.com/wp/wp-json/wp/v2/posts"
  );
  const usersResponse = await fetch(
    "https://api.blooming-brands.com/wp/wp-json/wp/v2/users"
  );

  // Validate API responses
  if (!postsResponse.ok || !usersResponse.ok) {
    throw new Error("Failed to fetch posts or users");
  }

  const posts: Post[] = await postsResponse.json();
  const users: User[] = await usersResponse.json();

  // Map users by their ID for quick lookup
  const usersMap = users.reduce((map: Record<number, string>, user) => {
    map[user.id] = user.name;
    return map;
  }, {});

  // Base URL for frontend posts
  const frontendBaseURL = "https://blooming-brands.com/latest-news/article";

  // Build RSS items dynamically
  const items = posts
    .map((post) => {
      const authorName = usersMap[post.author] || "Unknown Author";
      const sanitizedTitle = sanitizeContent(post.title.rendered);
      const sanitizedDescription = sanitizeContent(post.excerpt.rendered);

      // Construct the frontend URL
      const frontendLink = `${frontendBaseURL}/${post.id}`;

      return `
        <item>
          <title>${sanitizedTitle}</title>
          <link>${frontendLink}</link>
          <description><![CDATA[${sanitizedDescription}]]></description>
          <author>${authorName}</author>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <guid isPermaLink="true">${frontendLink}</guid>
        </item>
      `;
    })
    .join("\n");

  // Construct the complete RSS XML
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Blooming Brands Blog</title>
    <link>https://blooming-brands.com</link>
    <description>Insights and updates from Blooming Brands</description>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
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
