import mongoose, { Schema, Document } from 'mongoose';

export interface IScenario extends Document {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  status: 'coming-soon' | 'available' | 'maintenance';
  category: string;
  icon: string;
  hazards: string[];
  learningObjectives: string[];
  vrRequirements: string[];
  introVideoUrl?: string;
}

const ScenarioSchema = new Schema<IScenario>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
    duration: { type: String, required: true },
    status: { type: String, enum: ['coming-soon', 'available', 'maintenance'], default: 'coming-soon' },
    category: { type: String, required: true },
    icon: { type: String, required: true },
    hazards: [{ type: String }],
    learningObjectives: [{ type: String }],
    vrRequirements: [{ type: String }],
    introVideoUrl: { type: String },
  },
  { timestamps: true }
);

export const Scenario = mongoose.model<IScenario>('Scenario', ScenarioSchema);
