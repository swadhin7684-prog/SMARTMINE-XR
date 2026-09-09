import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { TrainingScore } from '../types';

interface TrainingState {
  currentScenarioId: string | null;
  sessionId: string | null;
  sessionStatus: 'idle' | 'preparing' | 'in-progress' | 'completed';
  progress: number;
  elapsedTime: number;
  lastResult: TrainingScore | null;
}

interface TrainingContextType extends TrainingState {
  selectScenario: (id: string) => void;
  startSession: () => void;
  updateProgress: (progress: number) => void;
  completeSession: (score: TrainingScore) => void;
  resetSession: () => void;
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

const initialState: TrainingState = {
  currentScenarioId: null,
  sessionId: null,
  sessionStatus: 'idle',
  progress: 0,
  elapsedTime: 0,
  lastResult: null,
};

export function TrainingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TrainingState>(initialState);

  const selectScenario = (id: string) => {
    setState((s) => ({ ...s, currentScenarioId: id, sessionStatus: 'preparing' }));
  };

  const startSession = () => {
    setState((s) => ({
      ...s,
      sessionId: 'session-' + Date.now(),
      sessionStatus: 'in-progress',
      progress: 0,
      elapsedTime: 0,
    }));
  };

  const updateProgress = (progress: number) => {
    setState((s) => ({ ...s, progress }));
  };

  const completeSession = (score: TrainingScore) => {
    setState((s) => ({
      ...s,
      sessionStatus: 'completed',
      progress: 100,
      lastResult: score,
    }));
  };

  const resetSession = () => {
    setState(initialState);
  };

  return (
    <TrainingContext.Provider
      value={{ ...state, selectScenario, startSession, updateProgress, completeSession, resetSession }}
    >
      {children}
    </TrainingContext.Provider>
  );
}

export function useTraining() {
  const ctx = useContext(TrainingContext);
  if (!ctx) throw new Error('useTraining must be used within TrainingProvider');
  return ctx;
}
