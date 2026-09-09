import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User as UserIcon,
  Mail,
  Shield,
  CreditCard,
  CheckCircle,
  Save,
  Award,
  Clock,
  TrendingUp,
  LogOut,
  Bell,
  Glasses,
} from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { mockUser } from '../data/mockData';

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const currentUser = user || mockUser;

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [haptics, setHaptics] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <PageWrapper>
      <section className="section-padding">
        <div className="section-container max-w-4xl">
          {/* Header */}
          <div className="mb-10">
            <h1 className="section-title mb-2">Worker Profile & Settings</h1>
            <p className="section-subtitle">
              Manage your identity credentials, active subscription licensing, and VR hardware preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Profile Card & Quick Stats */}
            <div className="space-y-6 lg:col-span-1">
              {/* Profile Card */}
              <div className="card-base p-6 text-center border-mine-700">
                <div className="w-20 h-20 rounded-full bg-safety/20 border-2 border-safety/40 flex items-center justify-center mx-auto mb-4">
                  <UserIcon className="w-10 h-10 text-safety" />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{currentUser.name}</h2>
                <p className="text-xs text-mine-400 font-mono mb-3">{currentUser.email}</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-safety/10 border border-safety/30 text-safety text-xs font-bold uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5" /> {currentUser.role}
                </div>
              </div>

              {/* Training Summary Stats */}
              <div className="card-base p-6 border-mine-700 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-mine-400">
                  Career Record
                </h3>
                <div className="flex items-center justify-between text-sm py-2 border-b border-mine-800">
                  <span className="text-mine-400 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-safety" /> Overall Progress
                  </span>
                  <span className="font-bold text-white">{currentUser.trainingProgress}%</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2 border-b border-mine-800">
                  <span className="text-mine-400 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-info" /> Completed Drills
                  </span>
                  <span className="font-bold text-white">{currentUser.completedSessions}</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2">
                  <span className="text-mine-400 flex items-center gap-2">
                    <Award className="w-4 h-4 text-safety" /> Certificates
                  </span>
                  <span className="font-bold text-safety">{currentUser.certificateCount}</span>
                </div>
              </div>

              {/* Logout button */}
              <Button
                variant="ghost"
                fullWidth
                icon={<LogOut className="w-4 h-4" />}
                onClick={handleLogout}
              >
                Log Out of Platform
              </Button>
            </div>

            {/* Right Column: Edit Profile & Subscription & Settings */}
            <div className="space-y-8 lg:col-span-2">
              {/* Subscription Card */}
              <div className="card-base p-7 border-mine-700 bg-gradient-to-br from-mine-850 to-mine-900">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-safety">
                      Active Subscription
                    </span>
                    <h3 className="text-2xl font-bold text-white capitalize mt-0.5">
                      {currentUser.subscription?.plan || 'Free'} Plan
                    </h3>
                  </div>
                  <span className="self-start sm:self-auto px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-success/15 text-success border border-success/30 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" /> Active Status
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-mine-300 py-3 border-y border-mine-700/60 mb-5">
                  <div>
                    <span className="text-mine-400 block mb-1">Billing Term Start</span>
                    <span className="font-medium text-white">{currentUser.subscription?.startDate || '2026-08-01'}</span>
                  </div>
                  <div>
                    <span className="text-mine-400 block mb-1">Renewal / Expiry Date</span>
                    <span className="font-medium text-white">{currentUser.subscription?.endDate || '2027-01-01'}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs text-mine-400">
                    Unlimited simulation repetitions, full telemetric breakdown, and certificates enabled.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    icon={<CreditCard className="w-4 h-4" />}
                    onClick={() => navigate('/plans')}
                  >
                    Upgrade / Change Plan
                  </Button>
                </div>
              </div>

              {/* Edit Information Form */}
              <div className="card-base p-7 border-mine-700">
                <h3 className="text-lg font-bold text-white mb-4">Personal Information</h3>

                {saveSuccess && (
                  <div className="mb-4 p-3 rounded-lg bg-success/15 border border-success/30 text-success text-xs font-semibold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Profile details updated successfully!
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-mine-300 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-mine-950 border border-mine-700 text-white focus:outline-none focus:border-safety text-sm transition-colors"
                      />
                      <UserIcon className="w-4 h-4 text-mine-500 absolute left-3.5 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-mine-300 mb-1.5">
                      Work Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-mine-950 border border-mine-700 text-white focus:outline-none focus:border-safety text-sm transition-colors"
                      />
                      <Mail className="w-4 h-4 text-mine-500 absolute left-3.5 top-3" />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button type="submit" size="sm" icon={<Save className="w-4 h-4" />}>
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>

              {/* VR Simulation Preferences */}
              <div className="card-base p-7 border-mine-700 space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">Simulation Preferences</h3>

                <div className="flex items-center justify-between py-3 border-b border-mine-800">
                  <div className="flex items-start gap-3">
                    <Glasses className="w-5 h-5 text-safety mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-white block">Controller Haptic Feedback</span>
                      <span className="text-xs text-mine-400">Vibration pulses when approaching virtual machinery hazards</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHaptics(!haptics)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      haptics ? 'bg-safety' : 'bg-mine-700'
                    }`}
                  >
                    <div
                      className={`bg-mine-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        haptics ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-safety mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-white block">Safety Drill Notifications</span>
                      <span className="text-xs text-mine-400">Quarterly recertification reminders and new scenario alerts</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotifications(!notifications)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      notifications ? 'bg-safety' : 'bg-mine-700'
                    }`}
                  >
                    <div
                      className={`bg-mine-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        notifications ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
