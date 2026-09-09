import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, AlertTriangle, Target, Monitor, Play } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { scenarios } from '../data/mockData';
import { useTraining } from '../context/TrainingContext';

export default function ScenarioDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectScenario } = useTraining();
  const [showVideo, setShowVideo] = useState(false);
  const scenario = scenarios.find((s) => s.id === id);

  if (!scenario) {
    return (
      <PageWrapper>
        <div className="section-container section-padding text-center">
          <h1 className="section-title mb-4">Scenario Not Found</h1>
          <Button onClick={() => navigate('/training')}>Back to Training</Button>
        </div>
      </PageWrapper>
    );
  }

  const handleStartTraining = () => {
    selectScenario(scenario.id);
    navigate(`/vr-setup/${scenario.id}`);
  };

  return (
    <PageWrapper>
      <section className="section-padding">
        <div className="section-container max-w-4xl">
          {/* Back */}
          <button
            onClick={() => navigate('/training')}
            className="flex items-center gap-2 text-mine-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Training
          </button>

          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div>
              <span className="badge-coming-soon mb-3 inline-block">Coming Soon</span>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{scenario.title}</h1>
              <div className="flex items-center gap-4 text-sm text-mine-400">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {scenario.duration}</span>
                <span>{scenario.difficulty}</span>
                <span>{scenario.category}</span>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="card-base p-7 mb-6">
            <h2 className="text-xl font-bold mb-3">Scenario Overview</h2>
            <p className="text-mine-300 leading-relaxed">{scenario.description}</p>
          </div>

          {/* Hazards & Learning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="card-base p-7">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-danger" /> Hazards
              </h3>
              <ul className="space-y-2">
                {scenario.hazards.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-mine-300">
                    <span className="w-1.5 h-1.5 bg-danger rounded-full" /> {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-base p-7">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-safety" /> Learning Objectives
              </h3>
              <ul className="space-y-2">
                {scenario.learningObjectives.map((o, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-mine-300">
                    <span className="w-1.5 h-1.5 bg-safety rounded-full" /> {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Intro Video */}
          <div className="card-base p-7 mb-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-safety" /> Introduction Video
            </h3>
            <div
              className="relative aspect-video bg-mine-700 rounded-xl flex items-center justify-center cursor-pointer group overflow-hidden"
              onClick={() => setShowVideo(true)}
            >
              <div className="absolute inset-0 animate-shimmer" />
              <div className="w-16 h-16 rounded-full bg-safety/90 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 text-mine-950 ml-0.5" />
              </div>
              <span className="absolute bottom-4 left-4 text-sm text-mine-400 z-10">
                Watch the introduction before starting training
              </span>
            </div>
          </div>

          {/* VR Requirements */}
          <div className="card-base p-7 mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-info" /> VR Requirements
            </h3>
            <ul className="space-y-2">
              {scenario.vrRequirements.map((r, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-mine-300">
                  <span className="w-1.5 h-1.5 bg-info rounded-full" /> {r}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <Button size="lg" onClick={handleStartTraining}>
              Start Training
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/content')}>
              View Preparation Content
            </Button>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Modal isOpen={showVideo} onClose={() => setShowVideo(false)} title="Introduction Video" size="xl">
        <div className="aspect-video bg-mine-700 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <Play className="w-12 h-12 text-mine-500 mx-auto mb-3" />
            <p className="text-mine-400">Video player placeholder</p>
            <p className="text-xs text-mine-500 mt-1">Video content will be available when scenarios are released</p>
          </div>
        </div>
      </Modal>
    </PageWrapper>
  );
}
