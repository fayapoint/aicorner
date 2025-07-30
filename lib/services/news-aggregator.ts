import axios from 'axios';
import * as cheerio from 'cheerio';
import Parser from 'rss-parser';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';

interface NewsArticleData {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  imageUrl?: string;
  content?: string;
  author?: string;
}

export class NewsAggregator {
  private newsApiKey: string;
  private rssParser: Parser;

  constructor() {
    this.newsApiKey = process.env.NEWS_API_KEY || '';
    this.rssParser = new Parser({
      customFields: {
        item: ['media:content', 'media:thumbnail']
      }
    });
  }

  /**
   * Fetch AI news from NewsAPI.org
   */
  async fetchFromNewsAPI(count: number = 3): Promise<NewsArticleData[]> {
    if (!this.newsApiKey) {
      console.warn('NewsAPI key not provided, skipping NewsAPI aggregation');
      return [];
    }

    try {
      console.log('Fetching AI news from NewsAPI...');
      
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: 'artificial intelligence OR machine learning OR AI technology',
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: count * 2, // Get more to filter
          apiKey: this.newsApiKey,
          from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Last 24 hours
        }
      });

      const articles = response.data.articles
        .filter((article: any) => {
          // Filter out articles with [Removed] content or no description
          return article.title && 
                 article.description && 
                 !article.title.includes('[Removed]') &&
                 !article.description.includes('[Removed]') &&
                 this.isAIRelated(article.title + ' ' + article.description);
        })
        .slice(0, count)
        .map((article: any) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          publishedAt: article.publishedAt,
          source: article.source.name,
          imageUrl: article.urlToImage,
          author: article.author
        }));

      console.log(`Found ${articles.length} articles from NewsAPI`);
      return articles;
      
    } catch (error) {
      console.error('Error fetching from NewsAPI:', error);
      return [];
    }
  }

  /**
   * Fetch AI news from Google News RSS
   */
  async fetchFromGoogleNews(count: number = 3): Promise<NewsArticleData[]> {
    try {
      console.log('Fetching AI news from Google News RSS...');
      
      const rssUrl = 'https://news.google.com/rss/search?q=artificial+intelligence+OR+machine+learning+OR+AI+technology&hl=en-US&gl=US&ceid=US:en';
      
      const feed = await this.rssParser.parseURL(rssUrl);
      
      const articles = feed.items
        .filter(item => item.title && item.link && this.isAIRelated(item.title + ' ' + (item.contentSnippet || '')))
        .slice(0, count)
        .map(item => ({
          title: item.title || '',
          description: item.contentSnippet || item.content || '',
          url: item.link || '',
          publishedAt: item.pubDate || new Date().toISOString(),
          source: 'Google News',
          author: item.creator
        }));

      console.log(`Found ${articles.length} articles from Google News`);
      return articles;
      
    } catch (error) {
      console.error('Error fetching from Google News:', error);
      return [];
    }
  }

  /**
   * Fetch from additional RSS sources
   */
  async fetchFromRSSSources(count: number = 6): Promise<NewsArticleData[]> {
    const rssSources = [
      {
        url: 'https://feeds.feedburner.com/venturebeat/SZYF',
        name: 'VentureBeat AI'
      },
      {
        url: 'https://www.artificialintelligence-news.com/feed/',
        name: 'AI News'
      },
      {
        url: 'https://feeds.feedburner.com/oreilly/radar',
        name: 'O\'Reilly Radar'
      },
      {
        url: 'https://www.technologyreview.com/feed/',
        name: 'MIT Technology Review'
      }
    ];

    const allArticles: NewsArticleData[] = [];

    for (const source of rssSources) {
      try {
        console.log(`Fetching from ${source.name}...`);
        
        const feed = await this.rssParser.parseURL(source.url);
        
        const articles = feed.items
          .filter(item => item.title && item.link && this.isAIRelated(item.title + ' ' + (item.contentSnippet || '')))
          .slice(0, 2) // Get 2 from each source
          .map(item => ({
            title: item.title || '',
            description: item.contentSnippet || item.content || '',
            url: item.link || '',
            publishedAt: item.pubDate || new Date().toISOString(),
            source: source.name,
            author: item.creator
          }));

        allArticles.push(...articles);
        
      } catch (error) {
        console.error(`Error fetching from ${source.name}:`, error);
      }
    }

    // Sort by published date and return the most recent
    const sortedArticles = allArticles
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, count);

    console.log(`Found ${sortedArticles.length} articles from RSS sources`);
    return sortedArticles;
  }

  /**
   * Fetch Google AI specific news
   */
  async fetchGoogleAINews(count: number = 5): Promise<NewsArticleData[]> {
    try {
      console.log('Fetching Google AI specific news...');
      
      // Google AI Blog RSS
      const googleAIBlogUrl = 'https://ai.googleblog.com/feeds/posts/default';
      
      const feed = await this.rssParser.parseURL(googleAIBlogUrl);
      
      const articles = feed.items
        .slice(0, count)
        .map(item => ({
          title: item.title || '',
          description: item.contentSnippet || item.content || '',
          url: item.link || '',
          publishedAt: item.pubDate || new Date().toISOString(),
          source: 'Google AI Blog',
          author: item.creator || 'Google AI Team'
        }));

      console.log(`Found ${articles.length} articles from Google AI Blog`);
      return articles;
      
    } catch (error) {
      console.error('Error fetching Google AI news:', error);
      return [];
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
      'llm', 'large language model', 'generative ai', 'ai tools', 'ai model',
      'transformer', 'gpt', 'bert', 'ai research', 'ai development'
    ];
    
    const lowerContent = content.toLowerCase();
    return aiKeywords.some(keyword => lowerContent.includes(keyword));
  }

  /**
   * Extract content from article URL
   */
  private async extractArticleContent(url: string): Promise<string> {
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      const $ = cheerio.load(response.data);
      
      // Remove unwanted elements
      $('script, style, nav, header, footer, aside, .advertisement').remove();
      
      // Try to find main content
      let content = '';
      const contentSelectors = [
        'article',
        '.article-content',
        '.post-content',
        '.entry-content',
        '.content',
        'main'
      ];
      
      for (const selector of contentSelectors) {
        const element = $(selector);
        if (element.length > 0) {
          content = element.text().trim();
          break;
        }
      }
      
      // Fallback to body if no specific content found
      if (!content) {
        content = $('body').text().trim();
      }
      
      // Clean up and limit content
      return content
        .replace(/\s+/g, ' ')
        .substring(0, 2000)
        .trim();
        
    } catch (error) {
      console.error('Error extracting content from:', url, error);
      return '';
    }
  }

  /**
   * Save articles to database
   */
  async saveArticlesToDatabase(articles: NewsArticleData[], platform: string): Promise<void> {
    try {
      await connectDB();
      
      for (const article of articles) {
        // Check if article already exists by URL (simple check for now)
        const existingArticle = await (News as any).findOne({ title: article.title.substring(0, 200) });

        if (existingArticle) {
          console.log(`Article already exists: ${article.title}`);
          continue;
        }

        // Extract full content if possible
        const fullContent = await this.extractArticleContent(article.url);
        
        // Generate slug from title
        const slug = article.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
          .substring(0, 100);

        // Create new article document
        const newArticle = new (News as any)({
          title: article.title.substring(0, 200),
          slug: slug,
          excerpt: article.description.substring(0, 500),
          content: fullContent || `<p>${article.description}</p><p><a href="${article.url}" target="_blank">Read full article</a></p>`,
          featuredImage: {
            url: this.getValidImageUrl(article.imageUrl),
            publicId: 'default-ai-news',
            alt: article.title.substring(0, 100)
          },
          author: {
            name: article.author || article.source,
            avatar: ''
          },
          category: 'AI News',
          tags: ['AI', 'Technology', 'News', platform],
          status: 'published',
          publishedAt: new Date(article.publishedAt),
          source: {
            platform: platform as any,
            originalUrl: article.url,
            apiId: article.url,
            aggregatedAt: new Date(),
            lastUpdated: new Date()
          },
          aggregation: {
            isAutomated: true,
            confidence: 0.8,
            relevanceScore: this.calculateRelevanceScore(article),
            duplicateCheck: true,
            processed: true
          }
        });

        await newArticle.save();
        console.log(`Saved article: ${article.title}`);
      }
      
    } catch (error) {
      console.error('Error saving articles to database:', error);
      throw error;
    }
  }

  /**
   * Get a valid image URL with fallback
   */
  private getValidImageUrl(imageUrl?: string): string {
    // Default fallback image
    const defaultImage = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&crop=center';

    if (!imageUrl) {
      return defaultImage;
    }

    // Check if URL is valid and accessible
    try {
      const url = new URL(imageUrl);

      // Skip data URLs and invalid protocols
      if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        return defaultImage;
      }

      // Skip obviously invalid image URLs
      if (imageUrl.includes('favicon') || imageUrl.includes('logo') || imageUrl.length < 10) {
        return defaultImage;
      }

      return imageUrl;
    } catch (error) {
      return defaultImage;
    }
  }

  /**
   * Calculate relevance score for an article
   */
  private calculateRelevanceScore(article: NewsArticleData): number {
    let score = 0.5; // Base score
    
    const title = article.title.toLowerCase();
    const description = article.description.toLowerCase();
    
    // Boost for AI-specific terms in title
    if (title.includes('ai') || title.includes('artificial intelligence')) score += 0.2;
    if (title.includes('machine learning') || title.includes('deep learning')) score += 0.15;
    
    // Boost for reputable sources
    const reputableSources = ['google', 'microsoft', 'openai', 'mit', 'stanford', 'venturebeat', 'techcrunch'];
    if (reputableSources.some(source => article.source.toLowerCase().includes(source))) {
      score += 0.1;
    }
    
    // Boost for recent content
    const publishedDate = new Date(article.publishedAt);
    const hoursOld = (Date.now() - publishedDate.getTime()) / (1000 * 60 * 60);
    if (hoursOld <= 24) score += 0.1;
    
    return Math.min(score, 1.0);
  }

  /**
   * Run the complete news aggregation process
   */
  async aggregateContent(): Promise<{ success: boolean; count: number; error?: string }> {
    try {
      console.log('Starting news content aggregation...');
      
      const [newsApiArticles, googleNewsArticles, rssArticles, googleAIArticles] = await Promise.all([
        this.fetchFromNewsAPI(3),
        this.fetchFromGoogleNews(3),
        this.fetchFromRSSSources(6),
        this.fetchGoogleAINews(5)
      ]);

      // Save articles by platform
      await Promise.all([
        this.saveArticlesToDatabase(newsApiArticles, 'newsapi'),
        this.saveArticlesToDatabase(googleNewsArticles, 'google-news'),
        this.saveArticlesToDatabase(rssArticles, 'rss'),
        this.saveArticlesToDatabase(googleAIArticles, 'google-ai')
      ]);

      const totalCount = newsApiArticles.length + googleNewsArticles.length + rssArticles.length + googleAIArticles.length;
      
      console.log(`News aggregation completed: ${totalCount} articles processed`);
      return { success: true, count: totalCount };
      
    } catch (error) {
      console.error('News aggregation failed:', error);
      return { 
        success: false, 
        count: 0, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}
