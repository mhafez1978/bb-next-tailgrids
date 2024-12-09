import AdminDashboard from "@/components/responsive/dashboard/AdminDashboard";
import UserDashboard from "@/components/responsive/dashboard/UserDashboard";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import type { Metadata } from "next";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Blooming Brands | Dahsboard",
  description:
    "Blooming Brands Blog , should provide our latest news, projects, promotional offers...",
  keywords:
    "website design, website development, online stores, online marketing",
  applicationName: "Blooming Brands",
  authors: [{ name: "Mohamed Hafez" }],
  creator: "Blooming Brands Web Development Team",
  publisher: "Blooming Brands LLC",
};

export default function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    // If no token, redirect to login
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-xl">
          Access Denied. Please{" "}
          <a href="/login" className="text-blue-500 underline">
            login
          </a>
          .
        </p>
      </div>
    );
  }

  let userRole = null;
  let userName = null; // Ensure userName is initialized

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      user: { role: string; login: string };
    };
    userRole = decoded?.user?.role;
    userName = decoded?.user?.login;
    console.log("User role:", userRole); // Debugging line to check the user's role
    console.log("User name:", userName); // Debugging line to check the user's name
  } catch (err) {
    console.error("Token verification failed:", err);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-xl">
          Invalid session. Please{" "}
          <a href="/login" className="text-blue-500 underline">
            login
          </a>
          .
        </p>
      </div>
    );
  }

  // Render based on role
  if (["admin", "editor", "superadmin", "administrator"].includes(userRole)) {
    return <AdminDashboard username={userName} />; // Pass userName as a prop
  } else if (["author", "contributor", "subscriber"].includes(userRole)) {
    return <UserDashboard username={userName} />; // Pass userName as a prop
  } else {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-xl">Unauthorized Access.</p>
      </div>
    );
  }
}
