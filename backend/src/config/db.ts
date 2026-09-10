import { getFirestoreDb, Firestore } from './firebase.js';

const initialScenarios = [
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

async function seedScenariosIfEmpty(db: Firestore): Promise<void> {
  try {
    const snapshot = await db.collection('scenarios').limit(1).get();
    if (snapshot.empty) {
      console.log('🌱 Seeding default scenarios into Cloud Firestore...');
      const batch = db.batch();
      for (const scenario of initialScenarios) {
        const docRef = db.collection('scenarios').doc(scenario.slug);
        batch.set(docRef, {
          ...scenario,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      await batch.commit();
      console.log('✅ Successfully seeded 5 scenarios into Firestore!');
    } else {
      console.log('📦 Scenarios collection already present in Firestore.');
    }
  } catch (error) {
    console.warn('⚠️ Could not check/seed scenarios in Firestore:', error);
  }
}

export async function connectDB(): Promise<boolean> {
  try {
    const db = getFirestoreDb();
    
    // Verify connectivity by writing & reading a small health check ping
    const testDoc = db.collection('_system').doc('health_ping');
    await testDoc.set(
      {
        lastPing: new Date(),
        service: 'smartmine-backend',
      },
      { merge: true }
    );

    console.log('✅ Cloud Firestore connected successfully (Project: smartminexr)');

    // Seed scenarios if collection doesn't exist yet
    await seedScenariosIfEmpty(db);

    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('❌ Cloud Firestore connection failed:', message);
    return false;
  }
}
