// "use client";

// import { createContext, useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   // Check authentication status on mount
//   useEffect(() => {
//     const storedToken = localStorage.getItem("jwtToken");
//     if (storedToken) {
//       setToken(storedToken);
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await fetch("/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Login failed.");
//       }

//       setToken(data.token);
//       setIsAuthenticated(true);
//       localStorage.setItem("jwtToken", data.token);
//       router.push("/dashboard"); // Redirect to dashboard
//     } catch (error) {
//       console.error("Login Error:", error.message);
//       throw error;
//     }
//   };

//   const logout = () => {
//     setToken(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem("jwtToken");
//     router.push("/login"); // Redirect to login page
//   };

//   const register = async (username, password, email) => {
//     try {
//       const response = await fetch("/api/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password, email }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Registration failed.");
//       }

//       return data.message;
//     } catch (error) {
//       console.error("Registration Error:", error.message);
//       throw error;
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         token,
//         isAuthenticated,
//         login,
//         logout,
//         register,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

// Define the type for your context
interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    username: string,
    password: string,
    email: string
  ) => Promise<string>;
}

// Provide a default value for the context
const defaultAuthContextValue: AuthContextType = {
  token: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  register: async () => "",
};

// Create the AuthContext with the default value
export const AuthContext = createContext<AuthContextType>(
  defaultAuthContextValue
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed.");
      }

      setToken(data.token);
      setIsAuthenticated(true);
      localStorage.setItem("jwtToken", data.token);
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error) {
      if (error instanceof Error) {
        console.error("Login Error:", error.message);
      } else {
        console.error("Login Error:", error);
      }
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("jwtToken");
    router.push("/login"); // Redirect to login page
  };

  const register = async (
    username: string,
    password: string,
    email: string
  ) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed.");
      }

      return data.message;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Registration Error:", error.message);
      } else {
        console.error("Registration Error:", error);
      }
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
