import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import { getFirestoreDb } from '../config/firebase.js';

export async function getCurrentSubscription(req: AuthRequest, res: Response): Promise<void> {
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

    const user = doc.data()!;
    res.json({ success: true, subscription: user.subscription });
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve subscription' });
  }
}

export async function activatePlan(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user?.id) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const { plan } = req.body;
    if (!['free', 'monthly', 'five-month', 'pro'].includes(plan)) {
      res.status(400).json({ success: false, message: 'Invalid plan type' });
      return;
    }

    const now = new Date();
    const end = new Date();
    if (plan === 'free') end.setMonth(end.getMonth() + 1);
    else if (plan === 'monthly') end.setMonth(end.getMonth() + 1);
    else if (plan === 'five-month') end.setMonth(end.getMonth() + 5);
    else if (plan === 'pro') end.setFullYear(end.getFullYear() + 1);

    const subscription = {
      plan,
      status: 'active',
      startDate: now.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
    };

    const db = getFirestoreDb();
    const userRef = db.collection('users').doc(req.user.id);
    await userRef.set(
      {
        subscription,
        updatedAt: now.toISOString(),
      },
      { merge: true }
    );

    res.json({ success: true, subscription });
  } catch (error) {
    console.error('Activate plan error:', error);
    res.status(500).json({ success: false, message: 'Failed to activate plan' });
  }
}
