import * as cron from 'node-cron';
import { YouTubeAggregator } from './youtube-aggregator';
import { NewsAggregator } from './news-aggregator';
import { MultiVideoAggregator } from './multi-video-aggregator';
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
  private multiVideoAggregator: MultiVideoAggregator;
  private isRunning: boolean = false;
  private logs: AggregationLog[] = [];

  constructor() {
    try {
      this.youtubeAggregator = new YouTubeAggregator();
      this.newsAggregator = new NewsAggregator();
      this.multiVideoAggregator = new MultiVideoAggregator();
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
   * Preview content without saving to database
   */
  async previewAggregation(): Promise<any> {
    try {
      console.log('🔍 Previewing content aggregation...');

      // Get current sources configuration
      const sources = this.getSources();

      const [youtubePreview, newsPreview, multiVideoPreview] = await Promise.all([
        this.youtubeAggregator.previewContent(),
        this.newsAggregator.previewContent(),
        this.multiVideoAggregator.previewFromAllSources(sources.videoSources || [])
      ]);

      // Combine all video sources
      const allVideoItems = [
        ...(youtubePreview?.items || []),
        ...(multiVideoPreview?.items || [])
      ];

      return {
        timestamp: new Date(),
        sources: {
          youtube: {
            success: youtubePreview?.success || false,
            items: allVideoItems,
            error: youtubePreview?.error
          },
          news: newsPreview
        },
        totalItems: allVideoItems.length + (newsPreview?.items?.length || 0)
      };
    } catch (error) {
      console.error('❌ Preview aggregation failed:', error);
      throw error;
    }
  }

  /**
   * Import selected items from preview
   */
  async importSelectedItems(selectedItems: any[]): Promise<any> {
    try {
      console.log('📥 Importing selected items...', selectedItems.length);

      const results = [];

      for (const item of selectedItems) {
        try {
          if (item.type === 'video') {
            await this.youtubeAggregator.saveVideoToDatabase(item.data);
          } else if (item.type === 'news') {
            // Ensure platform is always a string for Mongoose schema
            const platform =
              typeof item.source === 'string'
                ? item.source
                : item.source?.platform;
            await this.newsAggregator.saveArticleToDatabase(
              item.data,
              platform || 'manual'
            );
          }
          results.push({ success: true, item: item.id });
        } catch (error) {
          results.push({ success: false, item: item.id, error: error instanceof Error ? error.message : 'Unknown error' });
        }
      }

      return {
        timestamp: new Date(),
        imported: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results
      };
    } catch (error) {
      console.error('❌ Import selected items failed:', error);
      throw error;
    }
  }

  /**
   * Get current sources configuration
   */
  getSources(): any {
    return {
      youtube: {
        enabled: true,
        searchTerms: ['artificial intelligence', 'AI technology', 'machine learning', 'AI news'],
        maxResults: 3,
        channels: []
      },
      videoSources: [
        {
          id: 'youtube-main',
          name: 'YouTube (Primary)',
          type: 'youtube',
          enabled: true,
          config: {
            searchTerms: ['artificial intelligence', 'AI technology', 'machine learning'],
            maxResults: 3,
            channels: []
          }
        },
        {
          id: 'vimeo-ai',
          name: 'Vimeo AI Content',
          type: 'vimeo',
          enabled: true,
          config: {
            searchTerms: ['artificial intelligence', 'AI', 'machine learning'],
            maxResults: 2,
            customUrl: 'https://vimeo.com/api/v2/videos/search.json'
          }
        },
        {
          id: 'dailymotion-tech',
          name: 'Dailymotion Tech',
          type: 'dailymotion',
          enabled: true,
          config: {
            searchTerms: ['AI technology', 'artificial intelligence'],
            maxResults: 2,
            customUrl: 'https://www.dailymotion.com/api'
          }
        },
        {
          id: 'twitch-ai',
          name: 'Twitch AI Streams',
          type: 'twitch',
          enabled: true,
          config: {
            searchTerms: ['AI', 'programming', 'machine learning'],
            maxResults: 1
          }
        }
      ],
      news: {
        enabled: true,
        sources: [
          { id: 'newsapi-1', name: 'NewsAPI', type: 'newsapi', enabled: true, config: { maxResults: 3 } },
          { id: 'google-news-1', name: 'Google News', type: 'google-news', enabled: true, config: { maxResults: 3 } },
          { id: 'rss-sources-1', name: 'RSS Sources', type: 'rss', enabled: true, config: { maxResults: 6 } },
          { id: 'google-ai-1', name: 'Google AI Blog', type: 'google-ai', enabled: true, config: { maxResults: 5 } }
        ]
      },
      instagram: {
        enabled: false,
        reason: 'API restrictions'
      },
      tiktok: {
        enabled: false,
        reason: 'API restrictions'
      }
    };
  }

  /**
   * Update sources configuration
   */
  async updateSources(sources: any): Promise<any> {
    try {
      console.log('⚙️ Updating sources configuration...', sources);

      // Here you would typically save to database or config file
      // For now, we'll just return success

      return {
        timestamp: new Date(),
        updated: true,
        sources
      };
    } catch (error) {
      console.error('❌ Update sources failed:', error);
      throw error;
    }
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
  if (process.env.ENABLE_SCHEDULER === 'true') {
    scheduler.startScheduler();
  } else {
    console.log('⚠️  Scheduler not started (ENABLE_SCHEDULER not set to true)');
    console.log('   Set ENABLE_SCHEDULER=true to enable');
  }
  
  return scheduler;
}
