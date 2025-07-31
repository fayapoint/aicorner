import connectDB from '@/lib/mongodb';
import Video from '@/models/Video';

interface VideoData {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelId?: string;
  channelTitle: string;
  duration?: string;
  viewCount?: number;
  platform: 'youtube' | 'vimeo' | 'dailymotion' | 'twitch' | 'custom';
  originalUrl: string;
}

export class MultiVideoAggregator {
  private readonly searchTerms = [
    'artificial intelligence',
    'AI technology',
    'machine learning',
    'AI news',
    'AI tutorial',
    'deep learning',
    'neural networks',
    'AI development'
  ];

  /**
   * Search for AI videos from Vimeo
   */
  async searchVimeoVideos(maxResults: number = 2): Promise<VideoData[]> {
    try {
      console.log('Searching Vimeo for AI videos...');
      
      // Note: Vimeo API requires authentication, this is a placeholder implementation
      // In production, you would need to implement proper Vimeo API integration
      
      const mockVimeoVideos: VideoData[] = [
        {
          videoId: 'vimeo_mock_1',
          title: 'The Future of Artificial Intelligence - Vimeo Documentary',
          description: 'An in-depth look at how AI is shaping our future across industries.',
          thumbnail: 'https://via.placeholder.com/480x360/6366f1/ffffff?text=Vimeo+AI+Video',
          publishedAt: new Date().toISOString(),
          channelTitle: 'AI Documentary Channel',
          platform: 'vimeo',
          originalUrl: 'https://vimeo.com/mock-ai-video-1'
        }
      ];

      console.log(`Found ${mockVimeoVideos.length} Vimeo videos`);
      return mockVimeoVideos.slice(0, maxResults);
      
    } catch (error) {
      console.error('Error searching Vimeo videos:', error);
      return [];
    }
  }

  /**
   * Search for AI videos from Dailymotion
   */
  async searchDailymotionVideos(maxResults: number = 2): Promise<VideoData[]> {
    try {
      console.log('Searching Dailymotion for AI videos...');
      
      // Note: This is a placeholder implementation
      // In production, you would implement proper Dailymotion API integration
      
      const mockDailymotionVideos: VideoData[] = [
        {
          videoId: 'dailymotion_mock_1',
          title: 'AI Revolution: Latest Developments in Machine Learning',
          description: 'Exploring the latest breakthroughs in artificial intelligence and machine learning.',
          thumbnail: 'https://via.placeholder.com/480x360/ff6b35/ffffff?text=Dailymotion+AI',
          publishedAt: new Date().toISOString(),
          channelTitle: 'Tech Innovation Hub',
          platform: 'dailymotion',
          originalUrl: 'https://dailymotion.com/mock-ai-video-1'
        }
      ];

      console.log(`Found ${mockDailymotionVideos.length} Dailymotion videos`);
      return mockDailymotionVideos.slice(0, maxResults);
      
    } catch (error) {
      console.error('Error searching Dailymotion videos:', error);
      return [];
    }
  }

  /**
   * Search for AI content from Twitch (VODs and clips)
   */
  async searchTwitchContent(maxResults: number = 1): Promise<VideoData[]> {
    try {
      console.log('Searching Twitch for AI content...');
      
      // Note: Twitch API requires authentication and has specific rate limits
      // This is a placeholder implementation
      
      const mockTwitchVideos: VideoData[] = [
        {
          videoId: 'twitch_mock_1',
          title: 'Live Coding: Building an AI Chatbot from Scratch',
          description: 'Watch as we build a complete AI chatbot using modern machine learning frameworks.',
          thumbnail: 'https://via.placeholder.com/480x360/9146ff/ffffff?text=Twitch+AI+Stream',
          publishedAt: new Date().toISOString(),
          channelTitle: 'AI_Developer_Live',
          platform: 'twitch',
          originalUrl: 'https://twitch.tv/videos/mock-ai-stream-1'
        }
      ];

      console.log(`Found ${mockTwitchVideos.length} Twitch videos`);
      return mockTwitchVideos.slice(0, maxResults);
      
    } catch (error) {
      console.error('Error searching Twitch content:', error);
      return [];
    }
  }

  /**
   * Search custom video sources (RSS feeds, APIs, etc.)
   */
  async searchCustomSources(sources: any[], maxResults: number = 2): Promise<VideoData[]> {
    try {
      console.log('Searching custom video sources...');
      
      const customVideos: VideoData[] = [];
      
      for (const source of sources) {
        if (!source.enabled || !source.config.customUrl) continue;
        
        try {
          // This would implement custom API calls based on source configuration
          // For now, we'll return mock data
          
          const mockCustomVideo: VideoData = {
            videoId: `custom_${source.id}_${Date.now()}`,
            title: `AI Content from ${source.name}`,
            description: `Custom AI video content aggregated from ${source.name}`,
            thumbnail: 'https://via.placeholder.com/480x360/34d399/ffffff?text=Custom+Source',
            publishedAt: new Date().toISOString(),
            channelTitle: source.name,
            platform: 'custom',
            originalUrl: source.config.customUrl
          };
          
          customVideos.push(mockCustomVideo);
          
        } catch (error) {
          console.error(`Error fetching from custom source ${source.name}:`, error);
        }
      }

      console.log(`Found ${customVideos.length} custom source videos`);
      return customVideos.slice(0, maxResults);
      
    } catch (error) {
      console.error('Error searching custom sources:', error);
      return [];
    }
  }

  /**
   * Convert video data to database format
   */
  private convertToVideoModel(video: VideoData): any {
    return {
      title: video.title,
      slug: this.generateSlug(video.title),
      description: video.description,
      videoUrl: video.originalUrl,
      thumbnail: {
        url: video.thumbnail,
        publicId: `${video.platform}_${video.videoId}`,
        alt: video.title
      },
      author: {
        name: video.channelTitle,
        bio: `Content creator on ${video.platform}`,
        avatar: {
          url: 'https://via.placeholder.com/100x100/6366f1/ffffff?text=Author',
          publicId: `author_${video.platform}_${video.videoId}`,
          alt: video.channelTitle
        }
      },
      category: 'AI Technology',
      tags: ['AI', 'Technology', 'Video', video.platform],
      status: 'published',
      views: video.viewCount || 0,
      likes: 0,
      source: {
        platform: video.platform,
        originalUrl: video.originalUrl,
        apiId: video.videoId,
        aggregatedAt: new Date(),
        lastUpdated: new Date(),
        channelId: video.channelId,
        channelTitle: video.channelTitle
      },
      aggregation: {
        isAutomated: true,
        confidence: 0.8,
        relevanceScore: 0.75,
        duplicateCheck: true,
        processed: true
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: new Date(video.publishedAt)
    };
  }

  /**
   * Generate URL-friendly slug from title
   */
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 100);
  }

  /**
   * Check for duplicate videos
   */
  private async isDuplicate(video: VideoData): Promise<boolean> {
    try {
      const existing = await (Video as any).findOne({
        $or: [
          { 'source.apiId': video.videoId },
          { 'source.originalUrl': video.originalUrl },
          { slug: this.generateSlug(video.title) }
        ]
      });
      
      return !!existing;
    } catch (error) {
      console.error('Error checking for duplicates:', error);
      return false;
    }
  }

  /**
   * Save videos to database
   */
  async saveVideosToDatabase(videos: VideoData[]): Promise<void> {
    try {
      await connectDB();
      
      for (const video of videos) {
        try {
          // Check for duplicates
          const isDupe = await this.isDuplicate(video);
          if (isDupe) {
            console.log(`Skipping duplicate video: ${video.title}`);
            continue;
          }

          const videoData = this.convertToVideoModel(video);
          const newVideo = new (Video as any)(videoData);
          await newVideo.save();
          
          console.log(`✅ Saved ${video.platform} video: ${video.title}`);
        } catch (error) {
          console.error(`❌ Failed to save video ${video.title}:`, error);
        }
      }
    } catch (error) {
      console.error('Error saving videos to database:', error);
      throw error;
    }
  }

  /**
   * Aggregate content from all enabled video sources
   */
  async aggregateFromAllSources(sources: any[]): Promise<{ success: boolean; count: number; error?: string }> {
    try {
      console.log('Starting multi-platform video aggregation...');
      
      const allVideos: VideoData[] = [];
      
      // Process each enabled source
      for (const source of sources) {
        if (!source.enabled) continue;
        
        try {
          let videos: VideoData[] = [];
          
          switch (source.type) {
            case 'vimeo':
              videos = await this.searchVimeoVideos(source.config.maxResults || 2);
              break;
            case 'dailymotion':
              videos = await this.searchDailymotionVideos(source.config.maxResults || 2);
              break;
            case 'twitch':
              videos = await this.searchTwitchContent(source.config.maxResults || 1);
              break;
            default:
              if (source.config.customUrl) {
                videos = await this.searchCustomSources([source], source.config.maxResults || 2);
              }
              break;
          }
          
          allVideos.push(...videos);
          
        } catch (error) {
          console.error(`Error aggregating from ${source.name}:`, error);
        }
      }
      
      if (allVideos.length > 0) {
        await this.saveVideosToDatabase(allVideos);
      }
      
      console.log(`Multi-platform video aggregation completed: ${allVideos.length} videos processed`);
      return { success: true, count: allVideos.length };
      
    } catch (error) {
      console.error('Multi-platform video aggregation failed:', error);
      return { 
        success: false, 
        count: 0, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Preview content from all sources without saving
   */
  async previewFromAllSources(sources: any[]): Promise<{ success: boolean; items: any[]; error?: string }> {
    try {
      console.log('Previewing multi-platform video content...');
      
      const allVideos: VideoData[] = [];
      
      // Process each enabled source
      for (const source of sources) {
        if (!source.enabled) continue;
        
        try {
          let videos: VideoData[] = [];
          
          switch (source.type) {
            case 'vimeo':
              videos = await this.searchVimeoVideos(source.config.maxResults || 2);
              break;
            case 'dailymotion':
              videos = await this.searchDailymotionVideos(source.config.maxResults || 2);
              break;
            case 'twitch':
              videos = await this.searchTwitchContent(source.config.maxResults || 1);
              break;
            default:
              if (source.config.customUrl) {
                videos = await this.searchCustomSources([source], source.config.maxResults || 2);
              }
              break;
          }
          
          allVideos.push(...videos);
          
        } catch (error) {
          console.error(`Error previewing from ${source.name}:`, error);
        }
      }
      
      const previewItems = allVideos.map(video => ({
        id: `${video.platform}_${video.videoId}`,
        type: 'video',
        platform: video.platform.charAt(0).toUpperCase() + video.platform.slice(1),
        title: video.title,
        description: video.description,
        thumbnail: video.thumbnail,
        url: video.originalUrl,
        author: video.channelTitle,
        publishedAt: video.publishedAt,
        source: {
          platform: video.platform,
          originalUrl: video.originalUrl,
          apiId: video.videoId,
          channelId: video.channelId,
          channelTitle: video.channelTitle
        },
        data: video
      }));
      
      return { success: true, items: previewItems };
      
    } catch (error) {
      console.error('Multi-platform video preview failed:', error);
      return { 
        success: false, 
        items: [],
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}
