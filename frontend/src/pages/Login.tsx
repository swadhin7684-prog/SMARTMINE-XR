import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HardHat, Lock, Mail, ArrowRight, AlertCircle, KeyRound } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const ok = await login(email, password);
      if (ok) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid credentials. Please verify your email and password.');
      }
    } catch {
      setError('An error occurred during authentication. Please retry.');
    }
  };

  const handleFillDemo = () => {
    setEmail('alex.mitchell@miningcorp.com');
    setPassword('SafetyFirst2026!');
    setError(null);
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
            <h1 className="text-2xl font-bold text-white mb-1.5">Worker Authentication</h1>
            <p className="text-xs text-mine-400">
              Access your VR training scenarios, telemetry, and safety credentials
            </p>
          </div>

          {/* Login Card */}
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
                  Worker Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="worker@miningcorp.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-mine-950 border border-mine-700 text-white placeholder-mine-500 focus:outline-none focus:border-safety text-sm transition-colors"
                  />
                  <Mail className="w-4 h-4 text-mine-500 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-mine-300">
                    Access Password
                  </label>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset simulation link dispatched to registered email.'); }} className="text-xs text-safety hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-mine-950 border border-mine-700 text-white placeholder-mine-500 focus:outline-none focus:border-safety text-sm transition-colors"
                  />
                  <Lock className="w-4 h-4 text-mine-500 absolute left-3.5 top-3" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-mine-400 py-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-mine-950 border-mine-700 text-safety focus:ring-0"
                  />
                  <span>Remember my session</span>
                </label>
              </div>

              <Button
                type="submit"
                fullWidth
                size="md"
                disabled={isLoading}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {isLoading ? 'Authenticating...' : 'Sign In to Portal'}
              </Button>
            </form>

            {/* Demo Account Helper */}
            <div className="mt-6 pt-5 border-t border-mine-700/80">
              <button
                type="button"
                onClick={handleFillDemo}
                className="w-full py-2.5 px-3 rounded-lg bg-mine-800/80 hover:bg-mine-800 border border-mine-600 text-xs font-semibold text-safety flex items-center justify-center gap-2 transition-colors"
              >
                <KeyRound className="w-3.5 h-3.5" />
                Click to Auto-Fill Demo Worker Credentials
              </button>
            </div>
          </div>

          {/* Footer Link */}
          <p className="text-center text-xs text-mine-400 mt-6">
            Don't have a safety credentials account?{' '}
            <Link to="/register" className="text-safety font-semibold hover:underline">
              Register New Worker
            </Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
