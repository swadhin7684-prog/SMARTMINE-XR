import React, { useState } from 'react';
import {
  HelpCircle,
  Headphones,
  Mail,
  Phone,
  Monitor,
  Wifi,
  FileCheck,
  CreditCard,
  Send,
  CheckCircle,
  MessageSquare,
} from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import FAQAccordion from '../components/sections/FAQAccordion';
import Button from '../components/ui/Button';
import { faqItems } from '../data/mockData';

const helpCategories = [
  {
    icon: Monitor,
    title: 'VR Hardware Setup Guide',
    desc: 'Calibrate your headset IPD, guardian play space (minimum 2m x 2m), and controller tracking.',
  },
  {
    icon: Wifi,
    title: 'Connection & Latency Fixes',
    desc: 'Troubleshoot WebXR browser flags, Oculus Link cable bandwidth, and Wi-Fi 6 streaming.',
  },
  {
    icon: FileCheck,
    title: 'Scenarios & Retake Rules',
    desc: 'Understand evaluation criteria, safety decision weights, and how certificates are issued.',
  },
  {
    icon: CreditCard,
    title: 'Billing & Enterprise Seats',
    desc: 'Manage company subscriptions, bulk worker seat licensing, and invoice management.',
  },
];

export default function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Technical Support',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        category: 'Technical Support',
        subject: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <PageWrapper>
      <section className="section-padding">
        <div className="section-container">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-safety/10 border border-safety/30 text-safety text-xs font-bold uppercase tracking-wider mb-4">
              <Headphones className="w-4 h-4" /> 24/7 Safety Support Desk
            </div>
            <h1 className="section-title mb-4">How Can We Help You?</h1>
            <p className="section-subtitle mx-auto">
              Access setup walkthroughs, hardware troubleshooting, or connect directly with our VR training technical team.
            </p>
          </div>

          {/* Quick Help Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {helpCategories.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="card-base p-6 hover:border-safety/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-safety/10 border border-safety/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-safety" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-mine-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 flex items-center justify-center gap-2">
                <HelpCircle className="w-7 h-7 text-safety" /> Frequently Asked Questions
              </h2>
              <p className="text-sm text-mine-400">
                Quick answers to common questions regarding hardware, simulation mechanics, and platform access.
              </p>
            </div>
            <FAQAccordion items={faqItems} />
          </div>

          {/* Contact Support Form & Direct Channels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Contact Channels Info */}
            <div className="card-base p-8 space-y-6 lg:col-span-1">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Direct Technical Support</h3>
                <p className="text-xs text-mine-400">
                  Our engineering and safety specialist response desk is available around the clock for operational emergencies.
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-mine-800 border border-mine-700 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-safety" />
                  </div>
                  <div>
                    <span className="block text-xs text-mine-400">Email Inquiries</span>
                    <a href="mailto:support@smartmine-xr.com" className="font-semibold text-mine-200 hover:text-safety transition-colors">
                      support@smartmine-xr.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-mine-800 border border-mine-700 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-safety" />
                  </div>
                  <div>
                    <span className="block text-xs text-mine-400">Emergency Safety Line</span>
                    <span className="font-semibold text-mine-200">+1 (800) 555-MINE</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-mine-800 border border-mine-700 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-safety" />
                  </div>
                  <div>
                    <span className="block text-xs text-mine-400">Live Web Chat</span>
                    <span className="text-xs text-success flex items-center gap-1 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" /> Support Agents Online
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-mine-700">
                <span className="text-xs text-mine-400 block mb-1">Operations Headquarters</span>
                <p className="text-xs text-mine-300">
                  SmartMine XR Tech Systems<br />
                  450 Mineral Way, Industrial Park<br />
                  Denver, CO 80202
                </p>
              </div>
            </div>

            {/* Support Message Form */}
            <div className="card-base p-8 lg:col-span-2">
              <h3 className="text-lg font-bold text-white mb-2">Submit Support Ticket</h3>
              <p className="text-xs text-mine-400 mb-6">
                Fill out the technical diagnostic form below and our simulation engineers will respond within 2 business hours.
              </p>

              {submitted ? (
                <div className="p-8 rounded-xl bg-success/10 border border-success/30 text-center space-y-3 animate-fadeIn">
                  <CheckCircle className="w-12 h-12 text-success mx-auto" />
                  <h4 className="text-lg font-bold text-white">Ticket Submitted Successfully</h4>
                  <p className="text-sm text-mine-300 max-w-md mx-auto">
                    Your inquiry has been assigned ticket ID <strong>#XR-{Math.floor(10000 + Math.random() * 90000)}</strong>. A confirmation email has been dispatched.
                  </p>
                  <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-mine-300 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Mitchell"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-mine-950 border border-mine-700 text-white placeholder-mine-500 focus:outline-none focus:border-safety text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-mine-300 mb-1.5">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@miningcorp.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-mine-950 border border-mine-700 text-white placeholder-mine-500 focus:outline-none focus:border-safety text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-mine-300 mb-1.5">
                        Issue Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-mine-950 border border-mine-700 text-white focus:outline-none focus:border-safety text-sm transition-colors"
                      >
                        <option value="Technical Support">VR Hardware & Setup</option>
                        <option value="Scenario Feedback">Scenario Logic & Hazards</option>
                        <option value="Account & Billing">Account & Subscriptions</option>
                        <option value="Enterprise Licensing">Enterprise Deployment</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-mine-300 mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g., Quest 3 WebXR link delay"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-mine-950 border border-mine-700 text-white placeholder-mine-500 focus:outline-none focus:border-safety text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-mine-300 mb-1.5">
                      Detailed Message / Diagnostic Notes
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe headset model, browser version, and observed behavior..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-mine-950 border border-mine-700 text-white placeholder-mine-500 focus:outline-none focus:border-safety text-sm transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    icon={<Send className="w-4 h-4" />}
                  >
                    {isSubmitting ? 'Submitting Ticket...' : 'Send Support Request'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
