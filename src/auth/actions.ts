
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { createSession, deleteSession } from '@/auth/session';

export async function loginWithEmail(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, message: 'Email and password are required.' };
  }

  try {
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await createSession(user.uid);
    
    revalidatePath('/admin/dashboard');
    redirect('/admin/dashboard');

  } catch (error: any) {
    console.error('Firebase Authentication Error:', error);
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        return { success: false, message: 'Invalid credentials. Please try again.' };
    }
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  }
}

export async function logout() {
    await deleteSession();
    redirect('/admin/login');
}
