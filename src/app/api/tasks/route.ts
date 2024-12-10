// import { NextResponse } from "next/server";

// const BASE_URL = "https://api.blooming-brands.com/wp-json/tasks-todo/v2";

// // Helper function for headers
// const getHeaders = (token: string) => ({
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${token}`,
// });

// // **1. GET all tasks**
// export async function GET(req: Request) {
//   const token = req.headers.get("Authorization")?.split(" ")[1]; // Extract token
//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const response = await fetch(`${BASE_URL}/tasks`, {
//       method: "GET",
//       headers: getHeaders(token),
//     });

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: "Failed to fetch tasks" },
//         { status: response.status }
//       );
//     }

//     const tasks = await response.json();
//     return NextResponse.json(
//       tasks.length ? tasks : { message: "No tasks found" }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: error instanceof Error ? error.message : "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }

// // **2. POST to add a new task**
// export async function POST(req: Request) {
//   const token = req.headers.get("Authorization")?.split(" ")[1]; // Extract token
//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const body = await req.json();
//     const { title, content, tags, categories, assigned } = body;

//     // Validation for required fields
//     if (!title || !content) {
//       return NextResponse.json(
//         { error: "Title and Content are required" },
//         { status: 400 }
//       );
//     }

//     const response = await fetch(`${BASE_URL}/task`, {
//       method: "POST",
//       headers: getHeaders(token),
//       body: JSON.stringify({ title, content, tags, categories, assigned }),
//     });

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: "Failed to add task" },
//         { status: response.status }
//       );
//     }

//     return NextResponse.json(await response.json(), { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: error instanceof Error ? error.message : "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }

// // **PUT to update a task by ID**
// export async function PUT(req: Request) {
//   try {
//     // Extract and validate the token
//     const token = req.headers.get("Authorization")?.split(" ")[1];
//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Parse request body
//     const { id, ...updates } = await req.json();

//     // Validate ID and updates
//     if (!id) {
//       return NextResponse.json(
//         { error: "Task ID is required" },
//         { status: 400 }
//       );
//     }
//     if (Object.keys(updates).length === 0) {
//       return NextResponse.json(
//         { error: "No updates provided" },
//         { status: 400 }
//       );
//     }

//     // Debugging logs
//     console.log("Received token:", token);
//     console.log("Updating task ID:", id);
//     console.log("Updates:", updates);

//     // Send PUT request to the API
//     const response = await fetch(`${BASE_URL}/task/${id}`, {
//       method: "PUT",
//       headers: getHeaders(token),
//       body: JSON.stringify(updates),
//     });

//     // Check API response
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Failed to update task:", errorText);
//       return NextResponse.json(
//         { error: "Failed to update task", details: errorText },
//         { status: response.status }
//       );
//     }

//     // Return successful response
//     const updatedTask = await response.json();
//     console.log("Task updated successfully:", updatedTask);
//     return NextResponse.json(updatedTask);
//   } catch (error) {
//     console.error("Error in PUT handler:", error);
//     return NextResponse.json(
//       {
//         error: error instanceof Error ? error.message : "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }

// // **4. DELETE a task by ID**
// export async function DELETE(req: Request) {
//   const token = req.headers.get("Authorization")?.split(" ")[1]; // Extract token
//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const { id } = await req.json();

//     if (!id) {
//       return NextResponse.json(
//         { error: "Task ID is required" },
//         { status: 400 }
//       );
//     }

//     const response = await fetch(`${BASE_URL}/task/${id}`, {
//       method: "DELETE",
//       headers: getHeaders(token),
//     });

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: "Failed to delete task" },
//         { status: response.status }
//       );
//     }

//     return NextResponse.json({ message: "Task deleted successfully" });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: error instanceof Error ? error.message : "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

const BASE_URL = "https://api.blooming-brands.com/wp-json/tasks-todo/v2";

// Helper function for headers
const getHeaders = (token: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

// **1. GET all tasks**
export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "GET",
      headers: getHeaders(token),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch tasks" },
        { status: response.status }
      );
    }

    const tasks = await response.json();
    return NextResponse.json(
      tasks.length ? tasks : { message: "No tasks found" }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}

// **2. POST to add a new task**
export async function POST(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, content, tags, categories, assigned } = body;

    // Validation for required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and Content are required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${BASE_URL}/task`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify({ title, content, tags, categories, assigned }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to add task" },
        { status: response.status }
      );
    }

    return NextResponse.json(await response.json(), { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
