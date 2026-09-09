import { Request, Response } from 'express';
import { Scenario } from '../models/Scenario.js';

// Default static fallback scenarios
const fallbackScenarios = [
  {
    slug: 'gas-leak',
    title: 'Gas Leak',
    description: 'Experience a realistic underground gas leak scenario. Learn to identify early warning signs, use gas detection equipment, and execute proper evacuation procedures in a controlled virtual environment.',
    shortDescription: 'Detect and respond to hazardous gas leaks in underground mining environments.',
    difficulty: 'Intermediate',
    duration: '15 min',
    status: 'coming-soon',
    category: 'Hazard Response',
    icon: 'flame',
    hazards: ['Methane accumulation', 'Carbon monoxide exposure', 'Oxygen depletion', 'Ignition risk'],
    learningObjectives: ['Identify gas leak warning signs', 'Properly use gas detection equipment', 'Execute emergency evacuation procedures'],
    vrRequirements: ['VR Headset (Meta Quest 3 or compatible)', 'Minimum 2m x 2m play area', 'Two hand controllers'],
  },
  {
    slug: 'mine-cave-in',
    title: 'Mine Cave-in',
    description: 'Simulate a mine cave-in emergency. Practice structural assessment, communication protocols, and rescue coordination in a high-stress underground collapse scenario.',
    shortDescription: 'Respond to structural collapse and coordinate emergency rescue operations.',
    difficulty: 'Advanced',
    duration: '20 min',
    status: 'coming-soon',
    category: 'Emergency Response',
    icon: 'mountain',
    hazards: ['Structural collapse', 'Falling debris', 'Dust inhalation'],
    learningObjectives: ['Assess structural integrity', 'Activate emergency communication protocols'],
    vrRequirements: ['VR Headset (Meta Quest 3 or compatible)', 'Minimum 2m x 2m play area', 'Two hand controllers'],
  },
  {
    slug: 'equipment-accident',
    title: 'Equipment Accident',
    description: 'Practice responding to heavy machinery accidents. Learn equipment lockout/tagout procedures, injury assessment, and emergency response coordination.',
    shortDescription: 'Handle heavy machinery malfunctions and prevent equipment-related injuries.',
    difficulty: 'Intermediate',
    duration: '18 min',
    status: 'coming-soon',
    category: 'Equipment Safety',
    icon: 'cog',
    hazards: ['Moving machinery parts', 'Hydraulic system failure', 'Electrical hazards'],
    learningObjectives: ['Execute lockout/tagout procedures', 'Assess injury severity'],
    vrRequirements: ['VR Headset (Meta Quest 3 or compatible)', 'Minimum 2m x 2m play area'],
  },
  {
    slug: 'poor-visibility',
    title: 'Poor Visibility',
    description: 'Navigate zero-visibility conditions caused by dust, smoke, or complete lighting failure in underground tunnels.',
    shortDescription: 'Navigate through heavy dust, smoke, and blackouts safely.',
    difficulty: 'Beginner',
    duration: '12 min',
    status: 'coming-soon',
    category: 'Environmental Navigation',
    icon: 'eye-off',
    hazards: ['Complete lighting failure', 'Dense particulate matter', 'Obstacle collisions'],
    learningObjectives: ['Deploy personal illumination', 'Follow tactile wall guidelines'],
    vrRequirements: ['VR Headset (Meta Quest 3 or compatible)', 'Minimum 2m x 2m play area'],
  },
  {
    slug: 'emergency-exit',
    title: 'Emergency Exit',
    description: 'Master rapid evacuation pathways through labyrinthine mine corridors under simulated alarm conditions.',
    shortDescription: 'Execute rapid and orderly evacuation under emergency alarm conditions.',
    difficulty: 'Beginner',
    duration: '10 min',
    status: 'coming-soon',
    category: 'Evacuation',
    icon: 'door-open',
    hazards: ['Blocked exits', 'Crowd panic', 'Smoke corridors'],
    learningObjectives: ['Identify primary and secondary egress shafts', 'Deploy emergency oxygen breathing packs'],
    vrRequirements: ['VR Headset (Meta Quest 3 or compatible)', 'Minimum 2m x 2m play area'],
  },
];

export async function getScenarios(_req: Request, res: Response): Promise<void> {
  try {
    const dbScenarios = await Scenario.find();
    if (dbScenarios && dbScenarios.length > 0) {
      res.json({ success: true, scenarios: dbScenarios });
    } else {
      res.json({ success: true, scenarios: fallbackScenarios });
    }
  } catch {
    res.json({ success: true, scenarios: fallbackScenarios });
  }
}

export async function getScenarioById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const found = await Scenario.findOne({ slug: id });
    if (found) {
      res.json({ success: true, scenario: found });
      return;
    }
  } catch {
    // Fall back to static
  }

  const fallback = fallbackScenarios.find((s) => s.slug === id);
  if (fallback) {
    res.json({ success: true, scenario: fallback });
  } else {
    res.status(404).json({ success: false, message: 'Scenario not found' });
  }
}
