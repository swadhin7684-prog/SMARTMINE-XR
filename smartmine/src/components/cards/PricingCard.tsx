import React from 'react';
import { Check, Star } from 'lucide-react';
import type { Plan } from '../../types';
import Button from '../ui/Button';

interface PricingCardProps {
  plan: Plan;
  currentPlan?: string;
  onActivate: (planId: string) => void;
}

export default function PricingCard({ plan, currentPlan, onActivate }: PricingCardProps) {
  const isActive = currentPlan === plan.id;

  return (
    <div
      className={`card-base p-0 overflow-hidden relative ${
        plan.popular ? 'border-safety/40 ring-1 ring-safety/20' : ''
      }`}
    >
      {plan.popular && (
        <div className="bg-safety text-mine-950 text-xs font-bold uppercase tracking-wider text-center py-1.5 flex items-center justify-center gap-1">
          <Star className="w-3.5 h-3.5" /> Most Popular
        </div>
      )}

      <div className="p-7">
        <h3 className="text-sm font-bold uppercase tracking-wider text-mine-300">{plan.name}</h3>
        <div className="mt-3 mb-1">
          <span className="text-4xl font-bold">{plan.price}</span>
          {plan.priceNote && (
            <span className="text-sm text-mine-400 ml-2">{plan.priceNote}</span>
          )}
        </div>
        <p className="text-sm text-mine-400 mb-6">{plan.duration}</p>

        <ul className="space-y-3 mb-8">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-mine-200">
              <Check className="w-4 h-4 text-safety flex-shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>

        <Button
          variant={isActive ? 'secondary' : plan.popular ? 'primary' : 'outline'}
          fullWidth
          disabled={isActive}
          onClick={() => onActivate(plan.id)}
        >
          {isActive ? 'Current Plan' : 'Activate Plan'}
        </Button>
      </div>
    </div>
  );
}
