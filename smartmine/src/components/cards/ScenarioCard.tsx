import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Flame, Mountain, Cog, EyeOff, DoorOpen, AlertTriangle } from 'lucide-react';
import type { Scenario } from '../../types';
import Button from '../ui/Button';

const iconMap: Record<string, React.ReactNode> = {
  flame: <Flame className="w-6 h-6" />,
  mountain: <Mountain className="w-6 h-6" />,
  cog: <Cog className="w-6 h-6" />,
  'eye-off': <EyeOff className="w-6 h-6" />,
  'door-open': <DoorOpen className="w-6 h-6" />,
};

const difficultyColors: Record<string, string> = {
  Beginner: 'badge-difficulty-beginner',
  Intermediate: 'badge-difficulty-intermediate',
  Advanced: 'badge-difficulty-advanced',
};

export default function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const navigate = useNavigate();
  const isComingSoon = scenario.status === 'coming-soon';

  return (
    <div className="card-base p-0 overflow-hidden group">
      {/* Header */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-safety/10 border border-safety/20 flex items-center justify-center text-safety group-hover:bg-safety/20 transition-colors">
            {iconMap[scenario.icon] || <AlertTriangle className="w-6 h-6" />}
          </div>
          {isComingSoon && <span className="badge-coming-soon">Coming Soon</span>}
        </div>
        <h3 className="text-lg font-bold mb-2">{scenario.title}</h3>
        <p className="text-sm text-mine-400 leading-relaxed line-clamp-2">{scenario.shortDescription}</p>
      </div>

      {/* Meta */}
      <div className="px-6 pb-4 flex items-center gap-4 text-xs text-mine-400">
        <span className={difficultyColors[scenario.difficulty]}>{scenario.difficulty}</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> {scenario.duration}
        </span>
      </div>

      {/* Action */}
      <div className="px-6 pb-6">
        <Button
          variant={isComingSoon ? 'secondary' : 'primary'}
          size="sm"
          fullWidth
          onClick={() => navigate(`/training/${scenario.id}`)}
        >
          View Scenario
        </Button>
      </div>
    </div>
  );
}
