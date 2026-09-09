// ============================================
// SmartMine XR — Type Definitions
// ============================================

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'worker' | 'supervisor' | 'admin';
  avatar?: string;
  createdAt: string;
  subscription: Subscription;
  trainingProgress: number;
  completedSessions: number;
  averageScore: number;
  certificateCount: number;
}

export interface Subscription {
  plan: PlanType;
  status: 'active' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
}

export type PlanType = 'free' | 'monthly' | 'five-month' | 'pro';

export interface Plan {
  id: PlanType;
  name: string;
  duration: string;
  price: string;
  priceNote?: string;
  features: string[];
  popular?: boolean;
}

export interface Scenario {
  id: string;
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

export interface TrainingSession {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  userId: string;
  startedAt: string;
  completedAt?: string;
  status: 'in-progress' | 'completed' | 'abandoned';
  score?: TrainingScore;
}

export interface TrainingScore {
  overall: number;
  reactionTime: number;
  safetyDecisions: number;
  hazardAwareness: number;
  emergencyResponse: number;
}

export interface Certificate {
  id: string;
  certificateId: string;
  userId: string;
  userName: string;
  scenarioId: string;
  scenarioTitle: string;
  score: number;
  completedAt: string;
  issuedAt: string;
  verificationStatus: 'verified' | 'pending' | 'blockchain-ready';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  scenarioId?: string;
  thumbnailUrl?: string;
}

export interface VRChecklistItem {
  id: string;
  label: string;
  status: 'pending' | 'checking' | 'ready' | 'failed';
}

export interface DashboardStats {
  trainingProgress: number;
  averagePerformance: number;
  completedSessions: number;
  certificateCount: number;
}
