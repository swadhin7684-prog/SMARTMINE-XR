import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Brain, Siren, BarChart3,
  ArrowRight, ChevronRight,
} from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import ScenarioCard from '../components/cards/ScenarioCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { scenarios } from '../data/mockData';

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

const steps = [
  { num: '01', title: 'Choose Scenario', desc: 'Select from a range of mining and manufacturing hazard scenarios.' },
  { num: '02', title: 'Watch Introduction', desc: 'Review safety content and understand the situation before entering VR.' },
  { num: '03', title: 'Connect VR', desc: 'Connect your VR headset and verify your setup is ready.' },
  { num: '04', title: 'Start Training', desc: 'Enter the immersive environment and practice your response.' },
];

const features = [
  { icon: ShieldCheck, title: 'Safer Training', desc: 'Practice dangerous situations without real-world risk.' },
  { icon: Brain, title: 'Hazard Awareness', desc: 'Understand how hazards develop and how to respond.' },
  { icon: Siren, title: 'Emergency Response', desc: 'Practice emergency procedures repeatedly.' },
  { icon: BarChart3, title: 'Measurable Performance', desc: 'Track training sessions and performance.' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <PageWrapper noPadding>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative section-container py-32 md:py-0">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-safety/10 border border-safety/20 text-safety text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-safety rounded-full animate-pulse" />
              Immersive VR Safety Training
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6">
              Train for the danger.
              <br />
              <span className="text-safety">Without facing it.</span>
            </h1>
            <p className="text-lg md:text-xl text-mine-300 leading-relaxed max-w-2xl mb-10">
              SmartMine XR delivers immersive VR safety training for mining and manufacturing workers,
              allowing them to practice dangerous situations safely, repeatedly and measurably.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => navigate('/training')} icon={<ArrowRight className="w-5 h-5" />}>
                START TRAINING
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/training')}>
                EXPLORE SCENARIOS
              </Button>
            </div>
          </motion.div>
        </div>
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronRight className="w-6 h-6 text-mine-500 rotate-90" />
        </motion.div>
      </section>

      {/* ===== WHAT IS SMARTMINE XR? ===== */}
      <section className="section-padding bg-mine-900">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="section-title mb-6">
                What is <span className="text-safety">SmartMine XR</span>?
              </h2>
              <p className="section-subtitle mx-auto">
                SmartMine XR allows workers to safely experience and practice high-risk scenarios through
                immersive 3D simulations. From gas leaks to cave-ins, workers build hazard awareness and
                emergency response skills in a controlled virtual environment — without any real-world danger.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section-padding">
        <div className="section-container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="section-title mb-4">How It Works</h2>
              <p className="section-subtitle mx-auto">Four steps to immersive safety training.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <AnimatedSection key={step.num}>
                <div className="card-base p-6 text-center relative" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="text-5xl font-bold text-safety/20 mb-4">{step.num}</div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-mine-400">{step.desc}</p>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 text-mine-600">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY SMARTMINE XR ===== */}
      <section className="section-padding bg-mine-900">
        <div className="section-container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="section-title mb-4">Why SmartMine XR?</h2>
              <p className="section-subtitle mx-auto">Built for industrial safety. Designed for impact.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <AnimatedSection key={i}>
                <div className="card-base p-7 flex gap-5">
                  <div className="w-14 h-14 rounded-xl bg-safety/10 border border-safety/20 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-7 h-7 text-safety" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1.5">{f.title}</h3>
                    <p className="text-sm text-mine-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRAINING SCENARIOS ===== */}
      <section className="section-padding">
        <div className="section-container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="section-title mb-4">Training Scenarios</h2>
              <p className="section-subtitle mx-auto">
                Practice real-world hazard response in immersive virtual environments.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((s) => (
              <AnimatedSection key={s.id}>
                <ScenarioCard scenario={s} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="section-padding bg-mine-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(240,200,0,0.06),transparent_70%)]" />
        <div className="section-container relative">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="section-title mb-6">
                Ready to train for the <span className="text-safety">unexpected</span>?
              </h2>
              <p className="section-subtitle mx-auto mb-10">
                Start your immersive safety training journey today.
              </p>
              <Button size="lg" onClick={() => navigate('/training')} icon={<ArrowRight className="w-5 h-5" />}>
                START TRAINING
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageWrapper>
  );
}
