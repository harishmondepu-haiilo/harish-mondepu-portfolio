import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getContent } from "@/lib/content";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = getContent();
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read content" },
      { status: 500 }
    );
  }
}
