import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Circle, Loader2, Wifi, Monitor, Gamepad2, Box, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import { scenarios } from '../data/mockData';
import type { VRChecklistItem } from '../types';

const initialChecklist: VRChecklistItem[] = [
  { id: 'headset', label: 'VR Headset Connected', status: 'pending' },
  { id: 'browser', label: 'Browser Compatibility', status: 'pending' },
  { id: 'controllers', label: 'Controllers Ready', status: 'pending' },
  { id: 'environment', label: 'Environment Ready', status: 'pending' },
  { id: 'scenario', label: 'Training Scenario Selected', status: 'pending' },
];

const checkIcons: Record<string, React.ReactNode> = {
  headset: <Monitor className="w-5 h-5" />,
  browser: <Wifi className="w-5 h-5" />,
  controllers: <Gamepad2 className="w-5 h-5" />,
  environment: <Box className="w-5 h-5" />,
  scenario: <FileCheck className="w-5 h-5" />,
};

export default function VRSetup() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scenario = scenarios.find((s) => s.id === id);
  const [checklist, setChecklist] = useState(initialChecklist);
  const [allReady, setAllReady] = useState(false);

  useEffect(() => {
    // Simulate checking each item sequentially
    const timers: ReturnType<typeof setTimeout>[] = [];
    checklist.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setChecklist((prev) =>
            prev.map((item, j) => (j === i ? { ...item, status: 'checking' } : item))
          );
        }, i * 800)
      );
      timers.push(
        setTimeout(() => {
          setChecklist((prev) =>
            prev.map((item, j) => (j === i ? { ...item, status: 'ready' } : item))
          );
          if (i === checklist.length - 1) setAllReady(true);
        }, i * 800 + 600)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <PageWrapper>
      <section className="section-padding">
        <div className="section-container max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="section-title mb-4">VR Setup</h1>
            <p className="section-subtitle mx-auto">
              Verifying your VR environment for: <span className="text-safety font-semibold">{scenario?.title || 'Training'}</span>
            </p>
          </div>

          <div className="card-base p-8 mb-8">
            <div className="space-y-4">
              {checklist.map((item, i) => (
                <motion.div
                  key={item.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                    item.status === 'ready'
                      ? 'bg-success/5 border-success/30'
                      : item.status === 'checking'
                      ? 'bg-safety/5 border-safety/30'
                      : 'bg-mine-700/50 border-mine-600/50'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-mine-400">{checkIcons[item.id]}</div>
                  <span className="flex-1 font-medium">{item.label}</span>
                  {item.status === 'pending' && <Circle className="w-5 h-5 text-mine-500" />}
                  {item.status === 'checking' && <Loader2 className="w-5 h-5 text-safety animate-spin" />}
                  {item.status === 'ready' && (
                    <CheckCircle className="w-5 h-5 text-success animate-check-in" />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-mine-700/50 border border-mine-600/30">
              <p className="text-xs text-mine-400 text-center">
                ⓘ This is a simulated VR setup check. Actual VR hardware integration will be available in a future update.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              disabled={!allReady}
              onClick={() => navigate(`/training-session/${id}`)}
            >
              {allReady ? 'START VR TRAINING' : 'Checking Setup...'}
            </Button>
            <Button variant="ghost" size="lg" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
