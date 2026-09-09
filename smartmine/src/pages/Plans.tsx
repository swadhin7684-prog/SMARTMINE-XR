import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Info, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import PricingCard from '../components/cards/PricingCard';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { plans } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import type { PlanType } from '../types';

export default function Plans() {
  const { user, isAuthenticated, activatePlan } = useAuth();
  const navigate = useNavigate();
  const [activeSuccessModal, setActiveSuccessModal] = useState<string | null>(null);

  const handleActivatePlan = (planId: string) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/plans' } });
      return;
    }

    activatePlan(planId as PlanType);
    const selected = plans.find((p) => p.id === planId);
    setActiveSuccessModal(selected?.name || planId);
  };

  return (
    <PageWrapper>
      <section className="section-padding">
        <div className="section-container">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-safety/10 border border-safety/30 text-safety text-xs font-bold uppercase tracking-wider mb-4">
              <Zap className="w-4 h-4" /> Transparent Enterprise & Worker Licensing
            </div>
            <h1 className="section-title mb-4">
              Safety Training Plans for <span className="text-safety">Every Mine Scale</span>
            </h1>
            <p className="section-subtitle mx-auto">
              Start with a free 1-month trial or equip your workforce with unlimited scenarios, advanced analytics, and certified credentials.
            </p>

            {/* Payment integration notice */}
            <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-mine-800/90 border border-mine-700 text-xs text-mine-300">
              <Info className="w-4 h-4 text-safety flex-shrink-0" />
              <span>
                <strong>Simulated Checkout:</strong> Payment gateway integration is in progress. Activating any plan instantly updates your profile access immediately.
              </span>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
            {plans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                currentPlan={user?.subscription?.plan}
                onActivate={handleActivatePlan}
              />
            ))}
          </div>

          {/* Comparison Matrix */}
          <div className="card-base p-8 mb-16 overflow-x-auto border-mine-700">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-safety" /> Detailed Plan Comparison
            </h2>

            <table className="w-full text-left text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-mine-700 text-mine-400">
                  <th className="pb-4 font-semibold">Capability</th>
                  <th className="pb-4 font-semibold text-center">FREE</th>
                  <th className="pb-4 font-semibold text-center">MONTHLY</th>
                  <th className="pb-4 font-semibold text-center text-safety">5 MONTH</th>
                  <th className="pb-4 font-semibold text-center">PRO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mine-800 text-mine-200">
                <tr>
                  <td className="py-3.5">Scenario Access</td>
                  <td className="py-3.5 text-center text-mine-400">2 Basic Scenarios</td>
                  <td className="py-3.5 text-center">All Scenarios</td>
                  <td className="py-3.5 text-center text-safety font-medium">All Scenarios</td>
                  <td className="py-3.5 text-center font-medium">Unlimited + Custom</td>
                </tr>
                <tr>
                  <td className="py-3.5">Telemetry & Score Breakdown</td>
                  <td className="py-3.5 text-center text-mine-400">Basic Score</td>
                  <td className="py-3.5 text-center"><Check className="w-4 h-4 text-safety mx-auto" /></td>
                  <td className="py-3.5 text-center"><Check className="w-4 h-4 text-safety mx-auto" /></td>
                  <td className="py-3.5 text-center"><Check className="w-4 h-4 text-safety mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3.5">Official Safety Certificates</td>
                  <td className="py-3.5 text-center text-mine-500">—</td>
                  <td className="py-3.5 text-center"><Check className="w-4 h-4 text-safety mx-auto" /></td>
                  <td className="py-3.5 text-center"><Check className="w-4 h-4 text-safety mx-auto" /></td>
                  <td className="py-3.5 text-center"><Check className="w-4 h-4 text-safety mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3.5">Supervisor Fleet Dashboard</td>
                  <td className="py-3.5 text-center text-mine-500">—</td>
                  <td className="py-3.5 text-center text-mine-500">—</td>
                  <td className="py-3.5 text-center"><Check className="w-4 h-4 text-safety mx-auto" /></td>
                  <td className="py-3.5 text-center"><Check className="w-4 h-4 text-safety mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3.5">Custom Mine CAD Ingestion</td>
                  <td className="py-3.5 text-center text-mine-500">—</td>
                  <td className="py-3.5 text-center text-mine-500">—</td>
                  <td className="py-3.5 text-center text-mine-500">—</td>
                  <td className="py-3.5 text-center"><Check className="w-4 h-4 text-safety mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3.5">Support Level</td>
                  <td className="py-3.5 text-center text-mine-400">Community</td>
                  <td className="py-3.5 text-center">Standard Email</td>
                  <td className="py-3.5 text-center text-safety">Priority 24/7</td>
                  <td className="py-3.5 text-center">Dedicated Account Engineer</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Enterprise Inquiry Banner */}
          <div className="rounded-2xl bg-mine-800/80 border border-mine-700 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-lg font-bold text-white">Need a Multi-Site Enterprise Deployment?</h3>
              <p className="text-sm text-mine-400">
                We provide on-premise deployments, custom safety scenario authoring, and volume enterprise licensing.
              </p>
            </div>
            <Button variant="secondary" onClick={() => navigate('/support')}>
              Contact Enterprise Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Plan Activated Modal */}
      <Modal
        isOpen={!!activeSuccessModal}
        onClose={() => setActiveSuccessModal(null)}
        title="Plan Activated Successfully"
        size="md"
      >
        <div className="text-center py-4 space-y-4">
          <div className="w-14 h-14 rounded-full bg-success/15 border border-success/30 flex items-center justify-center mx-auto text-success">
            <Check className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {activeSuccessModal} Plan Activated!
          </h3>
          <p className="text-sm text-mine-300">
            Your account permissions have been upgraded. You now have active access according to your selected plan tier.
          </p>
          <div className="pt-4 flex gap-3 justify-center">
            <Button variant="primary" onClick={() => { setActiveSuccessModal(null); navigate('/dashboard'); }}>
              Go to Dashboard
            </Button>
            <Button variant="outline" onClick={() => setActiveSuccessModal(null)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </PageWrapper>
  );
}
