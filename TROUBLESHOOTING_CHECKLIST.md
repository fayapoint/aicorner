# AI Corner Troubleshooting Checklist

## 🚨 EMERGENCY CHECKLIST - Run This First

### When APIs Return 405 Method Not Allowed
- [ ] **Check for `public/_redirects` file** - DELETE if exists
- [ ] **Verify API routes exist** in `app/api/` directory
- [ ] **Check HTTP method exports** in route files
- [ ] **Test locally** before assuming deployment issues

### When Admin Panel Shows Empty Content
- [ ] **Test API endpoints directly** (curl or browser)
- [ ] **Check database has multiple documents** (not single objects)
- [ ] **Run seeding script** if database is empty
- [ ] **Verify API returns arrays** not single objects

### When Homepage Shows Only 1 Item
- [ ] **Check API response structure** (should be arrays)
- [ ] **Verify database contains multiple documents**
- [ ] **Check component data handling** for array processing
- [ ] **Test API endpoints independently**

## 🔧 SYSTEMATIC DEBUGGING PROCESS

### Step 1: Environment Verification
```bash
# Check if development server is running
npm run dev

# Verify database connection
curl http://localhost:3000/api/health

# Test basic API endpoints
curl http://localhost:3000/api/videos
curl http://localhost:3000/api/news
```

### Step 2: File System Check
```bash
# Critical: Ensure no _redirects file exists
ls -la public/_redirects  # Should return "No such file"

# Verify API route structure
ls -la app/api/*/route.ts

# Check component files exist
ls -la components/video-card.tsx
ls -la components/news-card.tsx
```

### Step 3: Database Verification
```bash
# Seed database with proper structure
node scripts/seed-database.js

# Verify seeding worked
curl http://localhost:3000/api/videos?limit=5
curl http://localhost:3000/api/news?limit=5
```

### Step 4: API Testing Matrix
| Endpoint | Method | Expected Response | Status |
|----------|--------|-------------------|--------|
| `/api/videos` | GET | `{videos: [...]}` | ✅/❌ |
| `/api/news` | GET | `{articles: [...]}` | ✅/❌ |
| `/api/videos` | POST | `{...}` or error | ✅/❌ |
| `/api/news` | POST | `{...}` or error | ✅/❌ |

## 🐛 SPECIFIC ERROR SOLUTIONS

### Error: "Cannot read properties of undefined (reading 'toLocaleString')"
**Location**: Video/News components
**Cause**: Undefined values being processed
**Solution**:
```typescript
// Replace
{video.views.toLocaleString()}

// With
{(video.views ?? 0).toLocaleString()}
```

### Error: "404 Page Not Found" for /videos/[slug]
**Cause**: Missing dynamic route file
**Solution**: Ensure `app/videos/[slug]/page.tsx` exists

### Error: "Failed to fetch" in Admin Panel
**Cause**: API routes not accessible
**Solution**: 
1. Remove `public/_redirects` file
2. Verify API route exports
3. Check authentication headers

### Error: Build Fails
**Common Causes**:
- [ ] TypeScript errors in components
- [ ] Missing dependencies
- [ ] Invalid Next.js configuration
- [ ] Circular imports

## 📊 HEALTH CHECK COMMANDS

### Quick Health Check
```bash
# 1. API Health
curl http://localhost:3000/api/health

# 2. Database Connection
curl http://localhost:3000/api/test-db

# 3. Content APIs
curl http://localhost:3000/api/videos?limit=1
curl http://localhost:3000/api/news?limit=1

# 4. Build Test
npm run build
```

### Expected Responses
```json
// /api/health
{"status":"ok","timestamp":"...","service":"AI Corner API"}

// /api/test-db  
{"status":"success","message":"MongoDB connection successful"}

// /api/videos
{"videos":[...],"totalCount":N,"currentPage":1}

// /api/news
{"articles":[...],"totalCount":N,"currentPage":1}
```

## 🔍 DEBUGGING TOOLS

### Browser Developer Tools
- **Network Tab**: Check API request/response status codes
- **Console Tab**: Look for JavaScript errors
- **Application Tab**: Check localStorage/sessionStorage

### Command Line Tools
```bash
# Test API endpoints
curl -v http://localhost:3000/api/videos

# Check file permissions
ls -la public/

# Monitor logs
npm run dev | grep -i error
```

### Database Debugging
```bash
# Connect to MongoDB (if local)
mongosh

# Check collections
use aicorner
db.videos.find().limit(5)
db.news.find().limit(5)
```

## 🚀 DEPLOYMENT DEBUGGING

### Pre-Deployment Checklist
- [ ] `npm run build` succeeds locally
- [ ] No `public/_redirects` file exists
- [ ] All API routes return expected data
- [ ] Database is properly seeded
- [ ] Environment variables are set

### Post-Deployment Issues
1. **Check Netlify Function Logs**
2. **Verify Environment Variables**
3. **Test API endpoints on live site**
4. **Check Netlify Build Logs**

### Common Deployment Fixes
```bash
# Clear Netlify cache and redeploy
# In Netlify dashboard: Site settings > Build & deploy > Clear cache

# Verify environment variables match local .env
# Check: Database URL, API keys, etc.
```

## 📝 LOGGING & MONITORING

### Add Debug Logging
```typescript
// In API routes
console.log('API called:', request.url);
console.log('Database response:', data);

// In components
console.log('Component data:', { videos, news });
```

### Monitor Key Metrics
- API response times
- Database connection status
- Error rates by endpoint
- User interaction success rates

## 🎯 SUCCESS CRITERIA

### All Systems Operational When:
- [ ] Homepage displays multiple videos and news
- [ ] Admin panel shows all database content
- [ ] Video clicks navigate to detail pages
- [ ] All API endpoints return 200 status codes
- [ ] No console errors in browser
- [ ] Build completes without warnings

---

**Remember: Always start with the emergency checklist, then work through systematic debugging. Most issues are caused by `_redirects` file conflicts or database structure problems.**
