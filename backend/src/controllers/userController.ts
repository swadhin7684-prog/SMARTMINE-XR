import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import { getFirestoreDb } from '../config/firebase.js';

export async function getProfile(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user?.id) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const db = getFirestoreDb();
    const doc = await db.collection('users').doc(req.user.id).get();

    if (!doc.exists) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    const data = doc.data()!;
    const { passwordHash: _, ...safeUser } = data;

    res.json({
      success: true,
      user: {
        id: doc.id,
        ...safeUser,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve profile' });
  }
}

export async function updateProfile(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user?.id) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const { name, email, avatar } = req.body;
    const updates: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };
    if (name) updates.name = name;
    if (email) updates.email = email.toLowerCase();
    if (avatar) updates.avatar = avatar;

    const db = getFirestoreDb();
    const userRef = db.collection('users').doc(req.user.id);
    await userRef.set(updates, { merge: true });

    const updatedDoc = await userRef.get();
    const data = updatedDoc.data() || {};
    const { passwordHash: _, ...safeUser } = data;

    res.json({
      success: true,
      user: {
        id: updatedDoc.id,
        ...safeUser,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
}
