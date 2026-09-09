import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, BookOpen, ShieldCheck, ArrowRight, Download, FileText, CheckCircle } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import VideoCard from '../components/cards/VideoCard';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { videoContent } from '../data/mockData';
import type { VideoContent } from '../types';

const categories = ['All', 'Training Videos', 'Safety Guides', 'Learning Resources'];

const safetyManuals = [
  {
    title: 'Mine Safety & Health Administration (MSHA) Standards Guide 2026',
    format: 'PDF (4.2 MB)',
    category: 'Regulatory',
  },
  {
    title: 'Hazardous Gas Detection & Ventilation Protocol v3.4',
    format: 'PDF (2.8 MB)',
    category: 'Operational',
  },
  {
    title: 'Lockout / Tagout (LOTO) Heavy Equipment Checklist',
    format: 'PDF (1.5 MB)',
    category: 'Inspection',
  },
  {
    title: 'Underground Emergency Evacuation & Rescue Coordination Manual',
    format: 'PDF (5.1 MB)',
    category: 'Emergency',
  },
];

export default function Content() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState<VideoContent | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const filteredVideos =
    selectedCategory === 'All'
      ? videoContent
      : videoContent.filter((v) => v.category === selectedCategory);

  const handleDownload = (title: string) => {
    setDownloadSuccess(title);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <PageWrapper>
      <section className="section-padding">
        <div className="section-container">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-safety/10 border border-safety/30 text-safety text-xs font-bold uppercase tracking-wider mb-4">
              <BookOpen className="w-4 h-4" /> Safety Knowledge Base
            </div>
            <h1 className="section-title mb-4">Training Content & Guides</h1>
            <p className="section-subtitle">
              Review scenario primers, equipment safety standards, and operational guidelines before entering virtual reality training.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-mine-800 pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-safety text-mine-950 shadow-[0_0_15px_rgba(240,200,0,0.3)]'
                    : 'bg-mine-800/80 text-mine-300 hover:text-white hover:bg-mine-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <AnimatePresence>
              {filteredVideos.map((video) => (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <VideoCard video={video} onPlay={(v) => setActiveVideo(v)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Safety Documents & Manuals Section */}
          <div className="card-base p-8 mb-16 border-mine-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-safety" /> Safety Reference Documentation
                </h2>
                <p className="text-sm text-mine-400 mt-1">
                  Official industrial field guides and pre-drill reference material
                </p>
              </div>
              {downloadSuccess && (
                <div className="flex items-center gap-2 text-xs font-semibold text-success bg-success/10 border border-success/30 px-3 py-1.5 rounded-lg animate-fadeIn">
                  <CheckCircle className="w-4 h-4" /> Download started: {downloadSuccess}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {safetyManuals.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl bg-mine-800/60 border border-mine-700/60 hover:border-mine-600 transition-colors"
                >
                  <div className="pr-4">
                    <span className="text-[11px] font-bold text-safety tracking-wider uppercase">
                      {doc.category}
                    </span>
                    <h4 className="text-sm font-semibold text-mine-100 mt-0.5">{doc.title}</h4>
                    <span className="text-xs text-mine-400">{doc.format}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Download className="w-4 h-4" />}
                    onClick={() => handleDownload(doc.title)}
                  >
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-mine-900 via-mine-800 to-mine-900 border border-safety/30 p-8 md:p-12 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <ShieldCheck className="w-12 h-12 text-safety mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Ready to Put Knowledge into Action?
              </h2>
              <p className="text-mine-300 mb-8">
                Theoretical preparation is critical, but immersive muscle memory saves lives. Enter the VR simulation scenarios now.
              </p>
              <Button
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                onClick={() => navigate('/training')}
              >
                ENTER VR TRAINING
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      <Modal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        title={activeVideo?.title || 'Training Video'}
        size="xl"
      >
        <div className="space-y-4">
          <div className="aspect-video bg-mine-950 rounded-xl border border-mine-700 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-safety/20 border border-safety/40 flex items-center justify-center mb-4 animate-pulse">
              <Play className="w-8 h-8 text-safety ml-1" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{activeVideo?.title}</h3>
            <p className="text-xs text-mine-400 max-w-md mb-2">{activeVideo?.description}</p>
            <span className="text-xs text-mine-500 font-mono">Duration: {activeVideo?.duration} • High Definition 1080p Stream</span>
          </div>
          <div className="flex justify-between items-center text-xs text-mine-400">
            <span>Category: <strong className="text-mine-200">{activeVideo?.category}</strong></span>
            <span>Subtitles: English / Spanish / Mandarin</span>
          </div>
        </div>
      </Modal>
    </PageWrapper>
  );
}
