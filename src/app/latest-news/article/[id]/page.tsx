import React from "react";
import Cta from "@/components/responsive/banner/call-to-action/CTA";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import DOMPurify from "dompurify";
import LikePostButton from "@/components/responsive/like-button/LikePostButton";

interface Tag {
  id: number;
  slug: string;
  name: string;
}

export const metadata: Metadata = {
  title: "Blooming Brands | Blog ",
  description:
    "Boston based Website Design, Development, and Online Marketing Agency",
  keywords:
    "website design, website development, online stores, online marketing",
  applicationName: "Blooming Brands", // Provide the app name or remove this field if unnecessary
  authors: [{ name: "Mohamed Hafez" }], // Changed to array of objects
  creator: "Blooming Brands Web Development Team",
  publisher: "Blooming Brands LLC a division subsidiary of Nodes Unlimited LLC",
};

const Post = async ({ params }: { params: { id: string } }) => {
  try {
    // Fetch the current post using the post ID from params
    const data = await fetch(
      `https://api.blooming-brands.com/wp-json/wp/v2/posts/${params.id}?_embed`
    );
    const post = await data.json();

    // Check if the post fetch was successful
    if (!post || !post.title) {
      return (
        <>
          <p>Sorry, but this post could not be found, </p>
          <Link href="/latest-news">Go Back</Link>
        </>
      );
    }

    // Fetch all posts to find the next and previous posts
    const allPostsRes = await fetch(
      `https://api.blooming-brands.com/wp-json/wp/v2/posts?per_page=100`
    );
    const allPosts = await allPostsRes.json();

    // Find the index of the current post
    const currentPostIndex = allPosts.findIndex(
      (p: { id: number }) => p.id === parseInt(params.id)
    );

    // Get the next post (if available)
    const nextPost =
      currentPostIndex < allPosts.length - 1
        ? allPosts[currentPostIndex + 1]
        : null;

    // Get the previous post (if available)
    const previousPost =
      currentPostIndex > 0 ? allPosts[currentPostIndex - 1] : null;

    // Fetch post tags
    let tagsData: Tag[] = [];
    if (post.tags.length > 0) {
      const tagsRes = await fetch(
        `https://api.blooming-brands.com/wp-json/wp/v2/tags?include=${post.tags.join(
          ","
        )}`
      );
      tagsData = await tagsRes.json();
    }

    // Extract author from embedded data
    const author = post._embedded?.author?.[0] || {
      name: "Webmaster",
      avatar_urls: { 96: "https://placehold.co/40x40" },
    };

    // Handle fallback for post image (use a placeholder if no featured image)
    const postImage =
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url?.trim() || // Check for empty or undefined source_url
      "https://via.placeholder.com/600x400.png"; // Fallback to PNG

    // Sanitize the content
    const sanitizedContent =
      typeof window !== "undefined"
        ? DOMPurify.sanitize(post.content.rendered.trim())
        : post.content.rendered.trim();

    return (
      <section id="post" className="bg-white py-20 dark:bg-dark lg:py-[120px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-10/12 xl:w-8/12">
              <div className="w-full">
                <h1 className="mb-6 text-[26px] font-bold leading-normal text-dark dark:text-white sm:text-3xl sm:leading-snug md:text-4xl md:leading-snug">
                  {post.title.rendered}
                </h1>
                <div className="flex flex-wrap items-center pb-4">
                  <div className="mb-4 mr-5 flex items-center md:mr-10">
                    <div className="mr-4 h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        width={40}
                        height={40}
                        src={
                          author.avatar_urls?.[96] ||
                          "https://placehold.co/40x40"
                        } // Use dynamic URL from WordPress
                        alt={author.name}
                        className="w-full"
                      />
                    </div>
                    <p className="text-base text-body-color dark:text-dark-6">
                      <span className="pr-0.5 font-black">
                        Article Written By:{" "}
                      </span>
                      {author.name}
                    </p>
                  </div>
                  <div className="mb-4 flex items-center">
                    <p className="mr-5 flex items-center text-sm font-black text-body-color dark:text-dark-6 md:mr-8">
                      Published On:{" "}
                      <span className="font-medium">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded pb-10">
                  <Image
                    width={1200}
                    height={960}
                    src={postImage}
                    alt="Post Image"
                    className="w-full"
                    priority
                  />
                </div>

                <div
                  dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                  className="mb-8 text-base leading-relaxed text-body-color dark:text-dark-6"
                ></div>

                <div className="w-full flex flex-row">
                  <LikePostButton postId={post.id} />
                </div>

                {/* Dynamically render post tags only if they exist */}
                {tagsData.length > 0 && (
                  <div className="mb-8">
                    <h3 className="mb-4 text-xl font-bold">Tags</h3>
                    <div className="flex flex-wrap">
                      {tagsData.map((tag: Tag) => (
                        <MetaTagItem
                          key={tag.id}
                          slug={tag.slug}
                          name={tag.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-evenly gap-4 items-center mt-10 mb-14 py-6">
                  {previousPost && (
                    <a
                      href={`/latest-news/article/${previousPost.id}`}
                      className="group flex items-center rounded-lg px-6 py-3 border-2 border-black hover:shadow-md hover:transition-all hover:duration-300 hover:ease-in-out hover:border-emerald-500"
                    >
                      <div className="flex flex-col justify-center items-center mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300 ease-in-out"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        <span className="text-sm font-medium">
                          Previous Post:
                        </span>
                        <span className="text-sm mt-1">
                          {previousPost.title.rendered}
                        </span>
                      </div>
                    </a>
                  )}
                  {nextPost && (
                    <a
                      href={`/latest-news/article/${nextPost.id}`}
                      className="group flex items-center border-2 border-black rounded-lg px-6 py-3 hover:shadow-md hover:transition-all hover:duration-300 hover:ease-in-out hover:border-emerald-500"
                    >
                      <div className="flex flex-col items-end justify-center">
                        <span className="text-sm font-medium">Next Post:</span>
                        <span className="text-sm mt-1">
                          {nextPost.title.rendered}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center items-center ml-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 ease-in-out"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          <Cta
            secondaryCallToActionText="Get A Free Quote Today"
            mainCallToActionText="Have a new project in mind?"
            mainCallToActionTextAfterBlockOnSmall=""
            mainCallToActionButtonText="Call us"
          />
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching post data", error);
    return <p>Failed to load post content. Please try again later.</p>;
  }
};

export default Post;

const MetaTagItem = ({ slug, name }: { slug: string; name: string }) => {
  return (
    <a
      href={`/latest-news/tag/${slug}`}
      className="mb-2 mr-2 block rounded bg-black/5 px-5 py-2 text-xs font-medium text-black hover:bg-black hover:text-white md:mr-4 lg:mr-2 xl:mr-4"
    >
      {name}
    </a>
  );
};
