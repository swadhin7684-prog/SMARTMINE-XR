import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriptionModel extends Document {
  userId: mongoose.Types.ObjectId;
  plan: 'free' | 'monthly' | 'five-month' | 'pro';
  price: number;
  currency: string;
  status: 'active' | 'expired' | 'cancelled';
  startDate: Date;
  endDate: Date;
}

const SubscriptionSchema = new Schema<ISubscriptionModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: String, enum: ['free', 'monthly', 'five-month', 'pro'], required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const SubscriptionModel = mongoose.model<ISubscriptionModel>('Subscription', SubscriptionSchema);
