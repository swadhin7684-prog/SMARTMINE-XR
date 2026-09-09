import mongoose, { Schema, Document } from 'mongoose';

export interface ITrainingSession extends Document {
  userId: mongoose.Types.ObjectId;
  scenarioId: string;
  scenarioTitle: string;
  startedAt: Date;
  completedAt?: Date;
  status: 'in-progress' | 'completed' | 'abandoned';
  score?: {
    overall: number;
    reactionTime: number;
    safetyDecisions: number;
    hazardAwareness: number;
    emergencyResponse: number;
  };
}

const TrainingSessionSchema = new Schema<ITrainingSession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    scenarioId: { type: String, required: true },
    scenarioTitle: { type: String, required: true },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    status: { type: String, enum: ['in-progress', 'completed', 'abandoned'], default: 'in-progress' },
    score: {
      overall: { type: Number },
      reactionTime: { type: Number },
      safetyDecisions: { type: Number },
      hazardAwareness: { type: Number },
      emergencyResponse: { type: Number },
    },
  },
  { timestamps: true }
);

export const TrainingSession = mongoose.model<ITrainingSession>('TrainingSession', TrainingSessionSchema);
