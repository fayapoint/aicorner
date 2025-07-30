import { initializeScheduler } from './services/content-scheduler';

// Initialize the scheduler when the module is imported
let initialized = false;

export function ensureSchedulerInitialized() {
  if (!initialized) {
    try {
      console.log('🚀 Initializing content aggregation scheduler...');
      initializeScheduler();
      initialized = true;
      console.log('✅ Content aggregation scheduler initialized');
    } catch (error) {
      console.error('❌ Failed to initialize scheduler:', error);
      // Don't throw error to prevent app from crashing
      // The scheduler will be available but not automatically started
    }
  }
}

// Auto-initialize in production or when explicitly enabled
if (process.env.NODE_ENV === 'production' || process.env.ENABLE_SCHEDULER === 'true') {
  ensureSchedulerInitialized();
}
