# AI Corner - Content Aggregation Setup Guide

## 🎯 Quick Setup (You're Almost Ready!)

Since you already have Google Cloud project with YouTube Data API v3 enabled, you just need to create the right type of credentials and add a few environment variables.

## Step 1: Create YouTube API Key

### In Google Cloud Console:
1. Go to **Credentials** (left sidebar)
2. Click **"+ CREATE CREDENTIALS"**
3. Select **"API key"** (not OAuth 2.0)
4. Copy the generated API key
5. **Recommended**: Click "Restrict Key" → Select "YouTube Data API v3"

### Your Current Setup:
- ✅ Project ID: `makeautomation-429815`
- ✅ YouTube Data API v3: Enabled
- ✅ Client ID: `167078774916-ktdd044k8l528goetmjc7pdqkgrbranc.apps.googleusercontent.com`
- ❌ Need: API Key (different from OAuth credentials)

## Step 2: Get NewsAPI Key (Optional)

1. Go to [NewsAPI.org](https://newsapi.org/)
2. Sign up for free account
3. Get your API key (100 requests/day free)

## Step 3: Environment Variables

Create `.env.local` file in your project root:

```env
# Existing variables (keep these)
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
ADMIN_SECRET_KEY=your_admin_password
JWT_SECRET=your_jwt_secret

# New variables for content aggregation
YOUTUBE_API_KEY=your_youtube_api_key_here
NEWS_API_KEY=your_newsapi_key_here
ENABLE_SCHEDULER=true
```

## Step 4: Test the System

### Local Testing:
1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/admin/aggregation`
3. Click "Run Manual Aggregation"
4. Watch the results in real-time

### Expected Results:
- ✅ YouTube: 3 AI videos fetched
- ✅ Google News: 3 articles via RSS
- ✅ RSS Sources: 6 articles from tech sites
- ✅ Google AI Blog: 5 posts
- ❌ NewsAPI: Only if you added the key

## Step 5: Deploy to Production

### Add Environment Variables to Netlify:
1. Go to Netlify Dashboard → Your Site → Site Settings
2. Go to "Environment Variables"
3. Add all the variables from your `.env.local`

### The system will automatically:
- Start the scheduler in production
- Run daily at 6:00 AM EST
- Aggregate content from all sources
- Store in your MongoDB database

## 🎯 What Happens Next

### Daily Automation:
- **6:00 AM EST**: System automatically runs
- **YouTube**: Searches for trending AI videos
- **News Sources**: Fetches latest AI articles
- **Processing**: Filters for quality and relevance
- **Storage**: Saves to database with metadata
- **Logging**: Records success/failure for monitoring

### Content Targets:
- 3 YouTube AI videos
- 3 Google News articles  
- 6 RSS news articles
- 5 Google AI blog posts
- **Total**: ~17 pieces of content daily

## 🔍 Monitoring

### Admin Dashboard (`/admin/aggregation`):
- Real-time status
- Success/failure statistics
- Platform-by-platform results
- Manual trigger controls
- Comprehensive logs

### API Endpoints:
- `GET /api/aggregation?action=status` - System status
- `GET /api/aggregation?action=logs` - Aggregation history
- `POST /api/aggregation` - Manual trigger (admin only)

## 🛠️ Troubleshooting

### Common Issues:

1. **"YouTube API key not found"**
   - Make sure you created an API Key (not OAuth credentials)
   - Check environment variable name: `YOUTUBE_API_KEY`

2. **"No videos found"**
   - API key might be restricted to wrong APIs
   - Check quota limits (10,000 requests/day)

3. **"Aggregation failed"**
   - Check admin dashboard logs
   - Verify internet connectivity
   - Some RSS feeds might be temporarily down (normal)

### Testing Commands:
```bash
# Test YouTube API directly
curl "https://www.googleapis.com/youtube/v3/search?part=snippet&q=artificial+intelligence&key=YOUR_API_KEY"

# Check aggregation status
curl "http://localhost:3000/api/aggregation?action=status"
```

## 📊 Expected Performance

### API Quotas:
- **YouTube**: 10,000 requests/day (uses ~50/day)
- **NewsAPI**: 100 requests/day (uses ~10/day)
- **RSS Feeds**: No limits (direct parsing)

### Content Quality:
- Relevance filtering for AI-related content
- Duplicate detection prevents repeats
- Quality scoring based on views/engagement
- Source reputation weighting

## 🚀 Ready to Go!

Once you add the YouTube API key, your system will be fully operational:

1. ✅ **Database**: Extended with aggregation fields
2. ✅ **Services**: YouTube + News aggregators ready
3. ✅ **Scheduler**: Daily automation configured
4. ✅ **Admin Panel**: Management interface complete
5. ✅ **APIs**: Monitoring endpoints active

Just add the API key and you're live! 🎉

## 🔮 Next Steps (Optional)

After the system is running:
1. **Monitor first week** - Check daily results
2. **Adjust filtering** - Fine-tune relevance keywords
3. **Add more sources** - Expand RSS feed list
4. **Social media** - Implement Instagram/TikTok alternatives
5. **Analytics** - Track content performance

The system is designed to work autonomously once configured!
