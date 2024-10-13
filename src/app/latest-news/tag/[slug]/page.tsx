"use client";
import { useEffect, useState } from "react";

// Define the type for a WordPress post
interface WordPressPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
}

const TagContent = ({ params }: { params: { slug: string } }) => {
  // Specify the type of posts to be an array of WordPressPost
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const tagName = params.slug;

  useEffect(() => {
    const fetchData = async () => {
      const tagRes = await fetch(
        `https://api.blooming-brands.com/wp-json/wp/v2/tags?slug=${params.slug}`,
        { cache: "no-store" }
      );
      const tagData = await tagRes.json();
      const tagId = tagData[0]?.id || null;

      if (tagId) {
        const postsRes = await fetch(
          `https://api.blooming-brands.com/wp-json/wp/v2/posts?tags=${tagId}`,
          { cache: "no-store" }
        );
        const postsData = await postsRes.json();
        setPosts(postsData);
      }
      setLoading(false);
    };

    fetchData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen w-screen flex justify-center items-center text-center text-3xl font-black">
        Loading...
      </div>
    );
  }

  return (
    <section className="bg-white py-20 dark:bg-dark lg:py-[120px]">
      <div className="container min-h-[50vh] mx-auto">
        <h1 className="mb-6 text-[26px] font-bold leading-normal text-dark dark:text-white sm:text-3xl sm:leading-snug md:text-4xl md:leading-snug">
          Posts tagged: {tagName}
        </h1>

        {/* Display the list of posts with the selected tag */}
        <div className="flex flex-wrap">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="w-full mb-4">
                <h2 className="text-lg font-semibold">
                  <a
                    href={`/latest-news/article/${post.id}`}
                    className="text-black hover:underline"
                  >
                    {post.title.rendered}
                  </a>
                </h2>
                <p
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  className="text-base text-body-color dark:text-dark-6"
                />
              </div>
            ))
          ) : (
            <p>No posts found for this tag.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TagContent;
