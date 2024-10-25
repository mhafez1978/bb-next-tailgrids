import React from "react";

export default function Skeleton() {
  return (
    <section className="bg-white py-20 min-h-screen dark:bg-dark">
      <div className="container mx-auto">
        <div className="mx-auto w-full max-w-[570px] space-y-4">
          <div className="h-3 w-full rounded-full bg-gradient-to-r from-gray-1 to-gray-4 dark:from-dark-4 dark:to-dark-5"></div>
          <div className="h-3 w-4/6 rounded-full bg-gradient-to-r from-gray-1 to-gray-4 dark:from-dark-4 dark:to-dark-5"></div>
          <div className="h-3 w-5/6 rounded-full bg-gradient-to-r from-gray-1 to-gray-4 dark:from-dark-4 dark:to-dark-5"></div>
          <div className="h-3 w-full rounded-full bg-gradient-to-r from-gray-1 to-gray-4 dark:from-dark-4 dark:to-dark-5"></div>
        </div>
      </div>
    </section>
  );
}
