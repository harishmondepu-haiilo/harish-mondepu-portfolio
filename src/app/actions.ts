"use server";

import { supabaseAdmin } from "@/lib/supabase";

export async function submitContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const budget = formData.get("budget") as string;
  const projectType = formData.get("projectType") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  try {
    // 1. Save to Supabase
    const { error: dbError } = await supabaseAdmin()
      .from("contact_messages")
      .insert({ name, email, company, budget, project_type: projectType, message });

    if (dbError) console.error("Supabase insert error:", dbError);

    // 2. Also send email via Web3Forms
    const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";
    if (WEB3FORMS_KEY) {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio Contact: ${projectType || "General"} from ${name}`,
          from_name: name,
          replyto: email,
          name, email, company, budget,
          project_type: projectType,
          message,
        }),
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
