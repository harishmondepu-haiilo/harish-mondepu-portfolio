import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getSectionFresh, updateSection, isValidSection } from "@/lib/content";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { section } = await params;

  if (!isValidSection(section)) {
    return NextResponse.json(
      { error: `Invalid section: ${section}. Valid sections: personal, experiences, certs, skills, projects, testimonials, education, achievements` },
      { status: 400 }
    );
  }

  try {
    const data = await getSectionFresh(section);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read section" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { section } = await params;

  if (!isValidSection(section)) {
    return NextResponse.json(
      { error: `Invalid section: ${section}` },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const updated = await updateSection(section, body);
    return NextResponse.json({ success: true, data: updated[section] });
  } catch (error) {
    console.error("[CMS] Update error:", error);
    return NextResponse.json(
      { error: "Failed to update section" },
      { status: 500 }
    );
  }
}
