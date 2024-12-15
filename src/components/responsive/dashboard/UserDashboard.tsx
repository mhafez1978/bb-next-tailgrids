"use client";

import { useEffect, useState } from "react";
import LogoutBtn from "@/components/forms/logout/LogoutBtn";

interface UserDashboardProps {
  username: string;
}

export default function UserDashboard({ username }: UserDashboardProps) {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  //const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      const response = await fetch("/api/auth/get-token"); // Call your API route to get the token
      const data = await response.json();
      //console.log(typeof data);
      if (data.token) {
        setToken(data.token);
      } else {
        setError("Token or user information not found");
      }
    }
    fetchToken();
  }, []);

  return (
    <div className="w-screen min-h-[50vh] mt-[84px]">
      <div className="container bg-white">
        <div className="flex flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <LogoutBtn />
        </div>
        <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <h3 className="font-thin text-2xl capitalize mb-4">
                Welcome back,{" "}
                <span className="font-black italic">{username}</span>
              </h3>
              <pre className="hidden text-base text-wrap break break-all mb-4">
                {token}
              </pre>
              <p>{new Date().toLocaleString()}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
