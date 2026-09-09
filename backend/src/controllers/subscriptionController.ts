import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import { User } from '../models/User.js';

export async function getCurrentSubscription(req: AuthRequest, res: Response): Promise<void> {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.json({ success: true, subscription: user.subscription });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve subscription', error });
  }
}

export async function activatePlan(req: AuthRequest, res: Response): Promise<void> {
  try {
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

    const updatedUser = await User.findByIdAndUpdate(
      req.user?.id,
      {
        subscription: {
          plan,
          status: 'active',
          startDate: now,
          endDate: end,
        },
      },
      { new: true }
    );

    res.json({ success: true, subscription: updatedUser?.subscription });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to activate plan', error });
  }
}
