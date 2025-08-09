# AI Corner - Automated Content Aggregation System

## 🤖 Overview

The AI Corner platform now includes a comprehensive automated content aggregation system that fetches trending AI content from multiple sources daily. This system automatically collects:

- **3 YouTube AI videos** daily from trending/relevant content
- **3 Google News articles** about AI developments  
- **6 RSS news articles** from reputable AI/tech sources
- **5 Google AI blog posts** from official Google AI channels
- **Instagram & TikTok content** (planned - requires alternative approaches)

## 🚀 Features

### ✅ Implemented
- **YouTube Data API v3 Integration** - Fetches trending AI videos
- **NewsAPI.org Integration** - Gets latest AI news articles
- **Google News RSS Feeds** - Aggregates AI news from Google News
- **Multiple RSS Sources** - VentureBeat, AI News, MIT Tech Review, etc.
- **Google AI Blog Integration** - Official Google AI announcements
- **Automated Daily Scheduling** - Runs at 6:00 AM EST daily
- **Duplicate Detection** - Prevents duplicate content
- **Quality Filtering** - Relevance scoring and content validation
- **Admin Dashboard** - Monitor and manage aggregation
- **Manual Trigger** - Run aggregation on-demand
- **Comprehensive Logging** - Track success/failure rates

### 🔄 In Progress
- **Instagram Content** - Researching API alternatives
- **TikTok Content** - Exploring scraping solutions
- **Enhanced Content Processing** - Better text extraction
- **Advanced Filtering** - ML-based relevance scoring

### ✅ Recent Fixes (2025-08)
- **News schema normalization**: Ensured `News.tags` is an array of strings and `source.platform` is a plain string (enum) when persisting from `lib/services/news-aggregator.ts`. This resolves Mongoose validation errors during saves.
- **Admin import UI accuracy**: The admin import flow now reflects real outcomes (success, partial failure, failure). The scheduler's `importSelectedItems()` returns per-item results, and the API route at `app/api/aggregation/route.ts` passes through correct statuses and messages for partial failures.
- **Safer dev scheduling**: Background jobs initialize only in production or when explicitly enabled; this keeps dev workflows predictable.
- **Navigation consistency**: Global redirects added — `/signup` → `/trial`, `/blog` → `/news`. Footer English links point to existing PT pages via Next.js redirects.

> Note: UI improvements like portalized dropdown menus and stronger backdrop blur were completed in `components/header.tsx` and are tracked in engineering notes (see `docs/UPGRADES-2025-08.md`).

## 📋 Setup Instructions

### 1. API Keys Required

You need to obtain the following API keys:

#### YouTube Data API v3
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "YouTube Data API v3"
4. Create credentials (API Key)
5. Add to environment: `YOUTUBE_API_KEY=your_key_here`

#### NewsAPI.org
1. Sign up at [NewsAPI.org](https://newsapi.org/)
2. Get your free API key (100 requests/day)
3. Add to environment: `NEWS_API_KEY=your_key_here`

### 2. Environment Variables

Add these to your `.env.local` file:

```env
# Content Aggregation APIs
YOUTUBE_API_KEY=your_youtube_api_key_here
NEWS_API_KEY=your_news_api_key_here

# Scheduler Settings (optional)
ENABLE_SCHEDULER=true  # Set to true to enable in development
```

### 3. Database Schema

The system extends existing News and Video models with aggregation metadata:

```typescript
// Added to both News and Video models
source: {
  platform: 'youtube' | 'newsapi' | 'google-news' | 'rss' | 'google-ai',
  originalUrl: string,
  apiId: string,
  aggregatedAt: Date,
  lastUpdated: Date
},
aggregation: {
  isAutomated: boolean,
  confidence: number,
  relevanceScore: number,
  duplicateCheck: boolean,
  processed: boolean
}
```

## 🎯 Usage

### Automatic Operation
- Runs daily at 6:00 AM EST automatically in production
- Fetches content from all configured sources
- Processes and stores in database with metadata
- Logs results for monitoring

### Manual Operation
1. Go to Admin Panel → Content Aggregation
2. Click "Run Manual Aggregation"
3. Monitor progress in real-time
4. View logs and statistics

### API Endpoints
- `GET /api/aggregation?action=status` - Get scheduler status
- `GET /api/aggregation?action=logs` - Get aggregation logs
- `POST /api/aggregation` - Trigger manual aggregation (requires auth)

## 📊 Admin Dashboard

Access the aggregation dashboard at `/admin/aggregation`:

- **Real-time Status** - Current aggregation state
- **Statistics** - Total runs, average items per run
- **Recent Logs** - Success/failure tracking per platform
- **Manual Controls** - Trigger aggregation on-demand
- **Configuration Info** - Current settings and targets

## 🔧 Technical Architecture

### Core Components

1. **YouTubeAggregator** (`lib/services/youtube-aggregator.ts`)
   - Searches for trending AI videos
   - Filters by relevance and quality
   - Extracts metadata and thumbnails

2. **NewsAggregator** (`lib/services/news-aggregator.ts`)
   - Fetches from NewsAPI.org
   - Processes Google News RSS feeds
   - Aggregates from multiple RSS sources
   - Extracts full article content

3. **ContentScheduler** (`lib/services/content-scheduler.ts`)
   - Manages daily cron jobs
   - Coordinates all aggregation services
   - Handles error logging and recovery

4. **Admin Interface** (`app/admin/aggregation/page.tsx`)
   - Real-time monitoring dashboard
   - Manual trigger controls
   - Comprehensive logging display

### Data Flow

1. **Scheduler triggers** at 6:00 AM EST daily
2. **YouTube service** searches for trending AI videos
3. **News service** fetches from multiple sources
4. **Content processing** filters and validates
5. **Database storage** with aggregation metadata
6. **Logging** records success/failure metrics

## 🛠️ Customization

### Adding New Sources

To add new RSS sources, edit `lib/services/news-aggregator.ts`:

```typescript
const rssSources = [
  {
    url: 'https://your-new-source.com/feed',
    name: 'Your Source Name'
  },
  // ... existing sources
];
```

### Adjusting Schedule

Modify the cron schedule in `lib/services/content-scheduler.ts`:

```typescript
// Current: Daily at 6:00 AM EST
cron.schedule('0 6 * * *', async () => {
  // ... aggregation logic
});

// Example: Every 6 hours
cron.schedule('0 */6 * * *', async () => {
  // ... aggregation logic
});
```

### Content Filtering

Adjust AI relevance keywords in both aggregators:

```typescript
const aiKeywords = [
  'artificial intelligence',
  'machine learning',
  'your custom keywords',
  // ... existing keywords
];
```

## 📈 Monitoring & Maintenance

### Health Checks
- Monitor `/api/aggregation?action=status` for system health
- Check logs regularly for failed aggregations
- Verify API key quotas and limits

### Common Issues
1. **API Rate Limits** - YouTube: 10k/day, NewsAPI: 100/day
2. **Network Timeouts** - RSS feeds may be slow
3. **Content Quality** - Adjust relevance scoring as needed
4. **Duplicate Content** - Monitor duplicate detection effectiveness

### Performance Optimization
- Content is processed asynchronously
- Database queries are optimized with indexes
- Failed requests are logged but don't stop other sources
- Graceful degradation when APIs are unavailable

## 🔮 Future Enhancements

### Planned Features
- **Instagram Integration** - Using web scraping or third-party APIs
- **TikTok Integration** - Alternative data sources
- **ML-based Filtering** - Improved content relevance
- **Content Summarization** - AI-generated summaries
- **Trend Analysis** - Identify emerging AI topics
- **User Preferences** - Customizable content types

### Social Media Challenges
Instagram and TikTok have restrictive APIs:
- **Instagram**: Basic Display API limited to user's own content
- **TikTok**: No public content API available
- **Solutions**: Web scraping, third-party services, manual curation

## 📞 Support

For issues or questions about the content aggregation system:
1. Check the admin dashboard logs
2. Verify API keys and quotas
3. Review error messages in server logs
4. Test manual aggregation first

The system is designed to be resilient - if one source fails, others continue working.
