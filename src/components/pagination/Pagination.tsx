// components/Pagination.tsx (Client Component)
"use client"; // This makes the component a Client Component

import { useRouter } from "next/navigation";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      // Update the URL with the new page number and trigger navigation
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", newPage.toString());
      router.push(`?${searchParams.toString()}`);
    }
  };

  return (
    <div className="bg-white py-10 text-center dark:bg-dark">
      <div className="inline-flex gap-1 rounded-full border border-stroke p-3 dark:border-white/10">
        <ul className="flex items-center gap-1">
          {/* Previous Page */}
          <li>
            <button
              className="flex h-10 min-w-10 items-center justify-center rounded-full px-2 text-dark hover:bg-gray-2 dark:text-white dark:hover:bg-white/5"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt; {/* Left arrow */}
            </button>
          </li>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index}>
              <button
                className={`flex h-10 min-w-10 items-center justify-center rounded-full px-2 ${
                  currentPage === index + 1
                    ? "bg-primary text-white"
                    : "text-dark hover:bg-gray-2 dark:text-white dark:hover:bg-white/5"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          {/* Next Page */}
          <li>
            <button
              className="flex h-10 min-w-10 items-center justify-center rounded-full px-2 text-dark hover:bg-gray-2 dark:text-white dark:hover:bg-white/5"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt; {/* Right arrow */}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
