import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import { getFirestoreDb } from '../config/firebase.js';

export async function getCertificates(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const db = getFirestoreDb();
    const snapshot = await db
      .collection('certificates')
      .where('userId', '==', userId)
      .get();

    const certs = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ success: true, certificates: certs });
  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch certificates' });
  }
}

export async function verifyCertificate(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    const db = getFirestoreDb();

    // Query by certificateId or doc id
    let certDoc = await db.collection('certificates').doc(id).get();
    let certData = certDoc.exists ? certDoc.data() : null;

    if (!certData) {
      const snap = await db
        .collection('certificates')
        .where('certificateId', '==', id)
        .limit(1)
        .get();
      if (!snap.empty) {
        certData = snap.docs[0].data();
      }
    }

    if (!certData) {
      res.status(404).json({
        success: false,
        verified: false,
        message: 'Certificate ID not found in verification registry.',
      });
      return;
    }

    res.json({
      success: true,
      verified: true,
      certificate: {
        id: certData.certificateId,
        recipient: certData.userName,
        scenario: certData.scenarioTitle,
        score: certData.score,
        issuedAt: certData.issuedAt,
        status: certData.verificationStatus,
        hash: certData.sha256Hash,
      },
    });
  } catch (error) {
    console.error('Certificate verification error:', error);
    res.status(500).json({ success: false, message: 'Verification lookup error' });
  }
}
