import { Router } from 'express';
import { getCertificates, verifyCertificate } from '../controllers/certificateController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateToken, getCertificates);
router.get('/:id/verify', verifyCertificate);

export default router;
