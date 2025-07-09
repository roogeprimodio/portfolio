import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDV3FND7OcdVdSI9_eYeLBqEITbhAGLFZk",
  authDomain: "jagdishodedara-35423.firebaseapp.com",
  projectId: "jagdishodedara-35423",
  storageBucket: "jagdishodedara-35423.appspot.com",
  messagingSenderId: "558612594123",
  appId: "1:558612594123:web:524434efb500231657ca4e",
  measurementId: "G-NNSCSVMCJR"
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);

export { app, auth };
