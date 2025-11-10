import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fallback';

if (!process.env.MONGODB_URI) {
  console.warn('MONGODB_URI environment variable not found. Using fallback connection.');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
      // Disable OIDC to avoid ESM/CommonJS compatibility issues
      authMechanism: undefined,
      authSource: 'admin',
    };

    console.log('Attempting MongoDB connection...');
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection failed:', error.message);
      console.error('MongoDB URI (masked):', MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection failed in connectDB:', e.message);
    console.error('Full error:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
