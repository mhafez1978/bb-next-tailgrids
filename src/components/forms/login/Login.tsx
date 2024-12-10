"use client";

import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setError(error || "Invalid credentials");
      }
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Error during login:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-[#e7feed]">
      <video
        autoPlay
        loop
        muted
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
      >
        <source src="/office.mp4" type="video/mp4" />
      </video>
      <div className="container mx-auto flex flex-row-reverse z-20">
        <div className="w-1/3">
          <div className="flex items-center justify-center min-h-screen">
            <form
              onSubmit={handleSubmit}
              className="bg-white/70 p-8 rounded shadow-md w-96 min-h-[400px] z-20"
            >
              <h1 className="text-3xl font-bold mb-4 italic">Welcome back</h1>
              <h3 className="text-xl font-semibold mb-6">Login</h3>
              {error && (
                <p className="text-red-500 text-sm mb-4 font-semibold italic">
                  {error}
                </p>
              )}
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <a href={`${process.env.NEXT_PUBLIC_RESET_PASSWORD}`}>
                Forgot Password
              </a>
            </form>
          </div>
        </div>
        <div className="w-2/3 bg-[url('/login-bg-02.png')] bg-[length:800px_690px] bg-center bg-no-repeat"></div>
      </div>
    </div>
  );
}
