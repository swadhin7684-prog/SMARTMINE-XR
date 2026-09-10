import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { getAdminAuth, getFirestoreDb } from '../config/firebase.js';

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
      return;
    }

    const adminAuth = getAdminAuth();
    const db = getFirestoreDb();
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists in Firebase Auth or Firestore
    try {
      const existing = await adminAuth.getUserByEmail(normalizedEmail);
      if (existing) {
        res.status(409).json({ success: false, message: 'A worker profile with this email already exists in Firebase.' });
        return;
      }
    } catch (err: any) {
      // auth/user-not-found is expected if user doesn't exist
      if (err.code !== 'auth/user-not-found') {
        console.warn('Firebase check user error:', err.code);
      }
    }

    // Hash password for backend verification fallback
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 1. Create user in Firebase Authentication
    let firebaseUser;
    try {
      firebaseUser = await adminAuth.createUser({
        email: normalizedEmail,
        password,
        displayName: name,
      });
    } catch (authErr: any) {
      console.error('Firebase Auth createUser error:', authErr);
      res.status(400).json({ success: false, message: authErr.message || 'Failed to create user in Firebase Auth.' });
      return;
    }

    const uid = firebaseUser.uid;
    const now = new Date();
    const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const userData = {
      id: uid,
      uid,
      name,
      email: normalizedEmail,
      passwordHash,
      role: 'worker',
      trainingProgress: 0,
      completedSessions: 0,
      averageScore: 0,
      certificateCount: 0,
      subscription: {
        plan: 'free',
        status: 'active',
        startDate: now.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      },
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    // 2. Save user profile document to Cloud Firestore
    await db.collection('users').doc(uid).set(userData);

    // 3. Mint Firebase custom token
    const token = await adminAuth.createCustomToken(uid, { role: 'worker' });

    // Clean passwordHash before sending to client
    const { passwordHash: _, ...safeUser } = userData;

    res.status(201).json({
      success: true,
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required.' });
      return;
    }

    const adminAuth = getAdminAuth();
    const db = getFirestoreDb();
    const normalizedEmail = email.toLowerCase().trim();

    // Query user profile in Firestore
    const usersSnap = await db.collection('users').where('email', '==', normalizedEmail).limit(1).get();

    if (usersSnap.empty) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const userDoc = usersSnap.docs[0];
    const userData = userDoc.data();

    // Verify password with bcrypt
    if (userData.passwordHash) {
      const isMatch = await bcrypt.compare(password, userData.passwordHash);
      if (!isMatch) {
        res.status(401).json({ success: false, message: 'Invalid email or password.' });
        return;
      }
    }

    const uid = userData.uid || userDoc.id;

    // Mint Firebase custom token
    const token = await adminAuth.createCustomToken(uid, { role: userData.role || 'worker' });

    const { passwordHash: _, ...safeUser } = userData;

    res.json({
      success: true,
      token,
      user: {
        id: uid,
        ...safeUser,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
}
