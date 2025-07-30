# AI Corner Development Rules & Procedures

## 🚨 CRITICAL RULES - NEVER VIOLATE

### 1. API Routing Rules
- **NEVER create `public/_redirects` files** - They override Next.js App Router and cause 405 errors
- **ALWAYS let Next.js handle API routing natively** - App Router handles `/api/*` routes automatically
- **API routes are in `app/api/` directory** with `route.ts` files containing HTTP method exports
- **Each API route must export functions**: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS` as needed

### 2. Database Structure Rules
- **Database contains MULTIPLE documents**, not single objects
- **Always verify data structure** before assuming API issues
- **Use proper MongoDB collections** with arrays of documents
- **Never assume single document responses** - always handle arrays

### 3. Troubleshooting Priority Order
1. **Check for `public/_redirects` file** - Remove if exists
2. **Verify database has multiple documents** - Run seeding if needed
3. **Check API route exports** - Ensure proper HTTP methods
4. **Test locally first** - Before assuming deployment issues

## 🏗️ ARCHITECTURE OVERVIEW

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS + Framer Motion animations
- **UI Components**: Custom components with glassmorphism effects
- **Deployment**: Netlify with `@netlify/plugin-nextjs`

### Project Structure
```
app/
├── api/                    # API routes (Next.js App Router)
│   ├── news/route.ts      # News CRUD operations
│   ├── videos/route.ts    # Video CRUD operations
│   ├── auth/              # Authentication routes
│   └── [other]/route.ts   # Other API endpoints
├── admin/                 # Admin panel pages
├── videos/                # Video pages
│   ├── page.tsx          # Video gallery
│   └── [slug]/page.tsx   # Individual video pages
├── news/                  # News pages
└── [other-pages]/         # Other application pages

components/                # Reusable UI components
models/                   # Mongoose schemas
lib/                      # Utilities and configurations
public/                   # Static assets (NO _redirects!)
```

## 📊 DATABASE SCHEMA

### News Collection
- **Multiple documents** with fields: title, slug, excerpt, content, featuredImage, author, category, tags, status, views, readTime, seo, timestamps
- **Required fields**: title, slug, excerpt, content, featuredImage (url, publicId, alt), author.name, category
- **Status values**: 'draft', 'published', 'archived'

### Videos Collection  
- **Multiple documents** with fields: title, slug, description, videoUrl, thumbnailUrl, duration, category, tags, status, views, likes, timestamps
- **Required fields**: title, description, videoUrl, thumbnailUrl, duration, category
- **Status values**: 'draft', 'published', 'archived'

## 🔧 DEVELOPMENT PROCEDURES

### Before Making Changes
1. **Run `codebase-retrieval`** to understand existing code structure
2. **Check current database state** with test API calls
3. **Verify no `public/_redirects` file exists**
4. **Review existing components** before creating new ones

### API Development
1. **Use App Router pattern**: `app/api/[route]/route.ts`
2. **Export HTTP methods**: `export async function GET/POST/PUT/DELETE`
3. **Include OPTIONS method** for CORS if needed
4. **Handle errors properly** with appropriate status codes
5. **Return consistent data structures** with arrays for collections

### Component Development
1. **Check existing components** in `/components` directory
2. **Reuse existing UI patterns** (glassmorphism, animations)
3. **Handle undefined/null values** with nullish coalescing (`??`)
4. **Use proper TypeScript interfaces** from `/types`
5. **Include proper error boundaries** and loading states

### Database Operations
1. **Always seed with multiple documents** using `/scripts/seed-database.js`
2. **Test with proper document arrays** not single objects
3. **Use Mongoose models** from `/models` directory
4. **Handle connection errors gracefully**
5. **Include proper validation** in schemas

## 🚀 DEPLOYMENT PROCEDURES

### Pre-Deployment Checklist
- [ ] No `public/_redirects` file exists
- [ ] Database contains multiple documents
- [ ] All API routes return proper arrays
- [ ] Build completes successfully (`npm run build`)
- [ ] Local testing passes all functionality

### Netlify Configuration
- **Use `netlify.toml`** for configuration, NOT `_redirects`
- **Include `@netlify/plugin-nextjs`** plugin
- **Set proper environment variables** in Netlify dashboard
- **Use Next.js native routing** for all API endpoints

## 🧪 TESTING PROCEDURES

### API Testing
```bash
# Test GET endpoints
curl http://localhost:3000/api/videos
curl http://localhost:3000/api/news

# Test POST endpoints (with auth)
curl -X POST http://localhost:3000/api/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer mock-jwt-token-for-local-development" \
  -d '{"title":"Test","excerpt":"Test","content":"Test","category":"Test"}'
```

### Database Testing
```bash
# Seed database
node scripts/seed-database.js

# Verify multiple documents exist
# Check API responses return arrays
```

## 🔍 COMMON ISSUES & SOLUTIONS

### Issue: 405 Method Not Allowed
- **Cause**: `public/_redirects` file redirecting API routes
- **Solution**: Remove `public/_redirects` file immediately

### Issue: Empty Admin Panel
- **Cause**: Database has single objects instead of multiple documents
- **Solution**: Run seeding script to populate proper document arrays

### Issue: Homepage Shows Only 1 Item
- **Cause**: API returning single object instead of array
- **Solution**: Verify database structure and API response format

### Issue: Video Click Errors
- **Cause**: Undefined values in component props
- **Solution**: Use nullish coalescing (`??`) and proper error handling

## 📝 CODE PATTERNS

### API Route Pattern
```typescript
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Model from '@/models/Model';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const items = await Model.find({}).limit(10);
    return NextResponse.json({ items, totalCount: items.length });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
```

### Component Error Handling Pattern
```typescript
const safeValue = (value ?? 0).toLocaleString();
const safeArray = Array.isArray(data) ? data : [data].filter(Boolean);
```

## 🎯 SUCCESS METRICS

### Deployment Success Indicators
- [ ] Homepage displays multiple videos and news articles
- [ ] Admin panel shows all database content
- [ ] Video clicks navigate to detail pages
- [ ] All API endpoints return proper HTTP status codes
- [ ] No 405 Method Not Allowed errors
- [ ] Database operations work correctly

## 🚀 QUICK REFERENCE COMMANDS

### Development Setup
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Seed database with sample data
node scripts/seed-database.js
```

### API Testing
```bash
# Test GET endpoints
curl http://localhost:3000/api/videos?limit=5
curl http://localhost:3000/api/news?limit=5

# Test POST with authentication
curl -X POST http://localhost:3000/api/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer mock-jwt-token-for-local-development" \
  -d '{"title":"Test","excerpt":"Test excerpt","content":"Test content","category":"AI Basics","featuredImage":{"url":"test.jpg","publicId":"test","alt":"test"},"author":{"name":"Test Author"}}'
```

### Emergency Fixes
```bash
# Remove problematic redirects file
rm public/_redirects

# Reset database with proper structure
node scripts/seed-database.js

# Clear build cache
rm -rf .next
npm run build
```

---

**Remember: When in doubt, check for `_redirects` file first, verify database structure second, then debug code third.**
