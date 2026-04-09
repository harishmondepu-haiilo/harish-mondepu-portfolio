import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Save to Supabase
    const { error: dbError } = await supabaseAdmin()
      .from("contact_messages")
      .insert({
        name,
        email,
        company: body.company || null,
        budget: body.budget || null,
        project_type: body.projectType || null,
        message,
      });

    if (dbError) console.error("Supabase error:", dbError);

    // 2. Send email via Web3Forms
    const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (WEB3FORMS_KEY) {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio Contact from ${name}`,
          from_name: name,
          replyto: email,
          name, email, message,
          company: body.company,
          project_type: body.projectType,
        }),
      });
      const result = await res.json();
      if (!result.success) console.error("Web3Forms error:", result);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
