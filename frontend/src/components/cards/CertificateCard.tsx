import React from 'react';
import { Award, CheckCircle, Clock, Shield } from 'lucide-react';
import type { Certificate } from '../../types';
import Button from '../ui/Button';

const statusStyles: Record<string, { label: string; color: string }> = {
  verified: { label: 'Verified', color: 'text-success' },
  pending: { label: 'Pending', color: 'text-warning' },
  'blockchain-ready': { label: 'Blockchain Ready', color: 'text-info' },
};

export default function CertificateCard({ certificate, onVerify }: { certificate: Certificate; onVerify?: (id: string) => void }) {
  const status = statusStyles[certificate.verificationStatus];

  return (
    <div className="card-base p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-safety/10 border border-safety/20 flex items-center justify-center">
          <Award className="w-6 h-6 text-safety" />
        </div>
        <span className={`flex items-center gap-1.5 text-xs font-semibold ${status.color}`}>
          <CheckCircle className="w-3.5 h-3.5" /> {status.label}
        </span>
      </div>

      <h3 className="text-lg font-bold mb-1">{certificate.scenarioTitle}</h3>
      <p className="text-sm text-mine-400 mb-4">Certificate for successful completion</p>

      <div className="space-y-2 mb-5 text-sm">
        <div className="flex justify-between">
          <span className="text-mine-400">Worker</span>
          <span className="text-mine-200 font-medium">{certificate.userName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-mine-400">Score</span>
          <span className="text-safety font-bold">{certificate.score}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-mine-400">Date</span>
          <span className="text-mine-200">{new Date(certificate.completedAt).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-mine-400">Certificate ID</span>
          <span className="text-mine-300 font-mono text-xs">{certificate.certificateId}</span>
        </div>
      </div>

      <Button variant="outline" size="sm" fullWidth icon={<Shield className="w-4 h-4" />} onClick={() => onVerify?.(certificate.id)}>
        Verify Certificate
      </Button>

      {certificate.verificationStatus === 'blockchain-ready' && (
        <p className="text-xs text-mine-500 mt-3 text-center flex items-center justify-center gap-1">
          <Clock className="w-3 h-3" /> Blockchain verification — Future Feature
        </p>
      )}
    </div>
  );
}
