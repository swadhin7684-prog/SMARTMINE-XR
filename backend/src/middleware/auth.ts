import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getAdminAuth, getFirestoreDb } from '../config/firebase.js';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export async function authenticateToken(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'Access token is required.' });
    return;
  }

  // 1. First attempt: Verify as Firebase ID Token
  try {
    const adminAuth = getAdminAuth();
    const decoded = await adminAuth.verifyIdToken(token);
    
    // Look up role from Firestore user doc if present
    let role = (decoded.role as string) || 'worker';
    try {
      const userDoc = await getFirestoreDb().collection('users').doc(decoded.uid).get();
      if (userDoc.exists) {
        role = userDoc.data()?.role || role;
      }
    } catch {
      // Use decoded token role fallback
    }

    req.user = {
      id: decoded.uid,
      email: decoded.email || '',
      role,
    };
    next();
    return;
  } catch (firebaseErr) {
    // 2. Second attempt: Check if legacy JWT token
    const secret = process.env.JWT_SECRET;
    if (secret) {
      try {
        const decoded = jwt.verify(token, secret) as { id: string; email: string; role: string };
        req.user = decoded;
        next();
        return;
      } catch {
        // Fall through to 401
      }
    }

    res.status(401).json({ success: false, message: 'Invalid or expired authentication token.' });
  }
}
