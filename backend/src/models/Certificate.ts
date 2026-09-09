import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  certificateId: string;
  userId: mongoose.Types.ObjectId;
  userName: string;
  scenarioId: string;
  scenarioTitle: string;
  score: number;
  completedAt: Date;
  issuedAt: Date;
  verificationStatus: 'verified' | 'pending' | 'blockchain-ready';
  sha256Hash: string;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    certificateId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    scenarioId: { type: String, required: true },
    scenarioTitle: { type: String, required: true },
    score: { type: Number, required: true },
    completedAt: { type: Date, required: true },
    issuedAt: { type: Date, default: Date.now },
    verificationStatus: {
      type: String,
      enum: ['verified', 'pending', 'blockchain-ready'],
      default: 'verified',
    },
    sha256Hash: { type: String, required: true },
  },
  { timestamps: true }
);

export const Certificate = mongoose.model<ICertificate>('Certificate', CertificateSchema);
