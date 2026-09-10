import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import { getFirestoreDb } from '../config/firebase.js';

export async function startTraining(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.id;
    const { scenarioId, scenarioTitle } = req.body;

    if (!scenarioId || !scenarioTitle) {
      res.status(400).json({ success: false, message: 'Scenario ID and title are required' });
      return;
    }

    const db = getFirestoreDb();
    const sessionData = {
      userId,
      scenarioId,
      scenarioTitle,
      startedAt: new Date().toISOString(),
      status: 'in-progress',
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection('training_sessions').add(sessionData);

    res.status(201).json({
      success: true,
      session: {
        id: docRef.id,
        ...sessionData,
      },
    });
  } catch (error) {
    console.error('Start training error:', error);
    res.status(500).json({ success: false, message: 'Failed to start session' });
  }
}

export async function completeTraining(req: AuthRequest, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    const { score } = req.body;

    const db = getFirestoreDb();
    const sessionRef = db.collection('training_sessions').doc(id);
    const sessionDoc = await sessionRef.get();

    if (!sessionDoc.exists) {
      res.status(404).json({ success: false, message: 'Training session not found' });
      return;
    }

    const sessionData = sessionDoc.data()!;
    const now = new Date().toISOString();

    const updateData = {
      completedAt: now,
      status: 'completed',
      score,
      updatedAt: now,
    };

    await sessionRef.set(updateData, { merge: true });

    // If score >= 70, generate certificate
    let cert = null;
    if (score && score.overall >= 70 && req.user?.id) {
      const userRef = db.collection('users').doc(req.user.id);
      const userDoc = await userRef.get();
      const userData = userDoc.data();

      const certId = `SMXR-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const sha256Hash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

      const certData = {
        certificateId: certId,
        userId: req.user.id,
        userName: userData?.name || 'Worker',
        scenarioId: sessionData.scenarioId,
        scenarioTitle: sessionData.scenarioTitle,
        score: score.overall,
        completedAt: now,
        issuedAt: now,
        verificationStatus: 'verified',
        sha256Hash,
      };

      const certRef = await db.collection('certificates').add(certData);
      cert = { id: certRef.id, ...certData };

      // Update user stats
      if (userDoc.exists && userData) {
        const completedSessions = (userData.completedSessions || 0) + 1;
        const certificateCount = (userData.certificateCount || 0) + 1;
        const trainingProgress = Math.min(100, (userData.trainingProgress || 0) + 15);
        const averageScore = Math.round(
          ((userData.averageScore || 80) * (completedSessions - 1) + score.overall) / completedSessions
        );

        await userRef.set(
          {
            completedSessions,
            certificateCount,
            trainingProgress,
            averageScore,
            updatedAt: now,
          },
          { merge: true }
        );
      }
    }

    res.json({
      success: true,
      session: {
        id,
        ...sessionData,
        ...updateData,
      },
      certificate: cert,
    });
  } catch (error) {
    console.error('Complete training error:', error);
    res.status(500).json({ success: false, message: 'Failed to complete session' });
  }
}

export async function getTrainingHistory(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const db = getFirestoreDb();
    const snapshot = await db
      .collection('training_sessions')
      .where('userId', '==', userId)
      .get();

    const history = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ success: true, history });
  } catch (error) {
    console.error('Get training history error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch history' });
  }
}
