// app/api/todos/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://api.blooming-brands.com/wp-json/wp/v2/todo";

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const response = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const { id, updates } = await req.json();
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 400 }
    );
  }

  const updatedTodo = await response.json();
  return NextResponse.json(updatedTodo);
}
