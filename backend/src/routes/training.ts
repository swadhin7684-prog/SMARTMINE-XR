import { Router } from 'express';
import { startTraining, completeTraining, getTrainingHistory } from '../controllers/trainingController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/start', authenticateToken, startTraining);
router.put('/:id/complete', authenticateToken, completeTraining);
router.get('/history', authenticateToken, getTrainingHistory);

export default router;
