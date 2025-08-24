// Firebase Configuration
// This file should contain your Firebase configuration
// For production, these values should come from environment variables

const firebaseConfig = {
    // These are placeholder values - replace with your actual Firebase config
    // Consider using environment variables for production
    apiKey: process.env.FIREBASE_API_KEY || "your-api-key-here",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
    databaseURL: process.env.FIREBASE_DATABASE_URL || "https://your-project-default-rtdb.firebaseio.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "your-project-id",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "your-project.firebasestorage.app",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "your-sender-id",
    appId: process.env.FIREBASE_APP_ID || "your-app-id",
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || "your-measurement-id"
};

export default firebaseConfig;
