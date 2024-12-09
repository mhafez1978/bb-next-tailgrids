// import React, { useState, useEffect } from "react";

// function TodoApp() {
//   const [todos, setTodos] = useState<string[]>([]);

//   // Load todos from local storage on component mount
//   useEffect(() => {
//     try {
//       const storedTodos = localStorage.getItem("todos");
//       console.log("Loaded todos from localStorage:", storedTodos);
//       if (storedTodos) {
//         setTodos(JSON.parse(storedTodos));
//       }
//     } catch (error) {
//       console.error("Failed to load todos from localStorage:", error);
//     }
//   }, []);

//   // Save todos to local storage whenever they change
//   useEffect(() => {
//     try {
//       console.log("Saving todos to localStorage:", todos);
//       localStorage.setItem("todos", JSON.stringify(todos));
//     } catch (error) {
//       console.error("Failed to save todos to localStorage:", error);
//     }
//   }, [todos]);

//   const addTodo = (newTodo: string) => {
//     if (!newTodo.trim()) return; // Prevent empty todos
//     setTodos([...todos, newTodo]);
//   };

//   const deleteTodo = (index: number) => {
//     const newTodos = [...todos];
//     newTodos.splice(index, 1);
//     setTodos(newTodos);
//   };

//   return (
//     <div>
//       <h1>Todo App</h1>
//       <input
//         type="text"
//         placeholder="Add todo"
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//             addTodo(e.target.value);
//             e.target.value = "";
//           }
//         }}
//       />
//       <ul>
//         {todos.map((todo, index) => (
//           <li key={index}>
//             {todo}
//             <button onClick={() => deleteTodo(index)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TodoApp;

import React, { useState, useEffect } from "react";

function TodoApp() {
  const [todos, setTodos] = useState<string[]>(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      console.log("Saving todos to localStorage:", todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos to localStorage:", error);
    }
  }, [todos]);

  const addTodo = (newTodo: string) => {
    if (!newTodo.trim()) return; // Prevent empty todos
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        placeholder="Add todo"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo((e.target as HTMLInputElement).value);
            (e.target as HTMLInputElement).value = "";
          }
        }}
      />
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
