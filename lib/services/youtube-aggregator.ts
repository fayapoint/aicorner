import { google } from 'googleapis';
import connectDB from '@/lib/mongodb';
import Video from '@/models/Video';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelId: string;
  channelTitle: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  tags?: string[];
}

export class YouTubeAggregator {
  private youtube;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('YouTube API key is required');
    }
    
    this.youtube = google.youtube({
      version: 'v3',
      auth: this.apiKey
    });
  }

  /**
   * Search for trending AI videos on YouTube
   */
  async searchTrendingAIVideos(maxResults: number = 3): Promise<YouTubeVideo[]> {
    try {
      console.log('Searching for trending AI videos on YouTube...');
      
      // Search for AI-related videos published in the last 7 days
      const searchResponse = await this.youtube.search.list({
        part: ['snippet'],
        q: 'artificial intelligence OR machine learning OR AI technology OR deep learning',
        type: 'video',
        order: 'relevance',
        publishedAfter: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        maxResults: maxResults * 2, // Get more to filter for quality
        regionCode: 'US',
        relevanceLanguage: 'en',
        safeSearch: 'moderate'
      });

      if (!searchResponse.data.items || searchResponse.data.items.length === 0) {
        console.log('No videos found in search');
        return [];
      }

      // Get video IDs for detailed information
      const videoIds = searchResponse.data.items.map(item => item.id?.videoId).filter(Boolean);
      
      // Get detailed video information
      const videosResponse = await this.youtube.videos.list({
        part: ['snippet', 'statistics', 'contentDetails'],
        id: videoIds
      });

      if (!videosResponse.data.items) {
        return [];
      }

      // Process and filter videos
      const videos: YouTubeVideo[] = videosResponse.data.items
        .map(item => {
          const snippet = item.snippet;
          const statistics = item.statistics;
          
          if (!snippet || !item.id) return null;

          return {
            id: item.id,
            title: snippet.title || '',
            description: snippet.description || '',
            thumbnailUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '',
            channelId: snippet.channelId || '',
            channelTitle: snippet.channelTitle || '',
            publishedAt: snippet.publishedAt || '',
            duration: item.contentDetails?.duration || '',
            viewCount: statistics?.viewCount || '0',
            tags: snippet.tags || []
          };
        })
        .filter((video): video is YouTubeVideo => video !== null)
        .filter(video => {
          // Filter for quality: minimum view count and relevant content
          const views = parseInt(video.viewCount);
          const hasAIContent = this.isAIRelated(video.title + ' ' + video.description);
          return views > 1000 && hasAIContent;
        })
        .slice(0, maxResults);

      console.log(`Found ${videos.length} quality AI videos`);
      return videos;
      
    } catch (error) {
      console.error('Error searching YouTube videos:', error);
      throw error;
    }
  }

  /**
   * Check if content is AI-related
   */
  private isAIRelated(content: string): boolean {
    const aiKeywords = [
      'artificial intelligence', 'machine learning', 'deep learning', 'neural network',
      'ai technology', 'chatgpt', 'openai', 'google ai', 'microsoft ai',
      'automation', 'robotics', 'computer vision', 'natural language processing',
      'llm', 'large language model', 'generative ai', 'ai tools'
    ];
    
    const lowerContent = content.toLowerCase();
    return aiKeywords.some(keyword => lowerContent.includes(keyword));
  }

  /**
   * Get a valid YouTube thumbnail URL
   */
  private getValidThumbnailUrl(thumbnailUrl: string, videoId: string): string {
    // If we have a valid thumbnail URL, use it
    if (thumbnailUrl && thumbnailUrl.startsWith('https://')) {
      return thumbnailUrl;
    }

    // Fallback to YouTube's standard thumbnail URLs
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }

  /**
   * Convert YouTube duration to seconds
   */
  private parseDuration(duration: string): number {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    
    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');
    
    return hours * 3600 + minutes * 60 + seconds;
  }

  /**
   * Save videos to database
   */
  async saveVideosToDatabase(videos: YouTubeVideo[]): Promise<void> {
    try {
      await connectDB();
      
      for (const video of videos) {
        // Check if video already exists by title (simple check for now)
        const existingVideo = await (Video as any).findOne({ title: video.title });

        if (existingVideo) {
          console.log(`Video already exists: ${video.title}`);
          continue;
        }

        // Create new video document
        const newVideo = new (Video as any)({
          title: video.title,
          description: video.description.substring(0, 1000), // Limit description length
          videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
          thumbnailUrl: this.getValidThumbnailUrl(video.thumbnailUrl, video.id),
          duration: this.parseDuration(video.duration),
          category: 'AI Technology',
          tags: ['AI', 'Technology', 'YouTube', ...(video.tags?.slice(0, 5) || [])],
          status: 'published',
          publishedAt: new Date(video.publishedAt),
          views: parseInt(video.viewCount),
          source: {
            platform: 'youtube',
            originalUrl: `https://www.youtube.com/watch?v=${video.id}`,
            videoId: video.id,
            channelId: video.channelId,
            channelName: video.channelTitle,
            aggregatedAt: new Date(),
            lastUpdated: new Date()
          },
          aggregation: {
            isAutomated: true,
            confidence: 0.8,
            relevanceScore: this.calculateRelevanceScore(video),
            duplicateCheck: true,
            processed: true
          }
        });

        await newVideo.save();
        console.log(`Saved video: ${video.title}`);
      }
      
    } catch (error) {
      console.error('Error saving videos to database:', error);
      throw error;
    }
  }

  /**
   * Calculate relevance score based on video metrics
   */
  private calculateRelevanceScore(video: YouTubeVideo): number {
    let score = 0.5; // Base score
    
    // Boost score based on view count
    const views = parseInt(video.viewCount);
    if (views > 100000) score += 0.2;
    else if (views > 10000) score += 0.1;
    
    // Boost score for AI-specific channels or titles
    const title = video.title.toLowerCase();
    const channel = video.channelTitle.toLowerCase();
    
    if (title.includes('ai') || title.includes('artificial intelligence')) score += 0.1;
    if (channel.includes('ai') || channel.includes('tech')) score += 0.1;
    
    // Boost for recent content
    const publishedDate = new Date(video.publishedAt);
    const daysSincePublished = (Date.now() - publishedDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSincePublished <= 1) score += 0.1;
    
    return Math.min(score, 1.0);
  }

  /**
   * Run the complete aggregation process
   */
  async aggregateContent(): Promise<{ success: boolean; count: number; error?: string }> {
    try {
      console.log('Starting YouTube content aggregation...');
      
      const videos = await this.searchTrendingAIVideos(3);
      
      if (videos.length === 0) {
        return { success: true, count: 0 };
      }
      
      await this.saveVideosToDatabase(videos);
      
      console.log(`YouTube aggregation completed: ${videos.length} videos processed`);
      return { success: true, count: videos.length };
      
    } catch (error) {
      console.error('YouTube aggregation failed:', error);
      return { 
        success: false, 
        count: 0, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}
