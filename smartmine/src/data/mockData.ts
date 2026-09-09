// ============================================
// SmartMine XR — Mock Data
// ============================================

import type {
  Scenario,
  Plan,
  FAQItem,
  VideoContent,
  Certificate,
  TrainingSession,
  User,
} from '../types';

// ---- Scenarios ----
export const scenarios: Scenario[] = [
  {
    id: 'gas-leak',
    title: 'Gas Leak',
    description:
      'Experience a realistic underground gas leak scenario. Learn to identify early warning signs, use gas detection equipment, and execute proper evacuation procedures in a controlled virtual environment.',
    shortDescription:
      'Detect and respond to hazardous gas leaks in underground mining environments.',
    difficulty: 'Intermediate',
    duration: '15 min',
    status: 'coming-soon',
    category: 'Hazard Response',
    icon: 'flame',
    hazards: [
      'Methane accumulation',
      'Carbon monoxide exposure',
      'Oxygen depletion',
      'Ignition risk',
    ],
    learningObjectives: [
      'Identify gas leak warning signs',
      'Properly use gas detection equipment',
      'Execute emergency evacuation procedures',
      'Apply first aid for gas exposure',
    ],
    vrRequirements: [
      'VR Headset (Meta Quest 3, HTC Vive, or compatible)',
      'Minimum 2m x 2m play area',
      'Two hand controllers',
      'Stable internet connection (10+ Mbps)',
    ],
  },
  {
    id: 'mine-cave-in',
    title: 'Mine Cave-in',
    description:
      'Simulate a mine cave-in emergency. Practice structural assessment, communication protocols, and rescue coordination in a high-stress underground collapse scenario.',
    shortDescription:
      'Respond to structural collapse and coordinate emergency rescue operations.',
    difficulty: 'Advanced',
    duration: '20 min',
    status: 'coming-soon',
    category: 'Emergency Response',
    icon: 'mountain',
    hazards: [
      'Structural collapse',
      'Falling debris',
      'Dust inhalation',
      'Communication failure',
      'Secondary collapse risk',
    ],
    learningObjectives: [
      'Assess structural integrity',
      'Activate emergency communication protocols',
      'Coordinate rescue team operations',
      'Perform triage and first aid',
    ],
    vrRequirements: [
      'VR Headset (Meta Quest 3, HTC Vive, or compatible)',
      'Minimum 2m x 2m play area',
      'Two hand controllers',
      'Stable internet connection (10+ Mbps)',
    ],
  },
  {
    id: 'equipment-accident',
    title: 'Equipment Accident',
    description:
      'Practice responding to heavy machinery accidents. Learn equipment lockout/tagout procedures, injury assessment, and emergency response coordination.',
    shortDescription:
      'Handle heavy machinery malfunctions and prevent equipment-related injuries.',
    difficulty: 'Intermediate',
    duration: '18 min',
    status: 'coming-soon',
    category: 'Equipment Safety',
    icon: 'cog',
    hazards: [
      'Moving machinery parts',
      'Hydraulic system failure',
      'Electrical hazards',
      'Crushing injuries',
    ],
    learningObjectives: [
      'Execute lockout/tagout procedures',
      'Assess injury severity',
      'Apply emergency stop protocols',
      'Coordinate medical response',
    ],
    vrRequirements: [
      'VR Headset (Meta Quest 3, HTC Vive, or compatible)',
      'Minimum 2m x 2m play area',
      'Two hand controllers',
      'Stable internet connection (10+ Mbps)',
    ],
  },
  {
    id: 'poor-visibility',
    title: 'Poor Visibility',
    description:
      'Navigate through extremely low-visibility conditions including dust storms, smoke, and lighting failures. Practice orientation, communication, and safe navigation techniques.',
    shortDescription:
      'Navigate safely through dust, smoke, and lighting failure conditions.',
    difficulty: 'Beginner',
    duration: '12 min',
    status: 'coming-soon',
    category: 'Navigation Safety',
    icon: 'eye-off',
    hazards: [
      'Disorientation',
      'Collision risks',
      'Communication breakdown',
      'Trip and fall hazards',
    ],
    learningObjectives: [
      'Use tactile and audio navigation cues',
      'Maintain team communication',
      'Follow emergency lighting protocols',
      'Execute safe evacuation routes',
    ],
    vrRequirements: [
      'VR Headset (Meta Quest 3, HTC Vive, or compatible)',
      'Minimum 2m x 2m play area',
      'Two hand controllers',
      'Stable internet connection (10+ Mbps)',
    ],
  },
  {
    id: 'emergency-exit',
    title: 'Emergency Exit',
    description:
      'Practice full emergency evacuation procedures including alarm response, route selection, assembly point procedures, and headcount verification.',
    shortDescription:
      'Execute complete emergency evacuation and assembly procedures.',
    difficulty: 'Beginner',
    duration: '10 min',
    status: 'coming-soon',
    category: 'Evacuation',
    icon: 'door-open',
    hazards: [
      'Blocked exits',
      'Crowd management',
      'Smoke-filled corridors',
      'Panic situations',
    ],
    learningObjectives: [
      'Respond correctly to emergency alarms',
      'Select optimal evacuation routes',
      'Execute headcount procedures',
      'Use emergency equipment (masks, lights)',
    ],
    vrRequirements: [
      'VR Headset (Meta Quest 3, HTC Vive, or compatible)',
      'Minimum 2m x 2m play area',
      'Two hand controllers',
      'Stable internet connection (10+ Mbps)',
    ],
  },
];

// ---- Plans ----
export const plans: Plan[] = [
  {
    id: 'free',
    name: 'FREE',
    duration: '1 Month',
    price: '$0',
    priceNote: 'Free trial for new users',
    features: [
      'Access to 2 training scenarios',
      'Basic performance tracking',
      'Training history',
      'Community support',
    ],
  },
  {
    id: 'monthly',
    name: 'MONTHLY',
    duration: '1 Month',
    price: '$29',
    priceNote: 'per month',
    features: [
      'Access to all training scenarios',
      'Full performance analytics',
      'Training certificates',
      'Priority support',
      'VR setup assistance',
    ],
  },
  {
    id: 'five-month',
    name: '5 MONTH',
    duration: '5 Months',
    price: '$119',
    priceNote: 'save 18%',
    popular: true,
    features: [
      'Access to all training scenarios',
      'Full performance analytics',
      'Training certificates',
      'Priority support',
      'VR setup assistance',
      'Team progress dashboard',
      'Custom scenario requests',
    ],
  },
  {
    id: 'pro',
    name: 'PRO',
    duration: '1 Year',
    price: '$199',
    priceNote: 'save 43%',
    features: [
      'Unlimited scenario access',
      'Advanced analytics & reporting',
      'Unlimited certificates',
      'Dedicated support',
      'VR setup assistance',
      'Team management',
      'Custom scenario development',
      'API access',
      'White-label options',
    ],
  },
];

// ---- FAQ ----
export const faqItems: FAQItem[] = [
  {
    question: 'How do I connect my VR headset?',
    answer:
      'SmartMine XR supports Meta Quest 3, HTC Vive, and other WebXR-compatible headsets. Connect your headset to your PC, open the SmartMine XR platform in your browser, and click "Connect VR" when prompted. Our VR Setup Guide provides step-by-step instructions for each supported device.',
  },
  {
    question: 'What VR devices are supported?',
    answer:
      'We currently support Meta Quest 2 & 3, HTC Vive, HTC Vive Pro, Valve Index, and any WebXR-compatible headset. Mobile VR (Google Cardboard) is supported in limited preview mode. Full device compatibility details are available in our VR Setup Guide.',
  },
  {
    question: 'How do I start a training scenario?',
    answer:
      'Navigate to the Training page, select a scenario, review the scenario details and watch the introduction video. Then proceed to VR Setup where the system will verify your headset connection. Once all checks pass, click "Start Training" to begin the immersive experience.',
  },
  {
    question: 'Where can I see my performance?',
    answer:
      'Your performance data is available on your Dashboard. You can view overall training progress, individual scenario scores, reaction time metrics, and historical performance trends. Detailed breakdowns are shown after each completed training session.',
  },
  {
    question: 'How do I get a certificate?',
    answer:
      'Certificates are automatically issued after successfully completing a training scenario with a passing score (70% or above). You can view and download your certificates from the Certificates section in your Dashboard. Each certificate includes a unique verification ID.',
  },
  {
    question: 'How does my subscription work?',
    answer:
      'New users receive a free 1-month trial with access to basic scenarios. Paid plans unlock all scenarios, advanced analytics, and certificates. You can upgrade, downgrade, or cancel your subscription at any time from your Profile page. Payment integration is coming soon.',
  },
];

// ---- Video Content ----
export const videoContent: VideoContent[] = [
  {
    id: 'vid-gas-leak',
    title: 'Gas Leak Safety',
    description:
      'Learn to identify gas leak warning signs, understand detection equipment, and review evacuation procedures before entering the VR scenario.',
    duration: '8:24',
    category: 'Training Videos',
    scenarioId: 'gas-leak',
  },
  {
    id: 'vid-cave-in',
    title: 'Mine Cave-in Response',
    description:
      'Understand structural collapse indicators, communication protocols, and rescue coordination techniques.',
    duration: '10:15',
    category: 'Training Videos',
    scenarioId: 'mine-cave-in',
  },
  {
    id: 'vid-equipment',
    title: 'Equipment Safety Basics',
    description:
      'Master lockout/tagout procedures, equipment inspection checklists, and emergency stop protocols.',
    duration: '7:42',
    category: 'Training Videos',
    scenarioId: 'equipment-accident',
  },
  {
    id: 'vid-visibility',
    title: 'Low Visibility Navigation',
    description:
      'Learn navigation techniques for dust storms, smoke conditions, and lighting failures in mining environments.',
    duration: '6:18',
    category: 'Training Videos',
    scenarioId: 'poor-visibility',
  },
  {
    id: 'vid-emergency',
    title: 'Emergency Evacuation',
    description:
      'Review emergency alarm response, evacuation route planning, and assembly point procedures.',
    duration: '9:05',
    category: 'Training Videos',
    scenarioId: 'emergency-exit',
  },
  {
    id: 'vid-ppe',
    title: 'PPE for Mining Operations',
    description:
      'Complete guide to personal protective equipment selection, fitting, and maintenance for mining environments.',
    duration: '11:30',
    category: 'Safety Guides',
  },
  {
    id: 'vid-first-aid',
    title: 'Underground First Aid',
    description:
      'Essential first aid procedures specific to mining emergencies including crush injuries, gas exposure, and heat stress.',
    duration: '14:22',
    category: 'Safety Guides',
  },
  {
    id: 'vid-comms',
    title: 'Emergency Communication Protocols',
    description:
      'Learn proper radio communication, distress signals, and coordination procedures for underground emergencies.',
    duration: '5:48',
    category: 'Learning Resources',
  },
];

// ---- Mock User ----
export const mockUser: User = {
  id: 'usr-001',
  name: 'Alex Mitchell',
  email: 'alex.mitchell@miningcorp.com',
  role: 'worker',
  createdAt: '2026-08-01T00:00:00Z',
  subscription: {
    plan: 'five-month',
    status: 'active',
    startDate: '2026-08-01',
    endDate: '2027-01-01',
  },
  trainingProgress: 72,
  completedSessions: 12,
  averageScore: 86,
  certificateCount: 4,
};

// ---- Mock Certificates ----
export const mockCertificates: Certificate[] = [
  {
    id: 'cert-001',
    certificateId: 'SMXR-2026-00147',
    userId: 'usr-001',
    userName: 'Alex Mitchell',
    scenarioId: 'gas-leak',
    scenarioTitle: 'Gas Leak',
    score: 92,
    completedAt: '2026-08-15T14:30:00Z',
    issuedAt: '2026-08-15T14:31:00Z',
    verificationStatus: 'verified',
  },
  {
    id: 'cert-002',
    certificateId: 'SMXR-2026-00203',
    userId: 'usr-001',
    userName: 'Alex Mitchell',
    scenarioId: 'emergency-exit',
    scenarioTitle: 'Emergency Exit',
    score: 88,
    completedAt: '2026-08-22T10:15:00Z',
    issuedAt: '2026-08-22T10:16:00Z',
    verificationStatus: 'verified',
  },
  {
    id: 'cert-003',
    certificateId: 'SMXR-2026-00284',
    userId: 'usr-001',
    userName: 'Alex Mitchell',
    scenarioId: 'poor-visibility',
    scenarioTitle: 'Poor Visibility',
    score: 79,
    completedAt: '2026-09-01T09:45:00Z',
    issuedAt: '2026-09-01T09:46:00Z',
    verificationStatus: 'verified',
  },
  {
    id: 'cert-004',
    certificateId: 'SMXR-2026-00312',
    userId: 'usr-001',
    userName: 'Alex Mitchell',
    scenarioId: 'equipment-accident',
    scenarioTitle: 'Equipment Accident',
    score: 85,
    completedAt: '2026-09-05T16:20:00Z',
    issuedAt: '2026-09-05T16:21:00Z',
    verificationStatus: 'blockchain-ready',
  },
];

// ---- Mock Training History ----
export const mockTrainingHistory: TrainingSession[] = [
  {
    id: 'ts-001',
    scenarioId: 'gas-leak',
    scenarioTitle: 'Gas Leak',
    userId: 'usr-001',
    startedAt: '2026-09-08T14:00:00Z',
    completedAt: '2026-09-08T14:18:00Z',
    status: 'completed',
    score: { overall: 92, reactionTime: 88, safetyDecisions: 95, hazardAwareness: 90, emergencyResponse: 94 },
  },
  {
    id: 'ts-002',
    scenarioId: 'mine-cave-in',
    scenarioTitle: 'Mine Cave-in',
    userId: 'usr-001',
    startedAt: '2026-09-07T10:30:00Z',
    completedAt: '2026-09-07T10:52:00Z',
    status: 'completed',
    score: { overall: 78, reactionTime: 72, safetyDecisions: 82, hazardAwareness: 76, emergencyResponse: 80 },
  },
  {
    id: 'ts-003',
    scenarioId: 'equipment-accident',
    scenarioTitle: 'Equipment Accident',
    userId: 'usr-001',
    startedAt: '2026-09-05T16:00:00Z',
    completedAt: '2026-09-05T16:20:00Z',
    status: 'completed',
    score: { overall: 85, reactionTime: 80, safetyDecisions: 88, hazardAwareness: 84, emergencyResponse: 87 },
  },
  {
    id: 'ts-004',
    scenarioId: 'poor-visibility',
    scenarioTitle: 'Poor Visibility',
    userId: 'usr-001',
    startedAt: '2026-09-03T09:15:00Z',
    completedAt: '2026-09-03T09:28:00Z',
    status: 'completed',
    score: { overall: 91, reactionTime: 93, safetyDecisions: 89, hazardAwareness: 92, emergencyResponse: 90 },
  },
  {
    id: 'ts-005',
    scenarioId: 'emergency-exit',
    scenarioTitle: 'Emergency Exit',
    userId: 'usr-001',
    startedAt: '2026-09-01T11:00:00Z',
    completedAt: '2026-09-01T11:12:00Z',
    status: 'completed',
    score: { overall: 88, reactionTime: 85, safetyDecisions: 90, hazardAwareness: 87, emergencyResponse: 89 },
  },
];
