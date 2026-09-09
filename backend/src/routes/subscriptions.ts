import { Router } from 'express';
import { getCurrentSubscription, activatePlan } from '../controllers/subscriptionController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/current', authenticateToken, getCurrentSubscription);
router.post('/activate', authenticateToken, activatePlan);

export default router;
