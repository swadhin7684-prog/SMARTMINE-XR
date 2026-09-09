import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, Subscription, PlanType } from '../types';
import { mockUser } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  activatePlan: (plan: PlanType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('smartmine_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('smartmine_user');
      }
    }
    setIsLoading(false);
  }, []);

  const persistUser = (u: User) => {
    setUser(u);
    localStorage.setItem('smartmine_user', JSON.stringify(u));
  };

  const login = async (email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    const loggedInUser: User = {
      ...mockUser,
      email,
    };
    persistUser(loggedInUser);
    setIsLoading(false);
    return true;
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const now = new Date().toISOString();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name,
      email,
      role: 'worker',
      createdAt: now,
      subscription: {
        plan: 'free',
        status: 'active',
        startDate: now.split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      },
      trainingProgress: 0,
      completedSessions: 0,
      averageScore: 0,
      certificateCount: 0,
    };
    persistUser(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartmine_user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      persistUser(updated);
    }
  };

  const activatePlan = (plan: PlanType) => {
    if (!user) return;
    const now = new Date();
    const end = new Date();
    if (plan === 'free') end.setMonth(end.getMonth() + 1);
    else if (plan === 'monthly') end.setMonth(end.getMonth() + 1);
    else if (plan === 'five-month') end.setMonth(end.getMonth() + 5);
    else if (plan === 'pro') end.setFullYear(end.getFullYear() + 1);

    const sub: Subscription = {
      plan,
      status: 'active',
      startDate: now.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
    };
    const updated = { ...user, subscription: sub };
    persistUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        activatePlan,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
