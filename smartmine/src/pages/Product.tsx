import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Glasses,
  Flame,
  RotateCcw,
  BarChart3,
  Sliders,
  Award,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';

const productFeatures = [
  {
    icon: Glasses,
    tag: 'IMMERSIVE FIDELITY',
    title: 'True Spatial Photorealism & Binaural Acoustics',
    desc: 'Rendered with physics-based lighting and sub-surface rock fracture mapping. Workers experience authentic sensory depth, echoing alarms, and claustrophobic cavern environments with zero real-world exposure.',
    points: [
      'Millimeter-accurate underground tunnel geometry',
      'Realistic directional audio for sound-based hazard localization',
      'Adaptive pupil dilation and low-light visual distortion',
    ],
  },
  {
    icon: Flame,
    tag: 'DYNAMIC HAZARD PHYSICS',
    title: 'Volatile Gas & Structural Stress Simulations',
    desc: 'Proprietary fluid-dynamics engines model realistic methane pockets, poisonous CO buildup, and secondary rock bursts. Hazards unfold dynamically based on ventilation adjustments and worker actions.',
    points: [
      'Real-time atmospheric gas sensor readouts',
      'Progressive roof sag and acoustic rock pinging warnings',
      'Combustion spark and thermal flash ignition models',
    ],
  },
  {
    icon: RotateCcw,
    tag: 'REPETITIVE DRILLS',
    title: 'High-Stress Inoculation Through Infinite Iterations',
    desc: 'In real mining, mistakes are fatal. In SmartMine XR, miners repeat emergency procedures until safety maneuvers become instinctive second nature under pulse-pounding pressure.',
    points: [
      'Zero consumable costs for pyrotechnics or rescue kit wear',
      'Instant scenario resets with randomized hazard seeds',
      'Solo practice or supervisor-supervised group drills',
    ],
  },
  {
    icon: BarChart3,
    tag: 'TELEMETRIC ANALYTICS',
    title: 'Millisecond Decision Tracking & Predictive Safety',
    desc: 'Measure what traditional classroom training cannot: reaction delay, gaze focus on safety warning signs, compliance with lockout sequences, and stress-induced errors.',
    points: [
      'Sub-second reaction latency breakdown',
      'Branching decision decision-tree audit logs',
      'Comparative benchmarking across department cohorts',
    ],
  },
  {
    icon: Sliders,
    tag: 'ENTERPRISE DEPLOYMENT',
    title: 'Multi-Site Fleet & Scenario Administration',
    desc: 'Safety directors can deploy customized training regimens across dozens of mines globally. Update training modules centrally and track multinational compliance in real time.',
    points: [
      'Role-based access control for workers and safety officers',
      'Integration with existing LMS and enterprise HR systems',
      'Custom CAD & mine blueprint ingest pipeline',
    ],
  },
  {
    icon: Award,
    tag: 'CERTIFICATION ENGINE',
    title: 'Cryptographically Verifiable Safety Credentials',
    desc: 'Every completed scenario generates an authenticated safety credential with a unique SHA-256 identifier, verifiable by compliance auditors, insurance underwriters, and safety inspectors.',
    points: [
      'Immutable session audit trails with timestamps',
      'Direct PDF certificate exports for mine site files',
      'Prepared for decentralized on-chain verification',
    ],
  },
];

const supportedDevices = [
  { name: 'Meta Quest 3 & Pro', type: 'Standalone / PC VR', status: 'Full Support' },
  { name: 'HTC Vive Focus 3 & Pro 2', type: 'Enterprise VR', status: 'Full Support' },
  { name: 'Valve Index', type: 'Tethered High-Refresh', status: 'Full Support' },
  { name: 'WebXR Standard Browser', type: 'Chrome / Edge / Firefox', status: 'Certified' },
];

export default function Product() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <section className="section-padding">
        <div className="section-container">
          {/* Hero Header */}
          <div className="max-w-3xl mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-safety/10 border border-safety/30 text-safety text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4" /> Next-Generation Industrial XR Architecture
            </div>
            <h1 className="section-title mb-6">
              Engineered for Extreme Environments. <span className="text-safety">Zero Compromises.</span>
            </h1>
            <p className="section-subtitle">
              SmartMine XR combines high-fidelity virtual reality simulation, industrial physics modeling, and comprehensive biometric performance telemetrics.
            </p>
          </div>

          {/* Alternating Feature Sections */}
          <div className="space-y-20 md:space-y-28 mb-24">
            {productFeatures.map((feature, i) => {
              const isEven = i % 2 === 0;
              const Icon = feature.icon;

              return (
                <div
                  key={i}
                  className={`flex flex-col ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } items-center gap-12 lg:gap-16`}
                >
                  {/* Visual block */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-full lg:w-1/2"
                  >
                    <div className="relative rounded-2xl bg-gradient-to-br from-mine-800 to-mine-900 border border-mine-700/80 p-8 md:p-12 overflow-hidden shadow-2xl group hover:border-safety/40 transition-colors">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-safety/5 rounded-full blur-3xl pointer-events-none" />
                      <div className="w-16 h-16 rounded-2xl bg-safety/10 border border-safety/30 flex items-center justify-center mb-8">
                        <Icon className="w-8 h-8 text-safety" />
                      </div>
                      <div className="space-y-3 font-mono text-xs text-mine-400">
                        <div className="flex items-center gap-2 text-mine-300">
                          <Cpu className="w-4 h-4 text-safety" /> SUB-SYSTEM: {feature.tag}
                        </div>
                        <div className="p-3 bg-mine-950/80 rounded-lg border border-mine-700/50">
                          <code>LATENCY: &lt;11ms | REFRESH: 90Hz | RESOLUTION: 4K PER-EYE</code>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Content text */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-full lg:w-1/2"
                  >
                    <span className="text-xs font-bold text-safety tracking-widest uppercase mb-2 block">
                      {feature.tag}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                      {feature.title}
                    </h2>
                    <p className="text-mine-300 leading-relaxed mb-6">
                      {feature.desc}
                    </p>
                    <ul className="space-y-3">
                      {feature.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-mine-200">
                          <CheckCircle2 className="w-4 h-4 text-safety flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Hardware Ecosystem Grid */}
          <div className="card-base p-8 md:p-12 mb-20 border-mine-700">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <Layers className="w-10 h-10 text-safety mx-auto mb-3" />
              <h2 className="text-2xl font-bold mb-2">Supported Hardware Ecosystem</h2>
              <p className="text-sm text-mine-400">
                Built on open WebXR standards, SmartMine XR operates across leading commercial and enterprise VR headsets.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {supportedDevices.map((dev, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-mine-800/80 border border-mine-700/70 hover:border-mine-600 transition-colors"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-safety bg-safety/10 px-2 py-0.5 rounded inline-block mb-3">
                    {dev.status}
                  </span>
                  <h4 className="text-base font-bold text-white mb-1">{dev.name}</h4>
                  <p className="text-xs text-mine-400">{dev.type}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-mine-900 via-mine-800 to-mine-900 border border-safety/30 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Equip Your Workforce with Zero-Casualty Training
            </h2>
            <p className="text-mine-300 max-w-2xl mx-auto mb-8">
              Explore our flexible deployment plans or experience our interactive training scenarios today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={() => navigate('/training')} icon={<ArrowRight className="w-5 h-5" />}>
                EXPLORE SCENARIOS
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/plans')}>
                VIEW PRICING PLANS
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
