"use client";
import { useState } from "react";

export default function NewsLetterForm() {
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !optIn) {
      setStatus("Please provide a valid email and agree to the terms.");
      return;
    }

    try {
      const response = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("Thank you for signing up!");
        setEmail("");
        setOptIn(false);
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setStatus(error.message);
      } else {
        setStatus("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="w-screen flex flex-col min-h-[80vh] justify-center items-center py-22 mb-22">
      <div className="max-w-md mx-auto h-[54vh] p-20 bg-white shadow-lg rounded-lg border border-gray-200 hover:bg-pink-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Signup for our Newsletter
        </h2>
        <p className="text-gray-600 mb-6">
          Stay updated with the latest news, promotions, and updates from
          Blooming Brands.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="optIn"
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="optIn" className="ml-2 block text-sm text-gray-800">
              I agree to receive marketing emails from Blooming Brands.
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Subscribe
          </button>
        </form>
        {status && (
          <p
            className={`mt-4 text-sm font-medium ${
              status.startsWith("Thank") ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
