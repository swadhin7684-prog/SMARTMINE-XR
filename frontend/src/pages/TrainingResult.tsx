import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, CheckCircle, RotateCcw, LayoutDashboard, AlertTriangle, Zap, Shield, Siren, FileCheck } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import { scenarios, mockTrainingHistory } from '../data/mockData';
import { useTraining } from '../context/TrainingContext';

export default function TrainingResult() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lastResult } = useTraining();
  const scenario = scenarios.find((s) => s.id === id);

  // Fallback to mock score or last result
  const historyItem = mockTrainingHistory.find((h) => h.scenarioId === id);
  const score = lastResult || historyItem?.score || {
    overall: 88,
    reactionTime: 85,
    safetyDecisions: 92,
    hazardAwareness: 86,
    emergencyResponse: 89,
  };

  const isPassed = score.overall >= 70;

  return (
    <PageWrapper>
      <section className="section-padding">
        <div className="section-container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-safety/10 border border-safety/30 text-safety text-xs font-bold uppercase tracking-wider mb-4">
              <FileCheck className="w-4 h-4" /> Session Evaluation Report
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {scenario?.title || 'VR Training'} Results
            </h1>
            <p className="text-mine-400">
              Completed simulation assessment and hazard response analytics
            </p>
          </motion.div>

          {/* Main Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-base p-8 md:p-10 mb-8 border-mine-700/60 shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Circular Gauge */}
              <div className="relative w-44 h-44 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="82"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="14"
                    fill="none"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="82"
                    stroke={isPassed ? '#f0c800' : '#ef4444'}
                    strokeWidth="14"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={515}
                    strokeDashoffset={515 - (515 * score.overall) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black tracking-tight">{score.overall}%</span>
                  <span className="text-xs uppercase tracking-widest text-mine-400 font-semibold mt-1">
                    Overall
                  </span>
                </div>
              </div>

              {/* Status and Summary */}
              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-semibold tracking-wide"
                  style={{
                    backgroundColor: isPassed ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                    color: isPassed ? '#22c55e' : '#ef4444',
                    border: `1px solid ${isPassed ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                  }}
                >
                  {isPassed ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  {isPassed ? 'QUALIFIED / CERTIFIED' : 'RETEST RECOMMENDED'}
                </div>

                <h2 className="text-xl font-bold text-white">
                  {isPassed
                    ? 'Standard Safety Criteria Met'
                    : 'Critical Safety Threshold Not Met'}
                </h2>
                <p className="text-sm text-mine-300 leading-relaxed">
                  {isPassed
                    ? 'Excellent spatial awareness, proper lockout/evacuation sequences followed, and response timing within the nominal safety margin. Your certificate is now available.'
                    : 'Hesitation detected during emergency trigger sequence. Review the scenario safety brief and retake the practical VR drill.'}
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs text-mine-400">
                  <span>Scenario: <strong className="text-mine-200">{scenario?.title}</strong></span>
                  <span>Difficulty: <strong className="text-mine-200">{scenario?.difficulty}</strong></span>
                  <span>Target Pass Rate: <strong className="text-mine-200">70%</strong></span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Metrics Breakdown Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          >
            <div className="card-base p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-2 text-mine-200">
                  <Zap className="w-4 h-4 text-safety" /> Reaction Time
                </span>
                <span className="text-sm font-bold text-white">{score.reactionTime}%</span>
              </div>
              <ProgressBar progress={score.reactionTime} color="safety" />
              <p className="text-xs text-mine-400 mt-2">Latency in recognizing hazards upon trigger</p>
            </div>

            <div className="card-base p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-2 text-mine-200">
                  <Shield className="w-4 h-4 text-success" /> Safety Decisions
                </span>
                <span className="text-sm font-bold text-white">{score.safetyDecisions}%</span>
              </div>
              <ProgressBar progress={score.safetyDecisions} color="success" />
              <p className="text-xs text-mine-400 mt-2">Compliance with MSHA / OSHA protocols</p>
            </div>

            <div className="card-base p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-2 text-mine-200">
                  <AlertTriangle className="w-4 h-4 text-warning" /> Hazard Awareness
                </span>
                <span className="text-sm font-bold text-white">{score.hazardAwareness}%</span>
              </div>
              <ProgressBar progress={score.hazardAwareness} color="warning" />
              <p className="text-xs text-mine-400 mt-2">Identification of secondary environmental dangers</p>
            </div>

            <div className="card-base p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-2 text-mine-200">
                  <Siren className="w-4 h-4 text-info" /> Emergency Response
                </span>
                <span className="text-sm font-bold text-white">{score.emergencyResponse}%</span>
              </div>
              <ProgressBar progress={score.emergencyResponse} color="info" />
              <p className="text-xs text-mine-400 mt-2">Execution of alarm signals & evacuation pathway</p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              variant="primary"
              icon={<Award className="w-5 h-5" />}
              onClick={() => navigate('/certificates')}
            >
              VIEW CERTIFICATES
            </Button>
            <Button
              size="lg"
              variant="secondary"
              icon={<RotateCcw className="w-5 h-5" />}
              onClick={() => navigate(`/vr-setup/${id}`)}
            >
              TRAIN AGAIN
            </Button>
            <Button
              size="lg"
              variant="outline"
              icon={<LayoutDashboard className="w-5 h-5" />}
              onClick={() => navigate('/dashboard')}
            >
              GO TO DASHBOARD
            </Button>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
