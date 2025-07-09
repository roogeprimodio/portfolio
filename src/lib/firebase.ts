import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// --- CLIENT & SERVER DIAGNOSTICS ---
// This will help us confirm the environment variables are loaded correctly.

// 1. Client-side check: This will show an alert in the browser if the key is missing.
if (typeof window !== 'undefined' && !firebaseConfig.apiKey) {
  alert('CRITICAL ERROR: The Firebase API Key is not available in the browser. Please check your .env file, ensure the variable is prefixed with NEXT_PUBLIC_, and restart the development server.');
}

// 2. Server-side check: This logs the key status to the terminal when the server starts.
if (typeof window === 'undefined') {
    console.log("--- Firebase Server-Side Initialization ---");
    if (!firebaseConfig.apiKey) {
        console.error("ERROR: Firebase API Key is NOT found in server environment variables.");
    } else {
        console.log("SUCCESS: Firebase API Key was found in server environment variables.");
    }
}
// --- END DIAGNOSTICS ---


// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);

export { app, auth };
