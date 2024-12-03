"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function NewsLetterForm() {
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // Honeypot field
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      // Honeypot field is filled, likely spam
      setStatus("Spam detected. Submission rejected.");
      return;
    }

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
      <div className="w-screen bg-black pt-[100px] pb-[100px] px-[50px]">
        <div className="container mx-auto min-h-[40vh] flex flex-col gap-10 items-center justify-center lg:flex-row lg:items-center lg:justify-center">
          <div className="flex flex-col w-full items-start lg:w-2/3">
            <h2 className="text-white font-black text-4xl mb-4 capitalize italic">
              Signup for our newsletter
            </h2>
            <p className="text-white text-md font-thin">
              Stay up to date with our latest news, articles, and promotions
              from Blooming Brands LLC.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full gap-4 lg:gap-4">
              <div className="w-full">
                <div className="w-full flex flex-row gap-2 justify-start items-start mb-4 -mt-2 lg:mt-0">
                  {/* Honeypot field (hidden) */}
                  <input
                    type="text"
                    id="honeypot"
                    name="honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: "none", width: "0" }}
                    aria-hidden="true"
                  />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@email.com"
                    className="p-2 w-full h-[80px] text-2xl rounded-md border shadow-sm focus:border-purple-600 focus:ring-purple-400"
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
              <div className="flex flex-col lg:-mt-4">
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
                    className="ml-2 font-thin text-[.7rem] text-gray-100"
                  >
                    I opt-in to receive marketing emails from Blooming Brands
                    LLC.
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
