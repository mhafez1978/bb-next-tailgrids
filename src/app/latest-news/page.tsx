import type { Metadata } from "next";
import PageTop from "@/components/responsive/page-top/PageTop";
import Pagination from "@/components/pagination/Pagination";
import Image from "next/image";
import { Suspense } from "react";
// import Link from "next/link";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Blooming Brands | Latest News",
  description:
    "Boston based Website Design, Development, and Online Marketing Agency",
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
  featured_image?: string;
  author: number;
  _links: {
    "wp:attachment": Array<{ href: string }>;
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
    const data = await fetch(
      `https://api.blooming-brands.com/wp/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}`
    );

    if (!data.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = (await data.json()) as WordPressPost[];
    const totalPages = parseInt(data.headers.get("X-WP-TotalPages") || "1");

    const postsContent = await Promise.all(
      posts.map(async (post: WordPressPost) => {
        const mediaResponse = await fetch(post._links["wp:attachment"][0].href);
        const mediaData = await mediaResponse.json();
        const imageSrc =
          Array.isArray(mediaData) && mediaData[0]?.source_url
            ? mediaData[0].source_url
            : "https://via.placeholder.com/600x400.png";

        const authorResponse = await fetch(
          `https://api.blooming-brands.com/wp/wp-json/wp/v2/users/${post.author}`
        );
        const authorData = await authorResponse.json();
        const authorName = authorData?.name || "Unknown Author";

        return (
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
            image={imageSrc}
            author={authorName}
          />
        );
      })
    );

    return (
      <>
        <PageTop PageMessage="Latest News" />
        <section className="bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
          <div className="container mx-auto">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {postsContent}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} />
          </div>
        </section>
      </>
    );
  } catch (error: unknown) {
    return (
      <div className="text-center p-4 text-red-500">
        {error instanceof Error ? error.message : "Failed to fetch posts"}
      </div>
    );
  }
};

const PostCard = ({
  id,
  author,
  image,
  date,
  CardTitle,
  CardDescription,
}: {
  id: number;
  author: string;
  image: string;
  date: string;
  CardTitle: string;
  CardDescription: React.ReactNode;
}) => {
  return (
    // <Link href={`/latest-news/article/${id}`}>
    <div key={id} id={id.toString()} className="w-full h-full flex flex-col">
      <div className="mb-10 w-full h-full bg-white dark:bg-dark rounded shadow-md overflow-hidden flex flex-col justify-between">
        <div className="overflow-hidden rounded-t h-64 flex-shrink-0">
          <Image
            src={image}
            alt=""
            className="w-full h-full object-cover"
            width={600}
            height={400}
          />
        </div>
        <div className="py-4 px-4 flex flex-col justify-between flex-grow">
          {date && (
            <span className="mb-2 inline-block rounded bg-black px-4 py-1 text-left text-xs font-semibold text-white">
              Date Published: {date}
            </span>
          )}
          <div className="text-sm font-semibold text-sky-600 dark:text-gray-400">
            <span className="text-black">Author:</span> {author}
          </div>
          <h3 className="mb-4 text-xl font-semibold text-dark dark:text-white">
            {CardTitle}
          </h3>
          <div className="mb-4 text-base text-body-color dark:text-dark-6">
            {CardDescription}
          </div>
        </div>
      </div>
    </div>
    // </Link>
  );
};

export default function LatestNewsWithSuspense({
  searchParams,
}: LatestNewsProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LatestNewsRoll searchParams={searchParams} />
    </Suspense>
  );
}

// Loading Spinner component
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen py-20">
      <div className="text-center">
        <div className="mb-4 inline-block h-16 w-16 animate-spin rounded-full border-t-4 border-blue-500"></div>
        <p className="text-xl font-semibold">Loading ...</p>
      </div>
    </div>
  );
};
