import React, { useState } from 'react';
import { Award, ShieldCheck, Download, CheckCircle, ExternalLink, QrCode } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import CertificateCard from '../components/cards/CertificateCard';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { mockCertificates } from '../data/mockData';
import type { Certificate } from '../types';

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [filter, setFilter] = useState<'all' | 'verified' | 'blockchain-ready'>('all');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const filtered = mockCertificates.filter((cert) => {
    if (filter === 'all') return true;
    return cert.verificationStatus === filter;
  });

  const handleVerify = (certId: string) => {
    const found = mockCertificates.find((c) => c.id === certId);
    if (found) setSelectedCert(found);
  };

  const handleDownloadPDF = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <PageWrapper>
      <section className="section-padding">
        <div className="section-container">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-safety/10 border border-safety/30 text-safety text-xs font-bold uppercase tracking-wider mb-4">
              <Award className="w-4 h-4" /> Compliance & Qualifications Registry
            </div>
            <h1 className="section-title mb-4">Issued Safety Certificates</h1>
            <p className="section-subtitle">
              Official records of completed high-risk VR simulation scenarios, audited scores, and verification status.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-mine-800 pb-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-safety text-mine-950 font-bold'
                  : 'bg-mine-800 text-mine-300 hover:text-white'
              }`}
            >
              All Certificates ({mockCertificates.length})
            </button>
            <button
              onClick={() => setFilter('verified')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === 'verified'
                  ? 'bg-safety text-mine-950 font-bold'
                  : 'bg-mine-800 text-mine-300 hover:text-white'
              }`}
            >
              Standard Verified
            </button>
            <button
              onClick={() => setFilter('blockchain-ready')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === 'blockchain-ready'
                  ? 'bg-safety text-mine-950 font-bold'
                  : 'bg-mine-800 text-mine-300 hover:text-white'
              }`}
            >
              Blockchain Ready
            </button>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filtered.map((cert) => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                onVerify={() => handleVerify(cert.id)}
              />
            ))}
          </div>

          {/* Blockchain & Verification Callout */}
          <div className="card-base p-8 border-mine-700 bg-mine-900/90 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-safety uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
                <ShieldCheck className="w-4 h-4" /> SHA-256 Ledger Auditing
              </span>
              <h3 className="text-lg font-bold text-white">
                Verifiable Compliance for Safety Regulators
              </h3>
              <p className="text-sm text-mine-300 max-w-2xl">
                Every certificate issued by SmartMine XR contains a cryptographic proof signature that can be authenticated by mine safety inspectors and insurance carriers without revealing sensitive worker records.
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="px-3.5 py-1.5 rounded-full bg-info/15 text-info border border-info/30 text-xs font-semibold">
                Blockchain Sync Active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Details Modal */}
      <Modal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        title="Certificate Verification"
        size="lg"
      >
        {selectedCert && (
          <div className="space-y-6">
            {/* Header badge */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-mine-800/80 border border-mine-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-safety/10 border border-safety/30 flex items-center justify-center">
                  <Award className="w-6 h-6 text-safety" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedCert.scenarioTitle}</h3>
                  <span className="text-xs text-mine-400">SmartMine XR Official Safety Credential</span>
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-success bg-success/10 px-2.5 py-1 rounded-md border border-success/30">
                <CheckCircle className="w-3.5 h-3.5" /> Authenticated
              </span>
            </div>

            {/* Cert Data Fields */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-mine-950 rounded-lg border border-mine-800">
                <span className="text-xs text-mine-400 block">Recipient Worker</span>
                <span className="font-semibold text-white">{selectedCert.userName}</span>
              </div>
              <div className="p-3 bg-mine-950 rounded-lg border border-mine-800">
                <span className="text-xs text-mine-400 block">Evaluation Score</span>
                <span className="font-bold text-safety font-mono text-base">{selectedCert.score}%</span>
              </div>
              <div className="p-3 bg-mine-950 rounded-lg border border-mine-800">
                <span className="text-xs text-mine-400 block">Date Completed</span>
                <span className="text-mine-200">{new Date(selectedCert.completedAt).toLocaleDateString()}</span>
              </div>
              <div className="p-3 bg-mine-950 rounded-lg border border-mine-800">
                <span className="text-xs text-mine-400 block">Certificate ID</span>
                <span className="font-mono text-mine-200 text-xs">{selectedCert.certificateId}</span>
              </div>
            </div>

            {/* Simulated Cryptographic Hash */}
            <div className="p-4 bg-mine-950 rounded-lg border border-mine-800">
              <div className="flex items-center justify-between text-xs text-mine-400 mb-1.5">
                <span className="flex items-center gap-1"><QrCode className="w-3.5 h-3.5 text-safety" /> Cryptographic Fingerprint (SHA-256)</span>
                <span className="text-[10px] text-mine-500 font-mono">Immutable</span>
              </div>
              <code className="text-[11px] text-mine-300 font-mono break-all block">
                0x8f2d4e7b91c3a650d2f8e1b4c7a90f23e4d56789abcdef0123456789abcdef01
              </code>
            </div>

            {downloadSuccess && (
              <div className="p-3 rounded-lg bg-success/15 border border-success/30 text-success text-xs font-semibold flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" /> Download started: {selectedCert.certificateId}.pdf
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2 border-t border-mine-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCert(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<Download className="w-4 h-4" />}
                onClick={handleDownloadPDF}
              >
                Download PDF
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </PageWrapper>
  );
}
