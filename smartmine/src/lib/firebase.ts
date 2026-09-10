import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCGXWzBK-io7q4GpgqYs0AOpVt6RB_QC6s',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'smartminexr.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'smartminexr',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'smartminexr.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '437318391185',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:437318391185:web:658becbf4a13b67e6a3630',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-DTZPYYGDBP',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
