
'use server';

import { revalidatePath } from 'next/cache';
import { portfolioData as staticData } from './portfolio-data';

// --- FETCH ACTIONS ---
// In a real app, these would fetch data from Firestore

export async function getPersonalInfo() {
    console.log("Fetching personal info...");
    // To-do: Replace with Firestore fetch
    return staticData.personalInfo;
}

export async function getSocialLinks() {
    console.log("Fetching social links...");
    // To-do: Replace with Firestore fetch
    return staticData.socialLinks;
}

export async function getAboutData() {
    console.log("Fetching about data...");
    // To-do: Replace with Firestore fetch
    return staticData.about;
}

export async function getProjects() {
    console.log("Fetching projects...");
    // To-do: Replace with Firestore fetch
    return staticData.projects;
}

export async function getSkills() {
    console.log("Fetching skills...");
    // To-do: Replace with Firestore fetch
    return staticData.skills;
}

// --- UPDATE ACTIONS ---
// These actions will update the data in Firestore

export async function updatePersonalInfo(data: any) {
    console.log("Updating personal info:", data);
    // To-do: Add Firestore update logic here
    revalidatePath('/admin/dashboard/personal');
    return { success: true, message: "Personal info updated successfully!" };
}

export async function updateSocialLinks(data: any) {
    console.log("Updating social links:", data);
    // To-do: Add Firestore update logic here
    revalidatePath('/admin/dashboard/personal');
    return { success: true, message: "Social links updated successfully!" };
}

export async function updateAboutData(data: any) {
    console.log("Updating about data:", data);
    // To-do: Add Firestore update logic here
    revalidatePath('/admin/dashboard/about');
    return { success: true, message: "About page content updated successfully!" };
}

export async function updateProjects(data: any) {
    console.log("Updating projects:", data);
    // To-do: Add Firestore update logic here
    revalidatePath('/admin/dashboard/projects');
    return { success: true, message: "Projects updated successfully!" };
}

export async function updateSkills(data: any) {
    console.log("Updating skills:", data);
    // To-do: Add Firestore update logic here
    revalidatePath('/admin/dashboard/skills');
    return { success: true, message: "Skills updated successfully!" };
}

