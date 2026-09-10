import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

// Route Imports
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import scenarioRoutes from './routes/scenarios.js';
import trainingRoutes from './routes/training.js';
import certificateRoutes from './routes/certificates.js';
import subscriptionRoutes from './routes/subscriptions.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Track database connection state
let dbConnected = false;

// Parse CORS origins from env (comma-separated)
function getAllowedOrigins(): string[] {
  const envOrigin = process.env.CORS_ORIGIN || '';
  const origins = envOrigin
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  const devOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    'http://localhost:4173',
    'http://localhost:3000',
  ];
  return [...new Set([...origins, ...devOrigins])];
}

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      const allowed = getAllowedOrigins();
      // Allow if explicit match, wildcard, or vercel preview/production domain
      if (
        allowed.includes('*') ||
        allowed.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS origin not allowed: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    platform: 'SmartMine XR API Gateway',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    database: dbConnected ? 'connected' : 'disconnected',
    databaseType: 'firestore',
    projectId: 'smartminexr',
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/scenarios', scenarioRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled Server Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred.',
  });
});

// Initialize Database & Start Server
async function bootstrap() {
  dbConnected = await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 SmartMine XR Server running on http://localhost:${PORT}`);
    console.log(`📡 Health check available at http://localhost:${PORT}/api/health`);
    console.log(`🌐 CORS allowed origins: ${getAllowedOrigins().join(', ')}`);
    if (!dbConnected) {
      console.log('⚠️  Running without database — some features will be unavailable');
    }
  });
}

bootstrap();

export default app;
