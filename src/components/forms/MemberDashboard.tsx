// "use client";

// import { useContext, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { AuthContext } from "@/app/context/AuthContext";

// const MemberDashboard = () => {
//   const { isAuthenticated, token, logout } = useContext(AuthContext);
//   const router = useRouter();

//   // Redirect to login if not authenticated
//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/login");
//     }
//   }, [isAuthenticated, router]);

//   if (!isAuthenticated) {
//     return <p>Redirecting to login...</p>;
//   }

//   // Decode JWT token (optional: display user info)
//   const decodeToken = () => {
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
//       return payload.user;
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       return null;
//     }
//   };

//   const user = decodeToken();

//   return (
//     <div className="w-screen min-h-[80vh] flex flex-col justify-start py-32 items-start">
//       <div className="container mx-auto">
//         <div className="max-w-4xl p-6 bg-gray-100 rounded-lg shadow">
//           <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
//           {user && (
//             <div className="mb-6">
//               <p>
//                 <strong>Username:</strong> {user.login}
//               </p>
//               <p>
//                 <strong>Email:</strong> {user.email}
//               </p>
//             </div>
//           )}
//           <button
//             onClick={logout}
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemberDashboard;

"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";

const MemberDashboard = () => {
  const { isAuthenticated, token, logout } = useContext(AuthContext);
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <p>Redirecting to login...</p>;
  }

  // Decode JWT token (optional: display user info)
  const decodeToken = () => {
    if (!token) {
      console.error("Token is missing or invalid.");
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      return payload.user;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const user = decodeToken();

  return (
    <div className="w-screen min-h-[80vh] flex flex-col justify-start py-32 items-start">
      <div className="container mx-auto">
        <div className="max-w-4xl p-6 bg-gray-100 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
          {user && (
            <div className="mb-6">
              <p>
                <strong>Username:</strong> {user.login}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          )}
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
