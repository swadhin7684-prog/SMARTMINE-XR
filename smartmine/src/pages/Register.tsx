import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HardHat, Lock, Mail, User, ArrowRight, AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreed) {
      setError('You must accept the safety training terms of service.');
      return;
    }

    try {
      const ok = await register(name, email, password);
      if (ok) {
        navigate('/dashboard');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred during registration.');
    }
  };

  return (
    <PageWrapper noPadding>
      <div className="min-h-screen flex items-center justify-center py-16 px-4 relative">
        <div className="w-full max-w-md">
          {/* Logo & Headline */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-11 h-11 bg-safety rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(240,200,0,0.3)]">
                <HardHat className="w-6 h-6 text-mine-950" />
              </div>
              <div className="text-left leading-none">
                <span className="text-base font-bold tracking-wider text-white block">SMARTMINE</span>
                <span className="text-xs font-bold tracking-[0.3em] text-safety">XR</span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-1.5">New Worker Enrollment</h1>
            <p className="text-xs text-mine-400">
              Create your training profile and begin certified simulation drills
            </p>
          </div>

          {/* Trial banner */}
          <div className="mb-6 p-3.5 rounded-xl bg-safety/10 border border-safety/30 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-safety flex-shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">Automatic 1-Month FREE Access</span>
              <span className="text-mine-300">Registration includes immediate access to 2 VR scenarios.</span>
            </div>
          </div>

          {/* Card */}
          <div className="card-base p-8 border-mine-700 shadow-2xl">
            {error && (
              <div className="mb-5 p-3 rounded-lg bg-danger/15 border border-danger/30 text-danger text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-mine-300 mb-1.5">
                  Worker Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jordan Hayes"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-mine-950 border border-mine-700 text-white placeholder-mine-500 focus:outline-none focus:border-safety text-sm transition-colors"
                  />
                  <User className="w-4 h-4 text-mine-500 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-mine-300 mb-1.5">
                  Work / Personal Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan.hayes@miningcorp.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-mine-950 border border-mine-700 text-white placeholder-mine-500 focus:outline-none focus:border-safety text-sm transition-colors"
                  />
                  <Mail className="w-4 h-4 text-mine-500 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-mine-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-mine-950 border border-mine-700 text-white placeholder-mine-500 focus:outline-none focus:border-safety text-sm transition-colors"
                  />
                  <Lock className="w-4 h-4 text-mine-500 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-mine-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-mine-950 border border-mine-700 text-white placeholder-mine-500 focus:outline-none focus:border-safety text-sm transition-colors"
                  />
                  <Lock className="w-4 h-4 text-mine-500 absolute left-3.5 top-3" />
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-mine-300 leading-normal">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded bg-mine-950 border-mine-700 text-safety focus:ring-0"
                  />
                  <span>
                    I acknowledge that VR training supplements, but does not replace, required on-site statutory mine safety protocol.
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                fullWidth
                size="md"
                disabled={isLoading}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {isLoading ? 'Creating Safety Profile...' : 'Complete Enrollment'}
              </Button>
            </form>
          </div>

          {/* Footer Link */}
          <p className="text-center text-xs text-mine-400 mt-6">
            Already have an active account?{' '}
            <Link to="/login" className="text-safety font-semibold hover:underline">
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
