import type { Metadata } from "next";
import PageTop from "@/components/responsive/page-top/PageTop";
import Pagination from "@/components/pagination/Pagination";
//import Image from "next/image";
// import { Suspense } from "react";
// import Link from "next/link";
import NewsLetterForm2 from "@/components/responsive/newsletter/NewsletterForm2";
// import sanitize from "dompurify";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Blooming Brands | Our Latest News",
  description:
    "Blooming Brands Blog , should provide our latest news, projects, promotional offers...",
  keywords:
    "website design, website development, online stores, online marketing",
  applicationName: "Blooming Brands",
  authors: [{ name: "Mohamed Hafez" }],
  creator: "Blooming Brands Web Development Team",
  publisher: "Blooming Brands LLC",
};

// Define WordPressPost interface
interface WordPressPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  post_featured_image?: string;
  author_details: {
    name: string;
    avatar: string;
  };
}

// Define LatestNewsProps
interface LatestNewsProps {
  searchParams: Record<string, string | string[] | undefined>;
}

// Component to display the latest news with posts and pagination
const LatestNewsRoll = async ({ searchParams }: LatestNewsProps) => {
  const page = parseInt(searchParams.page?.toString() || "1");
  const perPage = 6;

  try {
    const response = await fetch(
      `https://api.blooming-brands.com/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = (await response.json()) as WordPressPost[];
    const totalPages = parseInt(response.headers.get("X-WP-TotalPages") || "1");

    return (
      <>
        <PageTop PageMessage="Latest News" />
        <section className="bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
          <div className="container mx-auto">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  date={new Date(post.date).toLocaleDateString()}
                  CardTitle={post.title.rendered}
                  CardDescription={
                    <div
                      className="excerpt-content"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered.replace(
                          /\[&hellip;\]|\[...\]/g,
                          `... <a href="/latest-news/article/${post.id}" class="text-sky-600 dark:text-gray-400">Read more</a>`
                        ),
                      }}
                    />
                  }
                  image={
                    post.post_featured_image ||
                    "https://via.placeholder.com/600x400.png"
                  }
                  author={post.author_details.name}
                  avatar={post.author_details.avatar}
                />
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} />
          </div>
        </section>
        <NewsLetterForm2 />
      </>
    );
  } catch (error) {
    return (
      <div className="text-center p-4 text-red-500">
        {error instanceof Error ? error.message : "Failed to fetch posts"}
      </div>
    );
  }
};

export default LatestNewsRoll;

const PostCard = ({
  id,
  date,
  CardTitle,
  CardDescription,
  image,
  author,
  avatar,
}: {
  id: number;
  date: string;
  CardTitle: string;
  CardDescription: React.ReactNode;
  image: string;
  author: string;
  avatar: string;
}) => (
  <div
    key={id}
    id={id.toString()}
    className="w-full h-full flex flex-col border border-gray-200 rounded-lg shadow-md"
  >
    <div className="overflow-hidden rounded-t h-64 flex-shrink-0">
      <img
        src={image}
        alt="Post Thumbnail"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="py-4 px-4 flex flex-col justify-between flex-grow">
      {date && (
        <span className="mb-2 inline-block rounded bg-gray-800 px-4 py-1 text-left text-xs font-semibold text-white">
          Date Published: {date}
        </span>
      )}
      <div className="flex items-center space-x-2 mb-2">
        <img
          src={avatar}
          alt="Author Avatar"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-semibold text-sky-600 dark:text-gray-400">
          <span className="text-black">Author:</span> {author}
        </span>
      </div>
      <h3 className="mb-4 text-xl font-semibold text-dark dark:text-white">
        {CardTitle}
      </h3>
      <div className="mb-4 text-base text-body-color dark:text-dark-6">
        {CardDescription}
      </div>
    </div>
  </div>
);
