// import { NextResponse } from "next/server";

// const BASE_URL = "https://api.blooming-brands.com/wp-json/tasks-todo/v2";

// // Helper function for headers
// const getHeaders = (token: string) => ({
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${token}`,
// });

// // **1. GET Task by ID**
// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const token = req.headers.get("Authorization")?.split(" ")[1];
//   const { id } = params;

//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const response = await fetch(`${BASE_URL}/task/${id}`, {
//       method: "GET",
//       headers: getHeaders(token),
//     });

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: "Failed to fetch task" },
//         { status: response.status }
//       );
//     }

//     const task = await response.json();
//     return NextResponse.json(task);
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: error instanceof Error ? error.message : "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }

// // **2. PUT to Update Task by ID**
// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const token = req.headers.get("Authorization")?.split(" ")[1];
//   const { id } = params;

//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const updates = await req.json();

//     const response = await fetch(`${BASE_URL}/task/${id}`, {
//       method: "PUT",
//       headers: getHeaders(token),
//       body: JSON.stringify(updates),
//     });

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: "Failed to update task" },
//         { status: response.status }
//       );
//     }

//     const updatedTask = await response.json();
//     return NextResponse.json(updatedTask);
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: error instanceof Error ? error.message : "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }

// // **3. DELETE Task by ID**
// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const token = req.headers.get("Authorization")?.split(" ")[1];
//   const { id } = params;

//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
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

// **1. GET a task by ID**
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const { id } = params;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(`${BASE_URL}/task/${id}`, {
      method: "GET",
      headers: getHeaders(token),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch task" },
        { status: response.status }
      );
    }

    const task = await response.json();
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}

// **2. PUT to update a task by ID**
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const { id } = params;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updates = await req.json();

    const response = await fetch(`${BASE_URL}/task/${id}`, {
      method: "PUT",
      headers: getHeaders(token),
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to update task" },
        { status: response.status }
      );
    }

    const updatedTask = await response.json();
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}

// **3. DELETE a task by ID**
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const { id } = params;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(`${BASE_URL}/task/${id}`, {
      method: "DELETE",
      headers: getHeaders(token),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to delete task" },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
