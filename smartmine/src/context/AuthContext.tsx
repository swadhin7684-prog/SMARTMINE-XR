import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {
  signInWithEmailAndPassword,
  signInWithCustomToken,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { User, Subscription, PlanType } from '../types';
import { mockUser } from '../data/mockData';
import {
  api,
  setToken,
  removeToken,
  USER_STORAGE_KEY,
  formatUserFromBackend,
} from '../lib/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  activatePlan: (plan: PlanType) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const persistUser = (u: User) => {
    setUser(u);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(u));
  };

  // Sync with Firebase Auth state
  useEffect(() => {
    // Initial cache restore for instant UI load
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          setToken(idToken);

          // Fetch profile document from Cloud Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userSnapshot = await getDoc(userDocRef);

          if (userSnapshot.exists()) {
            const profile = formatUserFromBackend({
              id: firebaseUser.uid,
              ...userSnapshot.data(),
            });
            persistUser(profile);
          } else {
            // Profile doc doesn't exist yet, initialize it in Firestore
            const now = new Date().toISOString();
            const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            const newProfileData = {
              id: firebaseUser.uid,
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || 'Worker',
              email: firebaseUser.email || '',
              role: 'worker',
              trainingProgress: 0,
              completedSessions: 0,
              averageScore: 0,
              certificateCount: 0,
              subscription: {
                plan: 'free',
                status: 'active',
                startDate: now.split('T')[0],
                endDate,
              },
              createdAt: now,
              updatedAt: now,
            };
            await setDoc(userDocRef, newProfileData);
            persistUser(formatUserFromBackend(newProfileData));
          }
        } catch (error) {
          console.warn('Error fetching Firestore user profile:', error);
        }
      } else {
        // Not logged in with Firebase Client Auth
        const currentToken = localStorage.getItem('smartmine_token');
        if (!currentToken) {
          setUser(null);
          localStorage.removeItem(USER_STORAGE_KEY);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // 1. Try Firebase Client SDK direct authentication
      try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCred.user.getIdToken();
        setToken(idToken);
        setIsLoading(false);
        return true;
      } catch (clientAuthError: any) {
        // If client-side failed, attempt through backend Admin SDK
        const { token, user: authedUser } = await api.auth.login(email, password);
        setToken(token);
        persistUser(authedUser);

        // Sign in client with custom token if available
        try {
          await signInWithCustomToken(auth, token);
        } catch {
          // Custom token signing optional for backend session
        }

        setIsLoading(false);
        return true;
      }
    } catch (err: any) {
      setIsLoading(false);
      throw new Error(err.message || 'Invalid email or password');
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Register through backend which uses Firebase Admin SDK to create Auth account and Firestore doc
      const { token, user: newUser } = await api.auth.register(name, email, password);
      setToken(token);
      persistUser(newUser);

      // Sign into Firebase Client SDK via the minted custom token
      try {
        await signInWithCustomToken(auth, token);
      } catch (tokenErr) {
        console.warn('Client custom token sign-in error:', tokenErr);
      }

      setIsLoading(false);
      return true;
    } catch (err: any) {
      setIsLoading(false);
      throw new Error(err.message || 'Failed to register account');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
    removeToken();
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    if (!user) return;
    const updated = { ...user, ...updates };
    persistUser(updated);

    try {
      if (auth.currentUser) {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userDocRef, { ...updates, updatedAt: new Date().toISOString() }, { merge: true });
      } else {
        await api.user.updateProfile({
          name: updates.name,
          email: updates.email,
          avatar: updates.avatar,
        });
      }
    } catch (err) {
      console.warn('Could not sync profile update with Firestore:', err);
    }
  };

  const activatePlan = async (plan: PlanType): Promise<void> => {
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

    try {
      if (auth.currentUser) {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userDocRef, { subscription: sub, updatedAt: now.toISOString() }, { merge: true });
      } else {
        await api.subscriptions.activate(plan);
      }
    } catch (err) {
      console.warn('Could not sync subscription with Firestore:', err);
    }
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
