import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Award,
  Clock,
  Play,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import DashboardCard from '../components/cards/DashboardCard';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import { scenarios, mockTrainingHistory, mockUser } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const currentUser = user || mockUser;

  // Next recommended scenario is the first one or gas-leak
  const nextScenario = scenarios[0];

  return (
    <PageWrapper>
      <section className="section-padding">
        <div className="section-container">
          {/* Welcome Banner */}
          <div className="card-base p-8 mb-10 bg-gradient-to-r from-mine-900 via-mine-850 to-mine-900 border-mine-700 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-safety/15 border border-safety/30 text-safety text-xs font-bold uppercase tracking-wider">
                    {currentUser.subscription?.plan?.toUpperCase()} PLAN ACTIVE
                  </span>
                  <span className="text-xs text-mine-400 capitalize">Role: {currentUser.role}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Welcome back, <span className="text-safety">{currentUser.name}</span>
                </h1>
                <p className="text-sm text-mine-300">
                  Worker ID: <span className="font-mono text-mine-200">{currentUser.id}</span> • Mine Safety Certified Status: <span className="text-success font-semibold">Good Standing</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  size="sm"
                  icon={<Play className="w-4 h-4" />}
                  onClick={() => navigate(`/scenario/${nextScenario.id}`)}
                >
                  START NEXT DRILL
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/certificates')}
                >
                  VIEW CERTIFICATES
                </Button>
              </div>
            </div>
          </div>

          {/* Metric Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <DashboardCard
              title="Training Progress"
              value={`${currentUser.trainingProgress}%`}
              icon={TrendingUp}
              subtitle="Syllabus compliance target met"
              color="safety"
            />
            <DashboardCard
              title="Average Score"
              value={`${currentUser.averageScore}%`}
              icon={ShieldCheck}
              subtitle="Across all scenario iterations"
              color="success"
            />
            <DashboardCard
              title="Completed Sessions"
              value={currentUser.completedSessions}
              icon={Clock}
              subtitle="Simulated drill operations"
              color="info"
            />
            <DashboardCard
              title="Active Certificates"
              value={currentUser.certificateCount}
              icon={Award}
              subtitle="Cryptographically verified"
              color="safety"
            />
          </div>

          {/* Continue Training & Progress Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Recommended Next Drill */}
            <div className="card-base p-7 lg:col-span-2 border-mine-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Play className="w-5 h-5 text-safety" /> Recommended Drill
                </h2>
                <span className="badge-coming-soon">Coming Soon</span>
              </div>

              <div className="p-5 rounded-xl bg-mine-800/80 border border-mine-700 mb-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{nextScenario.title}</h3>
                    <p className="text-xs text-mine-400 mt-1">{nextScenario.category} • {nextScenario.duration} • {nextScenario.difficulty}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => navigate(`/scenario/${nextScenario.id}`)}
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Open Scenario
                  </Button>
                </div>
                <p className="text-sm text-mine-300 leading-relaxed">
                  {nextScenario.shortDescription}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-mine-400 font-semibold">
                  <span>Quarterly Safety Progress</span>
                  <span>{currentUser.trainingProgress}% (Target: 80%)</span>
                </div>
                <ProgressBar progress={currentUser.trainingProgress} color="safety" />
              </div>
            </div>

            {/* Safety Compliance Summary */}
            <div className="card-base p-7 lg:col-span-1 flex flex-col justify-between border-mine-700">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Safety Status</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2.5 text-mine-200">
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                    <span>MSHA Part 48 compliance current</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-mine-200">
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                    <span>Atmospheric monitoring passed</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-mine-200">
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                    <span>Emergency egress drill validated</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-mine-700">
                <Button
                  variant="outline"
                  fullWidth
                  size="sm"
                  onClick={() => navigate('/profile')}
                >
                  Manage Profile & Plan
                </Button>
              </div>
            </div>
          </div>

          {/* Recent Training History Table */}
          <div className="card-base p-8 border-mine-700 overflow-x-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Recent Training Sessions</h2>
                <p className="text-xs text-mine-400 mt-1">Audit log of completed practical simulation drills</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/training')}>
                Explore All Scenarios
              </Button>
            </div>

            <table className="w-full text-left text-sm border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-mine-700 text-mine-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Scenario Drill</th>
                  <th className="pb-3 font-semibold">Date Completed</th>
                  <th className="pb-3 font-semibold">Evaluation Score</th>
                  <th className="pb-3 font-semibold">Outcome</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mine-800 text-mine-200">
                {mockTrainingHistory.map((item) => {
                  const score = item.score?.overall || 85;
                  const isPass = score >= 70;
                  return (
                    <tr key={item.id} className="hover:bg-mine-800/40 transition-colors">
                      <td className="py-4 font-medium text-white">
                        {item.scenarioTitle}
                      </td>
                      <td className="py-4 text-xs text-mine-400 flex items-center gap-1.5 pt-4.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(item.completedAt || item.startedAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 font-mono font-bold text-safety">
                        {score}%
                      </td>
                      <td className="py-4">
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isPass
                              ? 'bg-success/15 text-success border border-success/30'
                              : 'bg-danger/15 text-danger border border-danger/30'
                          }`}
                        >
                          {isPass ? 'Passed' : 'Review Required'}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => navigate(`/training-result/${item.scenarioId}`)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-mine-300 hover:text-safety transition-colors"
                        >
                          View Results <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
