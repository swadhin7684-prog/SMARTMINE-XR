import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import ScenarioCard from '../components/cards/ScenarioCard';
import { scenarios } from '../data/mockData';

export default function Training() {
  return (
    <PageWrapper>
      <section className="section-padding">
        <div className="section-container">
          <div className="mb-12">
            <h1 className="section-title mb-4">Immersive Training</h1>
            <p className="section-subtitle">
              Practice high-risk situations in a controlled virtual environment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((s) => (
              <ScenarioCard key={s.id} scenario={s} />
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
