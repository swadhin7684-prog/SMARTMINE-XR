import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TrainingProvider } from './context/TrainingContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Training from './pages/Training';
import ScenarioDetail from './pages/ScenarioDetail';
import VRSetup from './pages/VRSetup';
import TrainingSession from './pages/TrainingSession';
import TrainingResult from './pages/TrainingResult';
import Content from './pages/Content';
import Product from './pages/Product';
import Plans from './pages/Plans';
import Support from './pages/Support';
import Dashboard from './pages/Dashboard';
import Certificates from './pages/Certificates';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TrainingProvider>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-mine-950 text-white selection:bg-safety selection:text-mine-950">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Marketing & Educational Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/training" element={<Training />} />
                <Route path="/scenario/:id" element={<ScenarioDetail />} />
                <Route path="/vr-setup/:id" element={<VRSetup />} />
                <Route path="/training-session/:id" element={<TrainingSession />} />
                <Route path="/training-result/:id" element={<TrainingResult />} />
                <Route path="/content" element={<Content />} />
                <Route path="/product" element={<Product />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/support" element={<Support />} />

                {/* Authentication Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Worker & Enterprise Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/certificates"
                  element={
                    <ProtectedRoute>
                      <Certificates />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </TrainingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
