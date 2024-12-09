// "use client";

// import { useEffect, useState } from "react";
// import LogoutBtn from "@/components/forms/logout/LogoutBtn";
// import TodoApp from "@/components/forms/todo/Todo";

// interface AdminDashboardProps {
//   username: string;
// }

// interface Todo {
//   id: string; // or number, based on your data
//   title: string;
//   date: Date | string; // Use `Date` for parsed dates or `string` for raw dates from the API
// }

// export default function AdminDashboard({ username }: AdminDashboardProps) {
//   const [token, setToken] = useState<string | null>(null);
//   const [todos, setTodos] = useState<Todo[] | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchToken() {
//       const response = await fetch("/api/auth/get-token"); // Call your API route to get the token
//       const data = await response.json();
//       if (data.token) {
//         setToken(data.token);
//       } else {
//         setError("Token or user information not found");
//       }
//     }
//     fetchToken();
//   }, []);

//   //   useEffect(() => {
//   //     async function fetchTodos() {
//   //       try {
//   //         const response = await fetch(
//   //           "https://api.blooming-brands.com/wp-json/wp/v2/todo"
//   //         );

//   //         if (!response.ok) {
//   //           throw new Error(`Failed to fetch todos. Status: ${response.status}`);
//   //         }

//   //         const data = await response.json();
//   //         if (data) {
//   //           console.log(data);
//   //           setTodos(data); // Update state with fetched todos
//   //         } else {
//   //           setError("No todos found");
//   //         }
//   //       } catch (err) {
//   //         console.error("Error fetching todos:", err);
//   //         setError(
//   //           err instanceof Error
//   //             ? err.message
//   //             : "An unknown error occurred while fetching todos"
//   //         );
//   //       }
//   //     }

//   //     fetchTodos();
//   //   }, []); // Dependency array

//   useEffect(() => {
//     async function fetchTodos() {
//       try {
//         const response = await fetch(
//           "https://api.blooming-brands.com/wp-json/wp/v2/todo"
//         );

//         if (!response.ok) {
//           throw new Error(`Failed to fetch todos. Status: ${response.status}`);
//         }

//         const data = await response.json();
//         if (data) {
//           console.log(data);
//           // Ensure the `date` field is converted to a Date object if it's a string
//           const formattedTodos = data.map((todo: Todo) => ({
//             ...todo,
//             date: new Date(todo.date), // Convert string to Date object
//           }));
//           setTodos(formattedTodos);
//         } else {
//           setError("No todos found");
//         }
//       } catch (err) {
//         console.error("Error fetching todos:", err);
//         setError(
//           err instanceof Error
//             ? err.message
//             : "An unknown error occurred while fetching todos"
//         );
//       }
//     }

//     fetchTodos();
//   }, []);

//   const handleDelete = async (id: number) => {
//     const response = await fetch("/api/todos", {
//       method: "DELETE",
//       body: JSON.stringify({ id }),
//     });

//     if (response.ok) {
//       if (todos) {
//         setTodos(todos.filter((todo) => todo.id !== id));
//       }
//     }
//   };

//   const handleEdit = async (id: number, newTitle: string) => {
//     const response = await fetch("/api/todos", {
//       method: "PUT",
//       body: JSON.stringify({ id, updates: { title: newTitle } }),
//     });

//     if (response.ok) {
//       const updatedTodo = await response.json();
//       if (todos) {
//         setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
//       }
//     }
//   };

//   return (
//     <div className="w-screen min-h-[100vh] mt-[100px]">
//       <div className="max-w-[1280px] mx-auto bg-white">
//         <div className="flex flex-row justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-sky-700">Admin Dashboard</h1>
//           <LogoutBtn />
//         </div>
//         <div className="max-w-[1280px] mx-auto p-6 bg-white rounded shadow">
//           {error ? (
//             <p className="text-red-500">{error}</p>
//           ) : (
//             <>
//               <h3 className="font-thin text-2xl mb-4">
//                 Welcome back,{" "}
//                 <span className="font-black italic">{username}</span> !
//               </h3>
//               <pre className="hidden text-base text-wrap break break-all mb-4">
//                 {token}
//               </pre>
//               <p className="mb-8">This is the website admin dashboard.</p>
//               <h4 className="text-xl font-bold mb-4">My Todo List:</h4>
//               <div className="w-full flex flex-wrap gap-4 ">
//                 {todos?.map((todo) => (
//                   <div
//                     key={todo.id}
//                     className="relative bg-gray-100 p-4 rounded shadow pb-4"
//                   >
//                     <h4 className="max-w-[200px] text-base font-semibold italic mb-2 wrap-text">
//                       {todo.title.rendered}
//                     </h4>
//                     <p>
//                       {todo.date.toLocaleString("en-US", {
//                         month: "2-digit",
//                         day: "2-digit",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                         second: "2-digit",
//                         hour12: true,
//                       })}
//                     </p>
//                     <p
//                       className="text-sm min-w-[100px] max-w-[200px] mt-2 mb-14 wrap-text"
//                       dangerouslySetInnerHTML={{
//                         __html: todo.content.rendered,
//                       }}
//                     >
//                       {/* {todo.content.rendered} */}
//                     </p>
//                     {/* <div className="absolute bottom-4 w-[200px] mx-auto flex-row gap-4 items-center">
//                       <button
//                         className="w-1/2 bg-red-500 text-white py-2 px-6"
//                         onClick={() => handleDelete(todo.id)}
//                       >
//                         Delete
//                       </button>
//                       <button
//                         className="w-1/2 bg-emerald-500 text-white py-2 px-6"
//                         onClick={() => handleEdit(todo.id, "New Title")}
//                       >
//                         Edit
//                       </button>
//                     </div> */}
//                   </div>
//                 ))}
//               </div>
//               <div>
//                 <TodoApp />
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import LogoutBtn from "@/components/forms/logout/LogoutBtn";
import TodoApp from "@/components/forms/todo/Todo";

// Define Todo interface
interface Todo {
  id: string; // or number, based on your data
  title: string;
  content: { rendered: string }; // Ensure correct structure for content
  date: Date; // Use Date type for parsed dates
}

interface AdminDashboardProps {
  username: string;
}

export default function AdminDashboard({ username }: AdminDashboardProps) {
  const [token, setToken] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch("/api/auth/get-token");
        const data = await response.json();
        if (data.token) {
          setToken(data.token);
        } else {
          setError("Token or user information not found");
        }
      } catch (err) {
        console.error("Error fetching token:", err);
        setError("Failed to fetch token");
      }
    }
    fetchToken();
  }, []);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(
          "https://api.blooming-brands.com/wp-json/wp/v2/todo"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch todos. Status: ${response.status}`);
        }

        const data = await response.json();
        if (data) {
          const formattedTodos = data.map((todo: Todo) => ({
            id: todo.id,
            title: todo.title,
            content: todo.content,
            date: new Date(todo.date), // Parse date field
          }));
          setTodos(formattedTodos);
        } else {
          setError("No todos found");
        }
      } catch (err) {
        console.error("Error fetching todos:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An unknown error occurred while fetching todos"
        );
      }
    }
    fetchTodos();
  }, []);

  // Function to delete a todo
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodos(
          (prevTodos) => prevTodos?.filter((todo) => todo.id !== id) || null
        );
      } else {
        console.error("Failed to delete todo");
      }
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  // Function to edit a todo
  const handleEdit = async (id: string, newTitle: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(
          (prevTodos) =>
            prevTodos?.map((todo) =>
              todo.id === id ? { ...todo, title: updatedTodo.title } : todo
            ) || null
        );
      } else {
        console.error("Failed to update todo");
      }
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  return (
    <div className="w-screen min-h-[100vh] mt-[100px]">
      <div className="max-w-[1280px] mx-auto bg-white">
        <div className="flex flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-sky-700">Admin Dashboard</h1>
          <LogoutBtn />
        </div>
        <div className="max-w-[1280px] mx-auto p-6 bg-white rounded shadow">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <h3 className="font-thin text-2xl mb-4">
                Welcome back,{" "}
                <span className="font-black italic">{username}</span>!
              </h3>
              <pre className="hidden text-base text-wrap break break-all mb-4">
                {token}
              </pre>
              <p className="mb-8">This is the website admin dashboard.</p>
              <h4 className="text-xl font-bold mb-4">My Todo List:</h4>
              <div className="w-full flex flex-wrap gap-4">
                {todos?.map((todo) => (
                  <div
                    key={todo.id}
                    className="relative bg-gray-100 p-4 rounded shadow pb-4"
                  >
                    <h4 className="text-base font-semibold italic mb-2">
                      {todo.title}
                    </h4>
                    <p>
                      {todo.date.toLocaleString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}
                    </p>
                    <p
                      className="text-sm mt-2 mb-14"
                      dangerouslySetInnerHTML={{
                        __html: todo.content.rendered,
                      }}
                    />
                    <div className="absolute bottom-4 left-0 w-full flex gap-4">
                      <button
                        className="w-1/2 bg-red-500 text-white py-2 px-6 rounded"
                        onClick={() => handleDelete(todo.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="w-1/2 bg-emerald-500 text-white py-2 px-6 rounded"
                        onClick={() => handleEdit(todo.id, "Updated Title")}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <TodoApp />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
