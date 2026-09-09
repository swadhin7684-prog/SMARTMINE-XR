import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import { TrainingSession } from '../models/TrainingSession.js';
import { Certificate } from '../models/Certificate.js';
import { User } from '../models/User.js';

export async function startTraining(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.id;
    const { scenarioId, scenarioTitle } = req.body;

    if (!scenarioId || !scenarioTitle) {
      res.status(400).json({ success: false, message: 'Scenario ID and title are required' });
      return;
    }

    const session = await TrainingSession.create({
      userId,
      scenarioId,
      scenarioTitle,
      startedAt: new Date(),
      status: 'in-progress',
    });

    res.status(201).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to start session', error });
  }
}

export async function completeTraining(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { score } = req.body;

    const session = await TrainingSession.findById(id);
    if (!session) {
      res.status(404).json({ success: false, message: 'Training session not found' });
      return;
    }

    session.completedAt = new Date();
    session.status = 'completed';
    session.score = score;
    await session.save();

    // If score >= 70, generate certificate
    let cert = null;
    if (score && score.overall >= 70 && req.user?.id) {
      const user = await User.findById(req.user.id);
      const certId = `SMXR-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const sha256Hash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

      cert = await Certificate.create({
        certificateId: certId,
        userId: req.user.id,
        userName: user?.name || 'Worker',
        scenarioId: session.scenarioId,
        scenarioTitle: session.scenarioTitle,
        score: score.overall,
        completedAt: new Date(),
        verificationStatus: 'verified',
        sha256Hash,
      });

      // Update user stats
      if (user) {
        user.completedSessions = (user.completedSessions || 0) + 1;
        user.certificateCount = (user.certificateCount || 0) + 1;
        user.trainingProgress = Math.min(100, (user.trainingProgress || 0) + 15);
        user.averageScore = Math.round(
          ((user.averageScore || 80) * (user.completedSessions - 1) + score.overall) / user.completedSessions
        );
        await user.save();
      }
    }

    res.json({ success: true, session, certificate: cert });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to complete session', error });
  }
}

export async function getTrainingHistory(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.id;
    const history = await TrainingSession.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch history', error });
  }
}
