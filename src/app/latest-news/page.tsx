import type { Metadata } from "next";
import PageTop from "@/components/responsive/page-top/PageTop";
import Pagination from "@/components/pagination/Pagination";
import Image from "next/image";
import { Suspense } from "react";

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
  searchParams: Record<string, string | string[] | undefined>; // Search parameters
}

// Component to display the latest news with posts and pagination
const LatestNewsRoll = async ({ searchParams }: LatestNewsProps) => {
  // Handle pagination with default to page 1
  const page = parseInt(searchParams.page?.toString() || "1");
  const perPage = 5;

  try {
    // Fetch posts data from WordPress API
    const data = await fetch(
      `https://api.blooming-brands.com/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}`
    );

    if (!data.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = (await data.json()) as WordPressPost[];
    const totalPages = parseInt(data.headers.get("X-WP-TotalPages") || "1");

    // Fetch media details function
    const fetchMedia = async (mediaUrl: string) => {
      try {
        const mediaResponse = await fetch(mediaUrl);
        if (!mediaResponse.ok) {
          throw new Error("Media fetch failed");
        }
        const mediaData = await mediaResponse.json();
        return mediaData.source_url || "";
      } catch (error) {
        console.error("Error fetching media:", error);
        return "https://i.ibb.co/Cnwd4q6/image-01.jpg"; // Fallback image URL
      }
    };

    return (
      <>
        <PageTop PageMessage="Latest News" />
        <section className="bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
          <div className="container mx-auto">
            <div className="-mx-4 flex flex-wrap">
              {await Promise.all(
                posts.map(async (post: WordPressPost) => {
                  let imageUrl = "https://i.ibb.co/Cnwd4q6/image-01.jpg";

                  if (
                    post._links["wp:attachment"] &&
                    post._links["wp:attachment"].length > 0
                  ) {
                    const fetchedUrl = await fetchMedia(
                      post._links["wp:attachment"][0].href
                    );
                    if (fetchedUrl) {
                      imageUrl = fetchedUrl;
                    }
                  }

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
                            __html: post.excerpt.rendered,
                          }}
                        />
                      }
                      image={imageUrl}
                    />
                  );
                })
              )}
            </div>

            {/* Pagination */}
            <Pagination currentPage={page} totalPages={totalPages} />
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error in LatestNewsRoll:", error);
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">Failed to load news articles.</h2>
        <p>Please try again later.</p>
      </div>
    );
  }
};

// PostCard component for rendering individual posts
const PostCard = ({
  image,
  date,
  CardTitle,
  CardDescription,
  id,
}: {
  image: string;
  date: string;
  CardTitle: string;
  CardDescription: React.ReactNode;
  id: number;
}) => {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="mb-10 w-full">
        <div className="mb-8 overflow-hidden rounded">
          <Image
            src={image}
            alt=""
            className="w-full"
            width={400}
            height={300}
          />
        </div>
        <div>
          {date && (
            <span className="mb-5 inline-block rounded bg-black px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
              {date}
            </span>
          )}
          <h3>
            <a
              href={`/latest-news/article/${id}`}
              className="mb-4 inline-block text-xl font-semibold text-dark hover:text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
            >
              {CardTitle}
            </a>
          </h3>
          <div className="text-base text-body-color dark:text-dark-6">
            {CardDescription}
          </div>
        </div>
      </div>
    </div>
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
