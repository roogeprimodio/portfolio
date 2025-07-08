
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createSession, deleteSession } from '@/auth/session';

// The function signature MUST accept prevState as the first argument when used with useActionState
export async function loginWithEmail(prevState: unknown, formData: FormData) {
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    console.error("SESSION_SECRET environment variable is not set.");
    return { success: false, message: "Application is not configured correctly. Server error." };
  }
  
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, message: 'Email and password are required.' };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await createSession(user.uid);

  } catch (error: any) {
    console.error('Firebase Authentication Error:', error);
    if (error.code === 'auth/api-key-not-valid') {
        return { success: false, message: 'Configuration Error: The Firebase API Key is not valid. Please check your .env file and ensure the key has no restrictions in Google Cloud Console.' };
    }
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        return { success: false, message: 'Invalid credentials. Please try again.' };
    }
    const errorMessage = error.message || 'An unexpected error occurred during login. Please try again.';
    return { success: false, message: `Login Failed: ${errorMessage}` };
  }
  
  // This part is only reached on successful login
  revalidatePath('/admin/dashboard');
  redirect('/admin/dashboard');
}

export async function loginWithGoogle(uid: string) {
    const sessionSecret = process.env.SESSION_SECRET;
    if (!sessionSecret) {
        console.error("SESSION_SECRET environment variable is not set.");
        return { success: false, message: "Application is not configured correctly. Server error." };
    }

    if (!uid) {
        return { success: false, message: 'Google authentication failed: No UID provided.' };
    }
    try {
        await createSession(uid);
    } catch (error) {
        console.error('Session Creation Error:', error);
        return { success: false, message: 'An unexpected error occurred during session creation.' };
    }

    revalidatePath('/admin/dashboard');
    redirect('/admin/dashboard');
}


export async function logout() {
    await deleteSession();
    redirect('/admin/login');
}
