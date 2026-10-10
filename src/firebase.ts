import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// RavanaForge Firebase Production Configuration
export const firebaseConfig = {
  apiKey: "AIzaSyD-OI2bqwSkxgs2hO6QXTooTRhno5Sd5MU",
  authDomain: "ravanaforge.firebaseapp.com",
  projectId: "ravanaforge",
  storageBucket: "ravanaforge.firebasestorage.app",
  messagingSenderId: "384849923594",
  appId: "1:384849923594:web:0b9c0c0fa02d116ce699f3",
  measurementId: "G-L51SWRRBVB"
};

// Initialize Firebase safely (avoid multiple initializations in dev/HMR)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Analytics conditionally (only supported in browser environments)
export const initAnalytics = async () => {
  if (typeof window !== "undefined" && (await isSupported())) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
