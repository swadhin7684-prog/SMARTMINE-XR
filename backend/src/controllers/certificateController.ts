import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import { Certificate } from '../models/Certificate.js';

export async function getCertificates(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.id;
    const certs = await Certificate.find({ userId }).sort({ completedAt: -1 });
    res.json({ success: true, certificates: certs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch certificates', error });
  }
}

export async function verifyCertificate(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const cert = await Certificate.findOne({
      $or: [{ certificateId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : undefined }],
    });

    if (!cert) {
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
        id: cert.certificateId,
        recipient: cert.userName,
        scenario: cert.scenarioTitle,
        score: cert.score,
        issuedAt: cert.issuedAt,
        status: cert.verificationStatus,
        hash: cert.sha256Hash,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Verification lookup error', error });
  }
}
