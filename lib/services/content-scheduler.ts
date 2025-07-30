import * as cron from 'node-cron';
import { YouTubeAggregator } from './youtube-aggregator';
import { NewsAggregator } from './news-aggregator';
import connectDB from '@/lib/mongodb';

interface AggregationResult {
  platform: string;
  success: boolean;
  count: number;
  error?: string;
  timestamp: Date;
}

interface AggregationLog {
  date: Date;
  results: AggregationResult[];
  totalItems: number;
  successCount: number;
  failureCount: number;
}

export class ContentScheduler {
  private youtubeAggregator: YouTubeAggregator;
  private newsAggregator: NewsAggregator;
  private isRunning: boolean = false;
  private logs: AggregationLog[] = [];

  constructor() {
    try {
      this.youtubeAggregator = new YouTubeAggregator();
      this.newsAggregator = new NewsAggregator();
    } catch (error) {
      console.error('Error initializing aggregators:', error);
      throw error;
    }
  }

  /**
   * Run a single aggregation cycle
   */
  async runAggregation(): Promise<AggregationLog> {
    if (this.isRunning) {
      console.log('Aggregation already running, skipping...');
      throw new Error('Aggregation already in progress');
    }

    this.isRunning = true;
    const startTime = new Date();
    const results: AggregationResult[] = [];

    console.log(`\n🤖 Starting content aggregation cycle at ${startTime.toISOString()}`);

    try {
      // Ensure database connection
      await connectDB();

      // Run YouTube aggregation
      console.log('\n📺 Running YouTube aggregation...');
      try {
        const youtubeResult = await this.youtubeAggregator.aggregateContent();
        results.push({
          platform: 'YouTube',
          success: youtubeResult.success,
          count: youtubeResult.count,
          error: youtubeResult.error,
          timestamp: new Date()
        });
        console.log(`✅ YouTube: ${youtubeResult.count} videos processed`);
      } catch (error) {
        results.push({
          platform: 'YouTube',
          success: false,
          count: 0,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date()
        });
        console.error('❌ YouTube aggregation failed:', error);
      }

      // Run News aggregation
      console.log('\n📰 Running News aggregation...');
      try {
        const newsResult = await this.newsAggregator.aggregateContent();
        results.push({
          platform: 'News',
          success: newsResult.success,
          count: newsResult.count,
          error: newsResult.error,
          timestamp: new Date()
        });
        console.log(`✅ News: ${newsResult.count} articles processed`);
      } catch (error) {
        results.push({
          platform: 'News',
          success: false,
          count: 0,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date()
        });
        console.error('❌ News aggregation failed:', error);
      }

      // TODO: Add Instagram and TikTok aggregation when implemented
      // For now, we'll add placeholder results
      results.push({
        platform: 'Instagram',
        success: false,
        count: 0,
        error: 'Not implemented yet - requires alternative approach due to API restrictions',
        timestamp: new Date()
      });

      results.push({
        platform: 'TikTok',
        success: false,
        count: 0,
        error: 'Not implemented yet - requires alternative approach due to API restrictions',
        timestamp: new Date()
      });

      // Calculate summary
      const totalItems = results.reduce((sum, result) => sum + result.count, 0);
      const successCount = results.filter(result => result.success).length;
      const failureCount = results.filter(result => !result.success).length;

      const log: AggregationLog = {
        date: startTime,
        results,
        totalItems,
        successCount,
        failureCount
      };

      // Store log
      this.logs.push(log);
      
      // Keep only last 30 logs
      if (this.logs.length > 30) {
        this.logs = this.logs.slice(-30);
      }

      const endTime = new Date();
      const duration = (endTime.getTime() - startTime.getTime()) / 1000;

      console.log(`\n🎉 Aggregation cycle completed in ${duration}s`);
      console.log(`📊 Summary: ${totalItems} items, ${successCount} successes, ${failureCount} failures`);
      
      return log;

    } catch (error) {
      console.error('❌ Aggregation cycle failed:', error);
      throw error;
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Start the scheduled aggregation
   */
  startScheduler(): void {
    console.log('🚀 Starting content aggregation scheduler...');
    
    // Run daily at 6:00 AM
    cron.schedule('0 6 * * *', async () => {
      try {
        console.log('\n⏰ Scheduled aggregation triggered');
        await this.runAggregation();
      } catch (error) {
        console.error('Scheduled aggregation failed:', error);
      }
    }, {
      scheduled: true,
      timezone: "America/New_York"
    });

    // Optional: Run every 6 hours for more frequent updates
    // cron.schedule('0 */6 * * *', async () => {
    //   try {
    //     console.log('\n⏰ Frequent aggregation triggered');
    //     await this.runAggregation();
    //   } catch (error) {
    //     console.error('Frequent aggregation failed:', error);
    //   }
    // });

    console.log('✅ Scheduler started - will run daily at 6:00 AM EST');
  }

  /**
   * Stop the scheduler
   */
  stopScheduler(): void {
    cron.getTasks().forEach(task => task.stop());
    console.log('🛑 Scheduler stopped');
  }

  /**
   * Get aggregation logs
   */
  getLogs(): AggregationLog[] {
    return this.logs;
  }

  /**
   * Get the latest log
   */
  getLatestLog(): AggregationLog | null {
    return this.logs.length > 0 ? this.logs[this.logs.length - 1] : null;
  }

  /**
   * Check if aggregation is currently running
   */
  isAggregationRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Get scheduler status
   */
  getStatus(): {
    isRunning: boolean;
    lastRun: Date | null;
    nextRun: string;
    totalRuns: number;
    averageItemsPerRun: number;
  } {
    const lastLog = this.getLatestLog();
    const totalRuns = this.logs.length;
    const averageItemsPerRun = totalRuns > 0 
      ? this.logs.reduce((sum, log) => sum + log.totalItems, 0) / totalRuns 
      : 0;

    return {
      isRunning: this.isRunning,
      lastRun: lastLog?.date || null,
      nextRun: 'Daily at 6:00 AM EST',
      totalRuns,
      averageItemsPerRun: Math.round(averageItemsPerRun * 100) / 100
    };
  }

  /**
   * Manual trigger for testing
   */
  async triggerManualAggregation(): Promise<AggregationLog> {
    console.log('🔧 Manual aggregation triggered');
    return await this.runAggregation();
  }
}

// Singleton instance
let schedulerInstance: ContentScheduler | null = null;

/**
 * Get the scheduler instance
 */
export function getScheduler(): ContentScheduler {
  if (!schedulerInstance) {
    schedulerInstance = new ContentScheduler();
  }
  return schedulerInstance;
}

/**
 * Initialize and start the scheduler
 */
export function initializeScheduler(): ContentScheduler {
  const scheduler = getScheduler();
  
  // Start the scheduler if not already running
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_SCHEDULER === 'true') {
    scheduler.startScheduler();
  } else {
    console.log('⚠️  Scheduler not started (not in production mode)');
    console.log('   Set ENABLE_SCHEDULER=true to enable in development');
  }
  
  return scheduler;
}
