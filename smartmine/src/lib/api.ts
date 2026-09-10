import type { User, PlanType, Scenario, TrainingSession, Certificate } from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || '';

export const TOKEN_STORAGE_KEY = 'smartmine_token';
export const USER_STORAGE_KEY = 'smartmine_user';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export interface ApiErrorResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export class ApiError extends Error {
  status: number;
  data?: ApiErrorResponse;

  constructor(status: number, message: string, data?: ApiErrorResponse) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const token = getToken();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (networkError) {
    throw new ApiError(0, 'Unable to connect to SmartMine backend. Please check network connection.', {
      success: false,
      message: networkError instanceof Error ? networkError.message : 'Network error',
    });
  }

  let data: any;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMsg =
      (typeof data === 'object' && data?.message) ||
      (typeof data === 'object' && data?.error) ||
      `Request failed with status ${response.status}`;
    throw new ApiError(response.status, errorMsg, data);
  }

  return data as T;
}

// Convert backend user object format (_id vs id, dates, defaults) to frontend User
export function formatUserFromBackend(raw: any): User {
  if (!raw) throw new Error('Cannot format null user');

  const now = new Date().toISOString();
  const defaultEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const sub = raw.subscription || {};
  const formattedSub = {
    plan: (sub.plan as PlanType) || 'free',
    status: (sub.status as 'active' | 'expired' | 'cancelled') || 'active',
    startDate: sub.startDate ? (typeof sub.startDate === 'string' ? sub.startDate.split('T')[0] : new Date(sub.startDate).toISOString().split('T')[0]) : now.split('T')[0],
    endDate: sub.endDate ? (typeof sub.endDate === 'string' ? sub.endDate.split('T')[0] : new Date(sub.endDate).toISOString().split('T')[0]) : defaultEnd,
  };

  return {
    id: raw.id || raw._id || 'usr-' + Date.now(),
    name: raw.name || 'Worker',
    email: raw.email || '',
    role: raw.role || 'worker',
    avatar: raw.avatar,
    createdAt: raw.createdAt ? new Date(raw.createdAt).toISOString() : now,
    subscription: formattedSub,
    trainingProgress: typeof raw.trainingProgress === 'number' ? raw.trainingProgress : 0,
    completedSessions: typeof raw.completedSessions === 'number' ? raw.completedSessions : 0,
    averageScore: typeof raw.averageScore === 'number' ? raw.averageScore : 0,
    certificateCount: typeof raw.certificateCount === 'number' ? raw.certificateCount : 0,
  };
}

export const api = {
  auth: {
    login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
      const data = await request<{ success: boolean; token: string; user: any }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      return {
        token: data.token,
        user: formatUserFromBackend(data.user),
      };
    },

    register: async (name: string, email: string, password: string, role = 'worker'): Promise<{ token: string; user: User }> => {
      const data = await request<{ success: boolean; token: string; user: any }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role }),
      });
      return {
        token: data.token,
        user: formatUserFromBackend(data.user),
      };
    },

    me: async (): Promise<User> => {
      const data = await request<{ success: boolean; user: any }>('/api/users/me', {
        method: 'GET',
      });
      return formatUserFromBackend(data.user);
    },
  },

  user: {
    getProfile: async (): Promise<User> => {
      const data = await request<{ success: boolean; user: any }>('/api/users/me', {
        method: 'GET',
      });
      return formatUserFromBackend(data.user);
    },

    updateProfile: async (updates: { name?: string; email?: string; avatar?: string }): Promise<User> => {
      const data = await request<{ success: boolean; user: any }>('/api/users/me', {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      return formatUserFromBackend(data.user);
    },
  },

  subscriptions: {
    getCurrent: async () => {
      return request<{ success: boolean; subscription: any }>('/api/subscriptions/current', {
        method: 'GET',
      });
    },

    activate: async (plan: PlanType) => {
      return request<{ success: boolean; message: string; subscription: any }>('/api/subscriptions/activate', {
        method: 'POST',
        body: JSON.stringify({ plan }),
      });
    },
  },

  scenarios: {
    getAll: async (): Promise<Scenario[]> => {
      const data = await request<{ success: boolean; scenarios: any[] }>('/api/scenarios', {
        method: 'GET',
      });
      return (data.scenarios || []).map((s) => ({
        id: s.slug || s._id || s.id,
        title: s.title,
        description: s.description,
        shortDescription: s.shortDescription || s.description?.slice(0, 100),
        difficulty: s.difficulty || 'Intermediate',
        duration: s.duration || '15 min',
        status: s.status || 'coming-soon',
        category: s.category || 'General',
        icon: s.icon || 'shield',
        hazards: s.hazards || [],
        learningObjectives: s.learningObjectives || [],
        vrRequirements: s.vrRequirements || [],
        introVideoUrl: s.introVideoUrl,
      }));
    },

    getById: async (id: string): Promise<Scenario> => {
      const data = await request<{ success: boolean; scenario: any }>(`/api/scenarios/${id}`, {
        method: 'GET',
      });
      const s = data.scenario;
      return {
        id: s.slug || s._id || s.id,
        title: s.title,
        description: s.description,
        shortDescription: s.shortDescription || s.description?.slice(0, 100),
        difficulty: s.difficulty || 'Intermediate',
        duration: s.duration || '15 min',
        status: s.status || 'coming-soon',
        category: s.category || 'General',
        icon: s.icon || 'shield',
        hazards: s.hazards || [],
        learningObjectives: s.learningObjectives || [],
        vrRequirements: s.vrRequirements || [],
        introVideoUrl: s.introVideoUrl,
      };
    },
  },

  training: {
    start: async (scenarioId: string, scenarioTitle: string) => {
      return request<{ success: boolean; session: TrainingSession }>('/api/training/start', {
        method: 'POST',
        body: JSON.stringify({ scenarioId, scenarioTitle }),
      });
    },

    complete: async (sessionId: string, score: number, passed: boolean) => {
      return request<{ success: boolean; session: TrainingSession; certificate?: Certificate }>(
        `/api/training/${sessionId}/complete`,
        {
          method: 'PUT',
          body: JSON.stringify({ score, passed }),
        }
      );
    },

    getHistory: async () => {
      return request<{ success: boolean; history: TrainingSession[] }>('/api/training/history', {
        method: 'GET',
      });
    },
  },

  certificates: {
    getAll: async () => {
      return request<{ success: boolean; certificates: Certificate[] }>('/api/certificates', {
        method: 'GET',
      });
    },

    verify: async (certificateId: string) => {
      return request<{ success: boolean; certificate: Certificate }>(
        `/api/certificates/${certificateId}/verify`,
        {
          method: 'GET',
        }
      );
    },
  },

  health: async () => {
    return request<{ status: string; timestamp: string; environment: string; database: { connected: boolean; state: string } }>(
      '/api/health',
      {
        method: 'GET',
      }
    );
  },
};
