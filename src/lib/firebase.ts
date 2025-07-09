import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// This check runs only on the client-side.
// It ensures that the environment variables are properly exposed and loaded.
if (typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  throw new Error("FIREBASE CLIENT ERROR: Environment variables not loaded. Make sure you have a .env file with NEXT_PUBLIC_ prefixed variables and have restarted the development server.");
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  if (!firebaseConfig.apiKey) {
      // This will log on the server if the key is missing.
      console.error("FIREBASE SERVER ERROR: Firebase API Key is missing. Check your environment variables.");
  }
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);

export { app, auth };
