"use server";

import { refineSelfSummary, RefineSelfSummaryInput } from "@/ai/flows/refine-self-summary";

export async function refineSummaryAction(currentSummary: string, projectDescriptions: string): Promise<string> {
  if (!currentSummary || !projectDescriptions) {
    return "Please fill in all fields.";
  }

  const projectDescriptionsArray = projectDescriptions
    .split('\n')
    .map(desc => desc.trim())
    .filter(desc => desc.length > 0);
  
  if (projectDescriptionsArray.length === 0) {
    return "Please provide at least one project description.";
  }

  try {
    const input: RefineSelfSummaryInput = {
      selfSummary: currentSummary,
      projectDescriptions: projectDescriptionsArray,
    };
    const result = await refineSelfSummary(input);
    return result.refinedSummary;
  } catch (error) {
    console.error("AI Error:", error);
    return "Failed to refine summary due to an unexpected error.";
  }
}


export async function sendContactMessageAction(data: {name: string; email: string; message: string;}) {
  console.log("Simulating sending message:", data);
  // Simulate network delay
  await new Promise(res => setTimeout(res, 1000));
  // In a real app, you would integrate with an email service like SendGrid, Resend, etc.
  return { success: true, message: "Your message has been sent successfully!" };
}
