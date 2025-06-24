"use server";

export async function sendContactMessageAction(data: {name: string; email: string; message: string;}) {
  console.log("Simulating sending message:", data);
  // Simulate network delay
  await new Promise(res => setTimeout(res, 1000));
  // In a real app, you would integrate with an email service like SendGrid, Resend, etc.
  return { success: true, message: "Your message has been sent successfully!" };
}
