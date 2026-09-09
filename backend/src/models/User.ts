import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'worker' | 'supervisor' | 'admin';
  avatar?: string;
  trainingProgress: number;
  completedSessions: number;
  averageScore: number;
  certificateCount: number;
  subscription: {
    plan: 'free' | 'monthly' | 'five-month' | 'pro';
    status: 'active' | 'expired' | 'cancelled';
    startDate: Date;
    endDate: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['worker', 'supervisor', 'admin'], default: 'worker' },
    avatar: { type: String },
    trainingProgress: { type: Number, default: 0 },
    completedSessions: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    certificateCount: { type: Number, default: 0 },
    subscription: {
      plan: { type: String, enum: ['free', 'monthly', 'five-month', 'pro'], default: 'free' },
      status: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' },
      startDate: { type: Date, default: Date.now },
      endDate: {
        type: Date,
        default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
