"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/app/context/AuthContext";

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Login failed.");
      } else {
        setError("Login failed.");
      }
    }
  };

  return (
    <>
      <div className="py-40 min-h-[100vh] flex flex-col justify-center">
        <div className="max-w-lg h-[30vh] mx-auto p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
