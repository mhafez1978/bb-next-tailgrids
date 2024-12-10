// "use client";

// import { useEffect, useState } from "react";
// import LogoutBtn from "@/components/forms/logout/LogoutBtn";
// import TasksTodo from "../todos/TasksTodo";

// export default function AdminDashboard({ username }: { username: string }) {
//   const [token, setToken] = useState<string | null>(null);
//   const [todos, setTodos] = useState<Todo[] | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch the token on mount
//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const response = await fetch("/api/auth/get-token");
//         const data = await response.json();
//         if (data.token) {
//           setToken(data.token);
//         } else {
//           setError("Token or user information not found");
//         }
//       } catch {
//         setError("Failed to fetch token");
//       }
//     };

//     fetchToken();
//   }, []);

//   return (
//     <div className="w-screen min-h-[50vh]">
//       <div className="max-w-[1280px] mx-auto bg-white">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-sky-700">Admin Dashboard</h1>
//           <LogoutBtn />
//         </div>
//         <div className="flex flex-col gap-4">
//           <h2 className="text-2xl font-semibold text-sky-700">
//             Welcome, {username}
//           </h2>
//           <p className="font-3xl font-semibold">Your token:</p>
//           <p className="w-2/3 text-lg text-wrap break-all">
//             {token ? `${token}` : "Fetching token..."}
//           </p>
//         </div>
//         <div>
//           <TasksTodo token={token} />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import LogoutBtn from "@/components/forms/logout/LogoutBtn";
import TasksTodo from "@/components/responsive/todos/TasksTodo";

// Props for AdminDashboard
interface AdminDashboardProps {
  username: string;
}

// Props for TasksTodo
// interface TasksTodoProps {
//   token: string;
// }

export default function AdminDashboard({ username }: AdminDashboardProps) {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch the token on mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("/api/auth/get-token");
        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const data = await response.json();
        if (data.token) {
          setToken(data.token);
        } else {
          setError("Token not found in the response");
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    };

    fetchToken();
  }, []);

  return (
    <div className="w-screen min-h-[50vh]">
      <div className="max-w-[1280px] mx-auto bg-white">
        <div className="container mx-auto flex flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-sky-700">Admin Dashboard</h1>
          <LogoutBtn />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-sky-700">
            Welcome, {username}
          </h2>
          <p className="hidden font-3xl font-semibold">Your token:</p>
          <p className="hidden w-2/3 text-lg text-wrap break-all">
            {token
              ? `${token}`
              : error
                ? `Error: ${error}`
                : "Fetching token..."}
          </p>
        </div>
        <div>
          {/* Render TasksTodo only if the token is available */}
          {token ? (
            <div className="mt-[100px] mb-[200px]">
              <TasksTodo token={token} />
            </div>
          ) : (
            <p className="text-center text-red-500 mt-4">
              {error || "Loading Tasks Todo..."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
