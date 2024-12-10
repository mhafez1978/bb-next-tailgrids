// // // "use client";

// // // import { useEffect, useState } from "react";

// // // // Props for TasksTodo
// // // interface TasksTodoProps {
// // //   token: string;
// // // }

// // // // Task interface
// // // interface Task {
// // //   id: string;
// // //   title: string;
// // //   content: string;
// // //   tags: string;
// // //   categories: string;
// // //   assigned: string;
// // //   created_at: string;
// // // }

// // // // User interface
// // // interface User {
// // //   id: string;
// // //   name: string;
// // // }

// // // const TasksTodo: React.FC<TasksTodoProps> = ({ token }) => {
// // //   const [tasks, setTasks] = useState<Task[]>([]);
// // //   const [loading, setLoading] = useState<boolean>(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [newTask, setNewTask] = useState({
// // //     title: "",
// // //     content: "",
// // //     tags: "",
// // //     categories: "",
// // //     assigned: "",
// // //   });
// // //   const [users, setUsers] = useState<User[]>([]);

// // //   // Fetch tasks
// // //   const fetchTasks = async () => {
// // //     setLoading(true);
// // //     setError(null);
// // //     try {
// // //       const response = await fetch("/api/tasks", {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error("Failed to fetch tasks");
// // //       }

// // //       const data = await response.json();
// // //       setTasks(data.message ? [] : data);
// // //     } catch (err: unknown) {
// // //       setError(err instanceof Error ? err.message : "Something went wrong");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Fetch users for assignment
// // //   const fetchUsers = async () => {
// // //     try {
// // //       const response = await fetch("/api/users");

// // //       if (!response.ok) {
// // //         throw new Error("Failed to fetch users");
// // //       }

// // //       const data: User[] = await response.json();
// // //       setUsers(
// // //         data.map((user) => ({ id: user.id.toString(), name: user.name }))
// // //       );
// // //     } catch (err: unknown) {
// // //       setError(err instanceof Error ? err.message : "Failed to fetch users");
// // //     }
// // //   };

// // //   // Add a new task
// // //   const addTask = async () => {
// // //     try {
// // //       const response = await fetch("/api/tasks", {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           Authorization: `Bearer ${token}`,
// // //         },
// // //         body: JSON.stringify(newTask),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error("Failed to add task");
// // //       }

// // //       await fetchTasks(); // Refresh tasks
// // //       setNewTask({
// // //         title: "",
// // //         content: "",
// // //         tags: "",
// // //         categories: "",
// // //         assigned: "",
// // //       });
// // //     } catch (err: unknown) {
// // //       setError(err instanceof Error ? err.message : "Something went wrong");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchTasks();
// // //     fetchUsers();
// // //   }, []);

// // //   return (
// // //     <div className="container mx-auto [min-h-50vh] bg-gray-100 flex flex-row gap-2 rounded-lg shadow-lg py-22">
// // //       <div className="w-3/4 p-6">
// // //         <h1 className="text-2xl font-bold mb-4">Tasks Todo</h1>
// // //         {error && <p className="text-red-500">{error}</p>}
// // //         {loading ? (
// // //           <p>Loading tasks...</p>
// // //         ) : (
// // //           <ul className="w-full h-[50vh] flex flex-wrap gap-x-2 gap-y-4">
// // //             {tasks.map((task) => (
// // //               <li
// // //                 key={task.id}
// // //                 className="w-[200px] h-[200px] p-4 bg-white rounded shadow"
// // //               >
// // //                 <h2 className="font-bold mb-2 capitalize">{task.title}</h2>
// // //                 <p className="mb-2 text-emerald-600">{task.content}</p>
// // //                 <p className="mb-2 text-sm text-gray-500">
// // //                   Tags: {task.tags} | Categories: {task.categories} | Assigned
// // //                   to:{" "}
// // //                   {users.find((user) => user.id === task.assigned)?.name ||
// // //                     "Unassigned"}
// // //                 </p>
// // //                 <p className="flex flex-row justify-between items-center">
// // //                   <button>Edit</button>
// // //                   <button>Delete</button>
// // //                 </p>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         )}
// // //       </div>

// // //       <div className="w-1/4 p-6">
// // //         <div className="space-y-4">
// // //           <h2 className="font-bold">Add New Task</h2>
// // //           <input
// // //             type="text"
// // //             placeholder="Title"
// // //             value={newTask.title}
// // //             onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
// // //             className="w-full p-2 border rounded"
// // //           />
// // //           <textarea
// // //             placeholder="Content"
// // //             value={newTask.content}
// // //             onChange={(e) =>
// // //               setNewTask({ ...newTask, content: e.target.value })
// // //             }
// // //             className="w-full p-2 border rounded"
// // //           />
// // //           <input
// // //             type="text"
// // //             placeholder="Tags"
// // //             value={newTask.tags}
// // //             onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
// // //             className="w-full p-2 border rounded"
// // //           />
// // //           <input
// // //             type="text"
// // //             placeholder="Categories"
// // //             value={newTask.categories}
// // //             onChange={(e) =>
// // //               setNewTask({ ...newTask, categories: e.target.value })
// // //             }
// // //             className="w-full p-2 border rounded"
// // //           />
// // //           <select
// // //             value={newTask.assigned}
// // //             onChange={(e) =>
// // //               setNewTask({ ...newTask, assigned: e.target.value })
// // //             }
// // //             className="w-full p-2 border rounded"
// // //           >
// // //             <option value="">Assign to...</option>
// // //             {users.map((user) => (
// // //               <option key={user.id} value={user.id}>
// // //                 {user.name}
// // //               </option>
// // //             ))}
// // //           </select>
// // //           <button
// // //             onClick={addTask}
// // //             className="bg-blue-500 text-white px-4 py-2 rounded"
// // //           >
// // //             Add Task
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default TasksTodo;

// // "use client";

// // import { useEffect, useState } from "react";

// // interface TasksTodoProps {
// //   token: string;
// // }

// // interface Task {
// //   id: string;
// //   title: string;
// //   content: string;
// //   tags: string;
// //   categories: string;
// //   assigned: string;
// //   created_at: string;
// // }

// // interface User {
// //   id: string;
// //   name: string;
// // }

// // const TasksTodo: React.FC<TasksTodoProps> = ({ token }) => {
// //   const [tasks, setTasks] = useState<Task[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [newTask, setNewTask] = useState({
// //     title: "",
// //     content: "",
// //     tags: "",
// //     categories: "",
// //     assigned: "",
// //   });
// //   const [editingTask, setEditingTask] = useState<string | null>(null);
// //   const [users, setUsers] = useState<User[]>([]);

// //   const fetchTasks = async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const response = await fetch("/api/tasks", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       if (!response.ok) {
// //         throw new Error("Failed to fetch tasks");
// //       }

// //       const data = await response.json();
// //       setTasks(data.message ? [] : data);
// //     } catch (err: unknown) {
// //       setError(err instanceof Error ? err.message : "Something went wrong");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchUsers = async () => {
// //     try {
// //       const response = await fetch("/api/users");

// //       if (!response.ok) {
// //         throw new Error("Failed to fetch users");
// //       }

// //       const data: User[] = await response.json();
// //       setUsers(
// //         data.map((user) => ({ id: user.id.toString(), name: user.name }))
// //       );
// //     } catch (err: unknown) {
// //       setError(err instanceof Error ? err.message : "Failed to fetch users");
// //     }
// //   };

// //   const addOrUpdateTask = async () => {
// //     const method = editingTask ? "PUT" : "POST";
// //     const endpoint = editingTask ? `/api/tasks/${editingTask}` : "/api/tasks";

// //     try {
// //       const response = await fetch(endpoint, {
// //         method,
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify(newTask),
// //       });

// //       if (!response.ok) {
// //         throw new Error(
// //           editingTask ? "Failed to update task" : "Failed to add task"
// //         );
// //       }

// //       await fetchTasks(); // Refresh tasks
// //       setNewTask({
// //         title: "",
// //         content: "",
// //         tags: "",
// //         categories: "",
// //         assigned: "",
// //       });
// //       setEditingTask(null); // Reset editing state
// //     } catch (err: unknown) {
// //       setError(err instanceof Error ? err.message : "Something went wrong");
// //     }
// //   };

// //   const deleteTask = async (id: string) => {
// //     try {
// //       const response = await fetch(`/api/tasks/${id}`, {
// //         method: "DELETE",
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       if (!response.ok) {
// //         throw new Error("Failed to delete task");
// //       }

// //       await fetchTasks(); // Refresh tasks
// //     } catch (err: unknown) {
// //       setError(err instanceof Error ? err.message : "Something went wrong");
// //     }
// //   };

// //   const startEditing = (task: Task) => {
// //     setNewTask({
// //       title: task.title,
// //       content: task.content,
// //       tags: task.tags,
// //       categories: task.categories,
// //       assigned: task.assigned,
// //     });
// //     setEditingTask(task.id);
// //   };

// //   useEffect(() => {
// //     fetchTasks();
// //     fetchUsers();
// //   }, []);

// //   return (
// //     <div className="container mx-auto [min-h-50vh] bg-gray-100 flex flex-row gap-2 rounded-lg shadow-lg py-22">
// //       <div className="w-3/4 p-6">
// //         <h1 className="text-2xl font-bold mb-4">Tasks Todo</h1>
// //         {error && <p className="text-red-500">{error}</p>}
// //         {loading ? (
// //           <p>Loading tasks...</p>
// //         ) : (
// //           <ul className="w-full min-h-[50vh] flex flex-wrap gap-x-2 gap-y-4 pb-8">
// //             {tasks.map((task) => (
// //               <li
// //                 key={task.id}
// //                 className="relative w-[200px] max-h-[220px] p-4 bg-white rounded shadow"
// //               >
// //                 <h2 className="font-bold mb-2 capitalize">{task.title}</h2>
// //                 <p className="mb-2 text-emerald-600">{task.content}</p>
// //                 <p className="mb-2 text-sm text-gray-500">
// //                   Tags: {task.tags} <br />
// //                   Categories: {task.categories}
// //                   <br />
// //                   Assigned to:{" "}
// //                   {users.find((user) => user.id === task.assigned)?.name ||
// //                     "Unassigned"}
// //                 </p>
// //                 <p className="absolute bottom-2">
// //                   <span className="flex flex-row w-[160px] justify-between items-center">
// //                     <button
// //                       onClick={() => startEditing(task)}
// //                       className={`px-3 py-1 rounded text-white ${
// //                         editingTask === task.id
// //                           ? "bg-gray-500 cursor-not-allowed"
// //                           : "bg-green-500"
// //                       }`}
// //                       disabled={editingTask === task.id}
// //                     >
// //                       {editingTask === task.id ? "Editing" : "Edit"}
// //                     </button>
// //                     <button
// //                       onClick={() => deleteTask(task.id)}
// //                       className="bg-red-500 text-white px-3 py-1 rounded"
// //                     >
// //                       Delete
// //                     </button>
// //                   </span>
// //                 </p>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </div>

// //       <div className="w-1/4 flex flex-col justify-start items-start pt-10 -ml-12">
// //         <div className="w-full space-y-4">
// //           <h2 className="font-bold">
// //             {editingTask ? "Edit Task" : "Add New Task"}
// //           </h2>
// //           <input
// //             type="text"
// //             placeholder="Title"
// //             value={newTask.title}
// //             onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
// //             className="w-full p-2 border rounded"
// //           />
// //           <textarea
// //             placeholder="Content"
// //             value={newTask.content}
// //             onChange={(e) =>
// //               setNewTask({ ...newTask, content: e.target.value })
// //             }
// //             className="w-full p-2 border rounded"
// //           />
// //           <input
// //             type="text"
// //             placeholder="Tags"
// //             value={newTask.tags}
// //             onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
// //             className="w-full p-2 border rounded"
// //           />
// //           <input
// //             type="text"
// //             placeholder="Categories"
// //             value={newTask.categories}
// //             onChange={(e) =>
// //               setNewTask({ ...newTask, categories: e.target.value })
// //             }
// //             className="w-full p-2 border rounded"
// //           />
// //           <select
// //             value={newTask.assigned}
// //             onChange={(e) =>
// //               setNewTask({ ...newTask, assigned: e.target.value })
// //             }
// //             className="w-full p-2 border rounded"
// //           >
// //             <option value="">Assign to...</option>
// //             {users.map((user) => (
// //               <option key={user.id} value={user.id}>
// //                 {user.name}
// //               </option>
// //             ))}
// //           </select>
// //           <button
// //             onClick={addOrUpdateTask}
// //             className="bg-blue-500 text-white px-4 py-2 rounded"
// //           >
// //             {editingTask ? "Save Changes" : "Add Task"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TasksTodo;

// "use client";

// import { useEffect, useState } from "react";

// interface TasksTodoProps {
//   token: string;
// }

// interface Task {
//   id: string;
//   title: string;
//   content: string;
//   tags: string;
//   categories: string;
//   assigned: string;
//   created_at: string;
// }

// interface User {
//   id: string;
//   name: string;
// }

// const TasksTodo: React.FC<TasksTodoProps> = ({ token }) => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [newTask, setNewTask] = useState({
//     title: "",
//     content: "",
//     tags: "",
//     categories: "",
//     assigned: "",
//   });
//   const [editingTask, setEditingTask] = useState<string | null>(null);
//   const [users, setUsers] = useState<User[]>([]);

//   // Fetch tasks from API
//   const fetchTasks = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch("/api/tasks", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch tasks");
//       }

//       const data = await response.json();
//       setTasks(data.message ? [] : data);
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch users for assigning tasks
//   const fetchUsers = async () => {
//     try {
//       const response = await fetch("/api/users");

//       if (!response.ok) {
//         throw new Error("Failed to fetch users");
//       }

//       const data: User[] = await response.json();
//       setUsers(
//         data.map((user) => ({ id: user.id.toString(), name: user.name }))
//       );
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Failed to fetch users");
//     }
//   };

//   // Add or update task
//   const addOrUpdateTask = async () => {
//     const method = editingTask ? "PUT" : "POST";
//     const endpoint = editingTask ? `/api/tasks/${editingTask}` : "/api/tasks";

//     try {
//       const response = await fetch(endpoint, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newTask),
//       });

//       if (!response.ok) {
//         throw new Error(
//           editingTask ? "Failed to update task" : "Failed to add task"
//         );
//       }

//       await fetchTasks(); // Refresh tasks
//       setNewTask({
//         title: "",
//         content: "",
//         tags: "",
//         categories: "",
//         assigned: "",
//       });
//       setEditingTask(null); // Reset editing state
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//     }
//   };

//   // Delete task by ID
//   const deleteTask = async (id: string) => {
//     try {
//       const response = await fetch(`/api/tasks/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete task");
//       }

//       await fetchTasks(); // Refresh tasks
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//     }
//   };

//   // Start editing a task
//   const startEditing = (task: Task) => {
//     setNewTask({
//       title: task.title,
//       content: task.content,
//       tags: task.tags,
//       categories: task.categories,
//       assigned: task.assigned,
//     });
//     setEditingTask(task.id);
//   };

//   useEffect(() => {
//     fetchTasks();
//     fetchUsers();
//   }, []);

//   return (
//     <div className="container mx-auto [min-h-50vh] bg-gray-100 flex flex-row gap-2 rounded-lg shadow-lg py-22">
//       <div className="w-3/4 p-6">
//         <h1 className="text-2xl font-bold mb-4">Tasks Todo</h1>
//         {error && <p className="text-red-500">{error}</p>}
//         {loading ? (
//           <p>Loading tasks...</p>
//         ) : (
//           <ul className="w-full min-h-[50vh] flex flex-wrap gap-x-2 gap-y-4 pb-8">
//             {tasks.map((task) => (
//               <li
//                 key={task.id}
//                 className="relative w-[200px] max-h-[220px] p-4 bg-white rounded shadow"
//               >
//                 <h2 className="font-bold mb-2 capitalize">{task.title}</h2>
//                 <p className="mb-2 text-emerald-600">{task.content}</p>
//                 <p className="mb-2 text-sm text-gray-500">
//                   Tags: {task.tags} <br />
//                   Categories: {task.categories}
//                   <br />
//                   Assigned to:{" "}
//                   {users.find((user) => user.id === task.assigned)?.name ||
//                     "Unassigned"}
//                 </p>
//                 <p className="absolute bottom-2">
//                   <span className="flex flex-row w-[160px] justify-between items-center">
//                     <button
//                       onClick={() => startEditing(task)}
//                       className={`px-3 py-1 rounded text-white ${
//                         editingTask === task.id
//                           ? "bg-gray-500 cursor-not-allowed"
//                           : "bg-green-500"
//                       }`}
//                       disabled={editingTask === task.id}
//                     >
//                       {editingTask === task.id ? "Editing" : "Edit"}
//                     </button>
//                     <button
//                       onClick={() => deleteTask(task.id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </span>
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div className="w-1/4 flex flex-col justify-start items-start pt-10 -ml-12">
//         <div className="w-full space-y-4">
//           <h2 className="font-bold">
//             {editingTask ? "Edit Task" : "Add New Task"}
//           </h2>
//           <input
//             type="text"
//             placeholder="Title"
//             value={newTask.title}
//             onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//             className="w-full p-2 border rounded"
//           />
//           <textarea
//             placeholder="Content"
//             value={newTask.content}
//             onChange={(e) =>
//               setNewTask({ ...newTask, content: e.target.value })
//             }
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Tags"
//             value={newTask.tags}
//             onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Categories"
//             value={newTask.categories}
//             onChange={(e) =>
//               setNewTask({ ...newTask, categories: e.target.value })
//             }
//             className="w-full p-2 border rounded"
//           />
//           <select
//             value={newTask.assigned}
//             onChange={(e) =>
//               setNewTask({ ...newTask, assigned: e.target.value })
//             }
//             className="w-full p-2 border rounded"
//           >
//             <option value="">Assign to...</option>
//             {users.map((user) => (
//               <option key={user.id} value={user.id}>
//                 {user.name}
//               </option>
//             ))}
//           </select>
//           <button
//             onClick={addOrUpdateTask}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             {editingTask ? "Save Changes" : "Add Task"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TasksTodo;

"use client";

import { useEffect, useState } from "react";

interface TasksTodoProps {
  token: string;
}

interface Task {
  id: string;
  title: string;
  content: string;
  tags: string;
  categories: string;
  assigned: string;
  created_at: string;
}

interface User {
  id: string;
  name: string;
}

const TasksTodo: React.FC<TasksTodoProps> = ({ token }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [newTask, setNewTask] = useState({
    title: "",
    content: "",
    tags: "",
    categories: "",
    assigned: "",
  });
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Fetch tasks from API
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(data.message ? [] : data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Fetch users for assigning tasks
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data: User[] = await response.json();
      setUsers(
        data.map((user) => ({ id: user.id.toString(), name: user.name }))
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    }
  };

  // Add or update task
  const addOrUpdateTask = async () => {
    setUpdating(true);
    setError(null);
    setSuccess(null);

    const method = editingTask ? "PUT" : "POST";
    const endpoint = editingTask ? `/api/tasks/${editingTask}` : "/api/tasks";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(
          editingTask ? "Failed to update task" : "Failed to add task"
        );
      }

      await fetchTasks(); // Refresh tasks
      setNewTask({
        title: "",
        content: "",
        tags: "",
        categories: "",
        assigned: "",
      });
      setEditingTask(null); // Reset editing state
      setSuccess(
        editingTask ? "Task updated successfully!" : "Task added successfully!"
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  // Delete task by ID
  const deleteTask = async (id: string) => {
    setUpdating(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      await fetchTasks(); // Refresh tasks
      setSuccess("Task deleted successfully!");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  // Start editing a task
  const startEditing = (task: Task) => {
    setNewTask({
      title: task.title,
      content: task.content,
      tags: task.tags,
      categories: task.categories,
      assigned: task.assigned,
    });
    setEditingTask(task.id);
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto bg-gray-100 flex flex-col gap-2 rounded-lg shadow-lg lg:flex-row lg:py-22">
      <div className="w-full lg:w-3/4 lg:pt-6">
        <div className="w-full flex flex-col lg:flex-row lg:w-3/4">
          <h1 className="w-full text-2xl font-bold lg:w-1/4 lg:mb-2">
            Tasks Todo
          </h1>
          {error && (
            <p className="w-full text-red-700 lg:mb-4 lg:w-1/4">{error}</p>
          )}
          {success && (
            <p className="w-full text-green-700 lg:w-2/4 lg:mb-4">{success}</p>
          )}
        </div>
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <ul className="w-full flex flex-wrap gap-x-2 gap-y-4 pb-8">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="relative flex flex-col gap-2 w-[200px] min-h-[20vh] max-h-[25vh] p-4 bg-white rounded shadow"
              >
                <h2 className="font-bold mb-2 capitalize">{task.title}</h2>
                <p className="mb-2 text-emerald-600">{task.content}</p>
                <p className="mb-2 text-sm text-gray-500">
                  Tags: {task.tags} <br />
                  Categories: {task.categories}
                  <br />
                  Assigned to:{" "}
                  {users.find((user) => user.id === task.assigned)?.name ||
                    "Unassigned"}
                </p>
                <p className="absolute bottom-2">
                  <span className="flex flex-row w-[160px] justify-between items-center">
                    <button
                      onClick={() => startEditing(task)}
                      className={`px-3 py-1 rounded text-white ${
                        editingTask === task.id
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-green-500"
                      }`}
                      disabled={editingTask === task.id || updating}
                    >
                      {editingTask === task.id ? "Editing" : "Edit"}
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      disabled={updating}
                    >
                      Delete
                    </button>
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-full flex flex-col justify-start items-start lg:w-1/4 lg:pt-10 lg:pb-20 lg:-ml-12">
        <div className="w-full space-y-4">
          <h2 className="font-bold">
            {editingTask ? "Edit Task" : "Add New Task"}
          </h2>
          <input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Content"
            value={newTask.content}
            onChange={(e) =>
              setNewTask({ ...newTask, content: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Tags"
            value={newTask.tags}
            onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Categories"
            value={newTask.categories}
            onChange={(e) =>
              setNewTask({ ...newTask, categories: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <select
            value={newTask.assigned}
            onChange={(e) =>
              setNewTask({ ...newTask, assigned: e.target.value })
            }
            className="w-full p-2 border rounded"
          >
            <option value="">Assign to...</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            onClick={addOrUpdateTask}
            className={`px-4 py-2 rounded text-white ${
              editingTask ? "bg-yellow-500" : "bg-blue-500"
            }`}
            disabled={updating}
          >
            {editingTask ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksTodo;
