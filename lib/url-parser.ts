import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ParsedContent {
  title?: string;
  description?: string;
  thumbnail?: string;
  duration?: number;
  author?: string;
  publishedAt?: string;
  type: 'youtube' | 'news' | 'unknown';
}

export class URLParser {
  /**
   * Parse content from any URL
   */
  static async parseURL(url: string): Promise<ParsedContent> {
    try {
      const urlObj = new URL(url);
      
      // Check if it's a YouTube URL
      if (this.isYouTubeURL(urlObj)) {
        return await this.parseYouTubeURL(url);
      }
      
      // Otherwise, parse as a general web page/news article
      return await this.parseWebPage(url);
      
    } catch (error) {
      console.error('Error parsing URL:', error);
      return { type: 'unknown' };
    }
  }

  /**
   * Check if URL is a YouTube URL
   */
  private static isYouTubeURL(url: URL): boolean {
    return url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be');
  }

  /**
   * Extract YouTube video ID from URL
   */
  private static extractYouTubeVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  }

  /**
   * Parse YouTube URL using oEmbed API with fallbacks
   */
  private static async parseYouTubeURL(url: string): Promise<ParsedContent> {
    const videoId = this.extractYouTubeVideoId(url);
    if (!videoId) {
      return { type: 'unknown' };
    }

    try {
      // Use YouTube oEmbed API (no API key required)
      const oEmbedResponse = await axios.get(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`,
        {
          timeout: 5000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      );

      const oEmbedData = oEmbedResponse.data;

      // Get multiple thumbnail options
      const thumbnailOptions = [
        `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
      ];

      return {
        title: oEmbedData.title || 'YouTube Video',
        description: oEmbedData.author_name ? `Video by ${oEmbedData.author_name}` : 'YouTube video content',
        thumbnail: thumbnailOptions[0], // Use highest quality
        author: oEmbedData.author_name,
        type: 'youtube'
      };

    } catch (error) {
      console.error('Error parsing YouTube URL via oEmbed:', error.message);

      // Fallback: return basic info with video ID
      return {
        title: 'YouTube Video',
        description: 'YouTube video content',
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        type: 'youtube'
      };
    }
  }

  /**
   * Parse general web page for news articles with retry logic
   */
  private static async parseWebPage(url: string): Promise<ParsedContent> {
    const maxRetries = 2;
    let lastError: any;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await axios.get(url, {
          timeout: 8000, // Reduced timeout
          maxRedirects: 5,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
          },
          validateStatus: (status) => status < 500 // Accept 4xx errors but retry on 5xx
        });

        // Check if we got a valid response
        if (response.status >= 400) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const $ = cheerio.load(response.data);

        // Extract title with multiple fallbacks
        let title = $('meta[property="og:title"]').attr('content') ||
                    $('meta[name="twitter:title"]').attr('content') ||
                    $('meta[property="twitter:title"]').attr('content') ||
                    $('title').text() ||
                    $('h1').first().text() ||
                    $('.title').first().text() ||
                    $('.headline').first().text();

        // Extract description with multiple fallbacks
        let description = $('meta[property="og:description"]').attr('content') ||
                         $('meta[name="twitter:description"]').attr('content') ||
                         $('meta[name="description"]').attr('content') ||
                         $('.excerpt').first().text() ||
                         $('.summary').first().text() ||
                         $('p').first().text();

        // Extract thumbnail/image with multiple fallbacks
        let thumbnail = $('meta[property="og:image"]').attr('content') ||
                       $('meta[name="twitter:image"]').attr('content') ||
                       $('meta[property="twitter:image"]').attr('content') ||
                       $('.featured-image img').first().attr('src') ||
                       $('article img').first().attr('src') ||
                       $('img').first().attr('src');

        // Make thumbnail URL absolute if it's relative
        if (thumbnail && !thumbnail.startsWith('http')) {
          try {
            const baseUrl = new URL(url);
            thumbnail = new URL(thumbnail, baseUrl.origin).href;
          } catch (e) {
            thumbnail = undefined; // Invalid URL construction
          }
        }

        // Extract author with multiple fallbacks
        let author = $('meta[name="author"]').attr('content') ||
                    $('meta[property="article:author"]').attr('content') ||
                    $('.author').first().text() ||
                    $('.byline').first().text() ||
                    $('[rel="author"]').first().text();

        // Extract publish date
        let publishedAt = $('meta[property="article:published_time"]').attr('content') ||
                         $('meta[name="date"]').attr('content') ||
                         $('time').first().attr('datetime') ||
                         $('.date').first().text();

        // Clean up extracted data
        title = title?.trim().substring(0, 200);
        description = description?.trim().substring(0, 500);
        author = author?.trim().substring(0, 100);

        // Validate we got meaningful content
        if (!title || title.length < 3) {
          throw new Error('Could not extract meaningful title');
        }

        return {
          title: title || 'Untitled Article',
          description: description || 'No description available',
          thumbnail: thumbnail || undefined,
          author: author || undefined,
          publishedAt: publishedAt || undefined,
          type: 'news'
        };

      } catch (error) {
        lastError = error;
        console.error(`Attempt ${attempt + 1} failed for ${url}:`, error.message);

        // If this is the last attempt, break
        if (attempt === maxRetries) {
          break;
        }

        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }

    // All attempts failed, return fallback
    console.error('All attempts failed for web page parsing:', lastError?.message);
    return {
      type: 'news',
      title: this.extractDomain(url),
      description: 'Unable to extract content from URL - the website may be blocking automated requests'
    };
  }

  /**
   * Validate if a URL is accessible
   */
  static async validateURL(url: string): Promise<boolean> {
    try {
      const response = await axios.head(url, {
        timeout: 5000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      return response.status >= 200 && response.status < 400;
    } catch (error) {
      return false;
    }
  }

  /**
   * Extract domain from URL for display
   */
  static extractDomain(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch (error) {
      return 'Unknown Source';
    }
  }
}
