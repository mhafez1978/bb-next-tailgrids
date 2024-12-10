"use client";
//import RandomFunnyImage from "@/app/util/RandomFunnyImage";
import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setError(error || "Failed to register");
      } else {
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen relative min-h-[50vh] bg-[url('/register-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto flex flex-row-reverse">
        <div className="absolute w-screen h-screen left-0 top-0 bg-black/70 z-10"></div>
        <div className="w-3/4 min-h-[100vh] flex flex-col justify-end p-10 ">
          {/* <RandomFunnyImage /> */}
        </div>
        <div className="w-1/4 h-full overflow-visible">
          <div className="min-h-[100vh] w-full flex flex-col items-start justify-center overflow-visible ">
            <h2 className="font-black w-[250%] text-white text-[5rem] italic mb-2 z-20">
              Let&apos;s Get Started
            </h2>
            <p className="mb-10 text-white text-3xl font-semibold w-[250%] z-20">
              Register for a new account
            </p>
            <form
              onSubmit={handleSubmit}
              className="bg-white/70 p-8 rounded min-h-[500px] shadow-md w-96 z-20"
            >
              <h1 className="text-2xl font-bold mb-6">
                Welcome, please register
              </h1>
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
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
              <div>
                <p className="mt-4">
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-500">
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
