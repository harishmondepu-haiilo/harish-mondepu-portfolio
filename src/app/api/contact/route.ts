import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let dbSaved = false;
    let emailSent = false;
    const errors: string[] = [];

    // 1. Save to Supabase (non-blocking — don't fail if DB is down)
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const url = process.env.SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (url && key) {
        const supabase = createClient(url, key);
        const { error: dbError } = await supabase
          .from("contact_messages")
          .insert({
            name,
            email,
            company: body.company || null,
            budget: body.budget || null,
            project_type: body.projectType || null,
            message,
          });
        if (dbError) errors.push("DB: " + dbError.message);
        else dbSaved = true;
      } else {
        errors.push("DB: missing env vars");
      }
    } catch (e: any) {
      errors.push("DB exception: " + e?.message);
    }

    // 2. Send email via Web3Forms (non-blocking)
    try {
      const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
      if (key) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: key.trim(),
            subject: `Portfolio Contact from ${name}`,
            from_name: name,
            replyto: email,
            name, email, message,
            company: body.company || "",
            project_type: body.projectType || "",
          }),
        });
        const result = await res.json();
        if (result.success) emailSent = true;
        else errors.push("Email: " + JSON.stringify(result));
      } else {
        errors.push("Email: missing WEB3FORMS key");
      }
    } catch (e: any) {
      errors.push("Email exception: " + e?.message);
    }

    console.log("[contact] dbSaved:", dbSaved, "emailSent:", emailSent, "errors:", errors);

    // Return success if at least one channel worked
    if (dbSaved || emailSent) {
      return NextResponse.json({ success: true, dbSaved, emailSent });
    }

    return NextResponse.json({ error: "All channels failed", details: errors }, { status: 500 });
  } catch (e: any) {
    console.error("[contact] Fatal:", e);
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
