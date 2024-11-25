"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/app/context/AuthContext";

export default function RegisterForm() {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const message = await register(username, password, email);
      setSuccessMessage(message);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Registration failed.");
      } else {
        setError("Registration failed.");
      }
    }
  };

  return (
    <div className="w-screen min-h-[100vh] flex flex-col justify-center">
      <div className="max-w-md h-[38vh] mx-auto p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
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
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && (
            <p className="text-green-500">
              {successMessage}.{" "}
              <a href="/login" className="underline">
                Login here
              </a>
              .
            </p>
          )}
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
