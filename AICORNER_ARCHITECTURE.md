# AI Corner Platform Architecture

## 🏗️ SYSTEM OVERVIEW

AI Corner is a comprehensive AI platform built with Next.js 14 App Router, serving users from AI beginners to experts. It provides 100+ AI tools, training resources, and content management capabilities.

## 🔧 TECHNOLOGY STACK

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom glassmorphism effects
- **Animations**: Framer Motion for smooth transitions
- **UI Components**: Custom components with consistent design system
- **TypeScript**: Full type safety across the application

### Backend
- **API Routes**: Next.js App Router API routes (`app/api/`)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based with mock tokens for development
- **File Uploads**: Cloudinary integration for media management

### Deployment
- **Platform**: Netlify with `@netlify/plugin-nextjs`
- **Build**: Static generation with server-side rendering
- **CDN**: Netlify Edge Network for global distribution

## 📁 PROJECT STRUCTURE

```
aicorner/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── login/route.ts    # User login
│   │   │   └── verify/route.ts   # Token verification
│   │   ├── news/                 # News/Articles API
│   │   │   ├── route.ts          # CRUD operations
│   │   │   └── [slug]/route.ts   # Individual article
│   │   ├── videos/               # Videos API
│   │   │   ├── route.ts          # CRUD operations
│   │   │   └── [slug]/route.ts   # Individual video
│   │   ├── health/route.ts       # Health check
│   │   ├── test-db/route.ts      # Database connection test
│   │   └── seed/route.ts         # Database seeding
│   ├── admin/                    # Admin Panel
│   │   ├── layout.tsx            # Admin layout
│   │   ├── page.tsx              # Dashboard
│   │   ├── news/                 # News management
│   │   └── videos/               # Video management
│   ├── videos/                   # Public video pages
│   │   ├── page.tsx              # Video gallery
│   │   └── [slug]/page.tsx       # Individual video page
│   ├── news/                     # Public news pages
│   │   ├── page.tsx              # News listing
│   │   └── [slug]/page.tsx       # Individual article page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # Reusable UI Components
│   ├── ui/                       # Base UI components
│   ├── video-card.tsx            # Video display component
│   ├── news-card.tsx             # News display component
│   ├── homepage-news.tsx         # Homepage content
│   └── [other-components].tsx
├── lib/                          # Utilities & Configuration
│   ├── mongodb.ts                # Database connection
│   ├── auth.ts                   # Authentication utilities
│   └── utils.ts                  # General utilities
├── models/                       # Mongoose Schemas
│   ├── News.ts                   # News article schema
│   ├── Video.ts                  # Video schema
│   └── User.ts                   # User schema
├── types/                        # TypeScript Definitions
│   ├── news.ts                   # News/Video interfaces
│   └── auth.ts                   # Authentication types
├── scripts/                      # Utility Scripts
│   └── seed-database.js          # Database seeding
├── public/                       # Static Assets
│   ├── images/                   # Image assets
│   └── icons/                    # Icon files
├── netlify.toml                  # Netlify configuration
├── next.config.js                # Next.js configuration
└── package.json                  # Dependencies
```

## 🗄️ DATABASE ARCHITECTURE

### MongoDB Collections

#### News Collection
```typescript
interface NewsArticle {
  _id: string;
  title: string;              // Required, max 200 chars
  slug: string;               // Required, unique, lowercase
  excerpt: string;            // Required, max 500 chars
  content: string;            // Required, HTML content
  featuredImage: {
    url: string;              // Required, image URL
    publicId: string;         // Required, Cloudinary ID
    alt: string;              // Required, alt text
  };
  author: {
    name: string;             // Required
    avatar?: string;          // Optional avatar URL
  };
  category: string;           // Required
  tags: string[];             // Array of tags
  status: 'draft' | 'published' | 'archived';
  views: number;              // View count
  readTime: number;           // Estimated read time in minutes
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}
```

#### Videos Collection
```typescript
interface Video {
  _id: string;
  title: string;              // Required
  slug?: string;              // Optional, auto-generated
  description: string;        // Required
  videoUrl: string;           // Required, video file URL
  thumbnailUrl: string;       // Required, thumbnail image
  publicId?: string;          // Cloudinary public ID
  duration: number;           // Duration in seconds
  category: string;           // Required
  tags: string[];             // Array of tags
  status: 'draft' | 'published' | 'archived';
  views: number;              // View count
  likes: number;              // Like count
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}
```

## 🔌 API ARCHITECTURE

### API Route Pattern
All API routes follow Next.js App Router conventions:

```typescript
// app/api/[resource]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Model from '@/models/Model';

export async function GET(request: NextRequest) {
  // Handle GET requests
}

export async function POST(request: NextRequest) {
  // Handle POST requests
}

export async function PUT(request: NextRequest) {
  // Handle PUT requests
}

export async function DELETE(request: NextRequest) {
  // Handle DELETE requests
}

export async function OPTIONS() {
  // Handle CORS preflight
}
```

### API Response Format
```typescript
// Success Response
{
  "data": [...],              // Array for collections
  "totalCount": number,       // Total items
  "currentPage": number,      // Current page
  "totalPages": number,       // Total pages
  "hasNextPage": boolean,     // Pagination flag
  "hasPrevPage": boolean      // Pagination flag
}

// Error Response
{
  "error": "Error message",
  "code": "ERROR_CODE",       // Optional error code
  "details": {...}            // Optional error details
}
```

## 🎨 COMPONENT ARCHITECTURE

### Component Hierarchy
```
App Layout
├── Navigation
├── Page Content
│   ├── Homepage
│   │   ├── Hero Section
│   │   ├── Video Gallery (VideoCard[])
│   │   └── News Section (NewsCard[])
│   ├── Video Pages
│   │   ├── Video Gallery (VideoCard[])
│   │   └── Video Detail
│   └── Admin Panel
│       ├── Dashboard
│       ├── Content Management
│       └── Analytics
└── Footer
```

### Component Props Pattern
```typescript
interface ComponentProps {
  data: DataType;             // Main data
  loading?: boolean;          // Loading state
  error?: string;             // Error message
  onAction?: (data) => void;  // Action handlers
  className?: string;         // Custom styling
}
```

## 🔐 AUTHENTICATION FLOW

### Development Authentication
- Uses mock JWT token: `mock-jwt-token-for-local-development`
- Stored in localStorage for persistence
- Validated on each API request

### Production Authentication (Future)
- JWT-based authentication
- Secure token storage
- Role-based access control
- Session management

## 🚀 DEPLOYMENT ARCHITECTURE

### Netlify Configuration
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Environment Variables
```bash
# Database
MONGODB_URI=mongodb://...

# Authentication
JWT_SECRET=your-secret-key

# File Upload
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret

# Application
NEXT_PUBLIC_APP_URL=https://ainseconds.shop
```

## 📊 DATA FLOW

### Content Display Flow
1. **Page Load** → Component mounts
2. **API Call** → Fetch data from `/api/[resource]`
3. **Database Query** → MongoDB via Mongoose
4. **Response** → Formatted JSON with arrays
5. **Render** → Components display data
6. **User Interaction** → Navigation/actions

### Content Management Flow
1. **Admin Login** → Authentication check
2. **Form Submission** → POST/PUT to API
3. **Validation** → Server-side validation
4. **Database Update** → MongoDB operation
5. **Response** → Success/error feedback
6. **UI Update** → Refresh content list

## 🔍 MONITORING & DEBUGGING

### Health Checks
- `/api/health` - Application status
- `/api/test-db` - Database connectivity
- Build status monitoring
- Error tracking and logging

### Performance Monitoring
- API response times
- Database query performance
- Page load metrics
- User interaction tracking

---

**This architecture ensures scalability, maintainability, and optimal performance for the AI Corner platform.**
