"use server";

import { Resend } from "resend";

export async function sendContactMessageAction(data: {name: string; email: string; message: string;}) {
  const { name, email, message } = data;
  
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.EMAIL_TO;

  if (!resendApiKey || !emailTo || resendApiKey === "YOUR_RESEND_API_KEY") {
    console.error("Missing or default environment variables for Resend");
    return { success: false, message: "Server error: Email configuration is missing." };
  }

  const resend = new Resend(resendApiKey);

  try {
    const { data: responseData, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: emailTo,
      subject: `New Portfolio Message from ${name}`,
      reply_to: email,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, message: "Transmission corrupted. Please try again." };
    }

    return { success: true, message: "Your message has been sent successfully!" };
  } catch (error) {
    console.error("Error sending message:", error);
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}
