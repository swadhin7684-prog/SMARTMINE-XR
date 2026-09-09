import mongoose from 'mongoose';

export async function connectDB(): Promise<boolean> {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/smartmine_xr';
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log('✅ MongoDB connected successfully to', uri);
    return true;
  } catch (error) {
    console.warn('⚠️ MongoDB connection could not be established. Running in offline/demo mode.');
    return false;
  }
}
