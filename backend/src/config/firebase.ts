import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let app: App | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

export function initializeFirebaseAdmin(): { db: Firestore; auth: Auth } {
  if (!app && getApps().length === 0) {
    try {
      const keyPath = path.resolve(__dirname, '../../serviceAccountKey.json');
      if (fs.existsSync(keyPath)) {
        const fileContent = fs.readFileSync(keyPath, 'utf8');
        const serviceAccount = JSON.parse(fileContent);
        app = initializeApp({
          credential: cert(serviceAccount),
          projectId: serviceAccount.project_id || 'smartminexr',
        });
        console.log(`🔥 Firebase Admin initialized with service account (project: ${serviceAccount.project_id})`);
      } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        app = initializeApp({
          credential: cert(serviceAccount),
          projectId: serviceAccount.project_id || 'smartminexr',
        });
        console.log(`🔥 Firebase Admin initialized with FIREBASE_SERVICE_ACCOUNT env`);
      } else {
        app = initializeApp({
          projectId: process.env.FIREBASE_PROJECT_ID || 'smartminexr',
        });
        console.log(`🔥 Firebase Admin initialized with default project id`);
      }
    } catch (error) {
      console.error('❌ Failed to initialize Firebase Admin:', error);
      throw error;
    }
  } else if (!app) {
    app = getApps()[0];
  }

  if (!db) {
    db = getFirestore(app);
  }
  if (!auth) {
    auth = getAuth(app);
  }

  return { db, auth };
}

export const getFirestoreDb = (): Firestore => initializeFirebaseAdmin().db;
export const getAdminAuth = (): Auth => initializeFirebaseAdmin().auth;
export type { Firestore, Auth };
