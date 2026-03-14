"use server";

export async function submitContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const projectType = formData.get("projectType") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  try {
    // Web3Forms — free email delivery (250 emails/month free tier)
    // Get your access key at https://web3forms.com (takes 10 seconds)
    const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY || "";

    if (!WEB3FORMS_KEY) {
      // Fallback: log to console if no key configured yet
      console.log("📬 New Contact Form Submission:");
      console.log(`   Name: ${name}`);
      console.log(`   Email: ${email}`);
      console.log(`   Project: ${projectType}`);
      console.log(`   Message: ${message}`);
      console.log("   ⚠️  Set WEB3FORMS_ACCESS_KEY in .env.local to receive email notifications!");
      return { success: true };
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `🚀 Portfolio Contact: ${projectType} — from ${name}`,
        from_name: name,
        replyto: email,
        name,
        email,
        project_type: projectType,
        message,
      }),
    });

    const result = await response.json();

    if (result.success) {
      return { success: true };
    } else {
      console.error("Web3Forms error:", result);
      return { success: false, error: "Failed to send message." };
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
