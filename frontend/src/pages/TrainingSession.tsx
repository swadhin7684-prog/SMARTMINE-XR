import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import { scenarios } from '../data/mockData';
import { useTraining } from '../context/TrainingContext';

export default function TrainingSession() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { completeSession } = useTraining();
  const scenario = scenarios.find((s) => s.id === id);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate training progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
      setElapsed((prev) => prev + 1);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100 && !isComplete) {
      setIsComplete(true);
      const score = {
        overall: Math.floor(Math.random() * 20) + 78,
        reactionTime: Math.floor(Math.random() * 20) + 75,
        safetyDecisions: Math.floor(Math.random() * 15) + 82,
        hazardAwareness: Math.floor(Math.random() * 20) + 76,
        emergencyResponse: Math.floor(Math.random() * 18) + 80,
      };
      completeSession(score);
      setTimeout(() => navigate(`/training-result/${id}`), 1500);
    }
  }, [progress, isComplete, id, navigate, completeSession]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <PageWrapper>
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="section-container max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Pulsing VR indicator */}
            <div className="w-24 h-24 rounded-full bg-safety/10 border-2 border-safety/30 flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
              <Eye className="w-10 h-10 text-safety" />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {isComplete ? 'Training Complete!' : 'Training In Progress'}
            </h1>
            <p className="text-mine-400 mb-8">
              {scenario?.title || 'VR Training'} — {isComplete ? 'Well done!' : 'Immersive session active'}
            </p>

            {/* Progress ring */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="85" stroke="rgba(255,255,255,0.06)" strokeWidth="10" fill="none" />
                <circle
                  cx="100" cy="100" r="85"
                  stroke="#f0c800"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={534}
                  strokeDashoffset={534 - (534 * progress) / 100}
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{Math.round(progress)}%</span>
                <span className="text-sm text-mine-400">Progress</span>
              </div>
            </div>

            <div className="flex justify-center gap-8 text-sm text-mine-400 mb-8">
              <div>
                <span className="block text-xl font-bold text-white">{formatTime(elapsed)}</span>
                Elapsed
              </div>
              <div>
                <span className="block text-xl font-bold text-white">{scenario?.difficulty}</span>
                Difficulty
              </div>
            </div>

            {!isComplete && (
              <div className="p-4 rounded-xl bg-mine-800 border border-mine-600/50 inline-block">
                <p className="text-xs text-mine-500">
                  ⓘ This is a simulated training session. Actual VR immersive training will be available in a future update.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
