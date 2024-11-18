"use client";
import { Button } from "@/components/ui/button";
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
        setStatus(
          "This email exists..., if this is an error try again or contact the webmaster."
        );
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
    <>
      <div className="w-screen bg-black">
        <div className="container mx-auto min-h-[40vh] flex flex-row gap-10 items-center py-22">
          <div className="flex flex-col w-1/2 items-start h-[14vh]">
            <h2 className="text-white font-semibold text-4xl mb-4 capitalize">
              Signup for our newsletter
            </h2>
            <p className="text-white text-md">
              Stay updated with the latest news, promotions, and updates from
              Blooming Brands.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-1/2 gap-4">
              <div className="w-full flex flex-row gap-4 items-center">
                <div className="flex flex-row gap-4">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@email.com"
                    className="p-2 block w-[400px] h-[80px] text-2xl rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Button
                    type="submit"
                    className="w-[200px] h-[80px] text-2xl text-white rounded-md border-gray-300 shadow-sm hover:text-emerald-600 hover:bg-purple-200 focus:border-blue-500 focus:ring-blue-500"
                    variant={"outline"}
                  >
                    Signup
                  </Button>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row gap-2 items-center">
                  <input
                    required
                    type="checkbox"
                    id="optIn"
                    checked={optIn}
                    onChange={(e) => setOptIn(e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="optIn"
                    className="ml-2 block text-md text-gray-100"
                  >
                    I agree to receive marketing emails from Blooming Brands.
                  </label>
                </div>
                {status && (
                  <div className="w-full">
                    <p
                      className={`mt-4 bb-4 text-md font-medium ${
                        status.startsWith("Thank")
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {status}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
