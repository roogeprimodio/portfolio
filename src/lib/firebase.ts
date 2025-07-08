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

// --- DIAGNOSTIC LOG ---
// This will print the API key to your server terminal when the app starts.
// Check if this key matches the one in your Firebase console.
if (typeof window === 'undefined') { // Only log on the server
    console.log("--- Firebase Auth Initializing ---");
    console.log("Using API Key:", firebaseConfig.apiKey ? `"${firebaseConfig.apiKey.substring(0, 4)}...${firebaseConfig.apiKey.slice(-4)}"` : "Not found");
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY_HERE") {
        console.error("ERROR: NEXT_PUBLIC_FIREBASE_API_KEY is missing or is a default value in your .env file!");
    }
}
// --- END DIAGNOSTIC LOG ---


// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);

export { app, auth };
