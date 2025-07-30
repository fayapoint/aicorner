# AI Corner Component & Asset Inventory

## 🚨 NEVER RECREATE - EXISTING COMPONENTS

### 📱 Pages (app/ directory)
- **`app/page.tsx`** - Homepage with hero, video gallery, news section
- **`app/layout.tsx`** - Root layout with Header/Footer, global styles
- **`app/videos/page.tsx`** - Video gallery page with filtering
- **`app/videos/[slug]/page.tsx`** - Individual video detail pages
- **`app/news/page.tsx`** - News listing page
- **`app/news/[slug]/page.tsx`** - Individual article pages
- **`app/admin/`** - Complete admin panel with dashboard, content management
- **`app/tools/page.tsx`** - AI tools showcase page
- **`app/starter/page.tsx`** - Beginner-friendly AI tools
- **`app/integrations/page.tsx`** - Third-party integrations
- **`app/dashboard/`** - User dashboard with layout
- **`app/support/page.tsx`** - Support and help pages
- **`app/tutorials/page.tsx`** - Tutorial and learning resources

### 🔌 API Routes (app/api/ directory)
- **`app/api/auth/login/route.ts`** - User authentication
- **`app/api/auth/verify/route.ts`** - Token verification
- **`app/api/news/route.ts`** - News CRUD operations (GET, POST, OPTIONS)
- **`app/api/news/[slug]/route.ts`** - Individual article by slug
- **`app/api/videos/route.ts`** - Video CRUD operations (GET, POST, OPTIONS)
- **`app/api/videos/[slug]/route.ts`** - Individual video by slug
- **`app/api/videos-single/route.ts`** - Single video by ID
- **`app/api/news-single/route.ts`** - Single article by ID
- **`app/api/health/route.ts`** - Health check endpoint
- **`app/api/test-db/route.ts`** - Database connection test
- **`app/api/seed/route.ts`** - Database seeding endpoint

### 🧩 UI Components (components/ directory)
- **`components/header.tsx`** - Main navigation with glassmorphism
- **`components/footer.tsx`** - Site footer with links and branding
- **`components/video-card.tsx`** - Video display card with animations
- **`components/news-card.tsx`** - News article display card
- **`components/homepage-news.tsx`** - Homepage content sections
- **`components/admin-layout.tsx`** - Admin panel layout with sidebar
- **`components/video-modal.tsx`** - Video playback modal

### 🎨 UI System (components/ui/ directory)
- **`components/ui/button.tsx`** - Button component with variants
- **`components/ui/card.tsx`** - Card container component
- **`components/ui/badge.tsx`** - Badge/tag component
- **`components/ui/input.tsx`** - Form input component
- **`components/ui/textarea.tsx`** - Text area component
- **`components/ui/select.tsx`** - Select dropdown component
- **`components/ui/dialog.tsx`** - Modal dialog component
- **`components/ui/avatar.tsx`** - Avatar component (stub)
- **`components/ui/table.tsx`** - Table component (stub)
- **`components/ui/tooltip.tsx`** - Tooltip component (stub)

### 🗄️ Database Models (models/ directory)
- **`models/News.ts`** - News article schema with validation
- **`models/Video.ts`** - Video schema with metadata
- **`models/User.ts`** - User authentication schema

### 🔧 Utilities (lib/ directory)
- **`lib/mongodb.ts`** - Database connection utility
- **`lib/auth.ts`** - Authentication utilities
- **`lib/utils.ts`** - General utility functions
- **`lib/api-config.ts`** - API endpoint configuration

### 📝 Types (types/ directory)
- **`types/news.ts`** - News and Video TypeScript interfaces
- **`types/auth.ts`** - Authentication type definitions

### 🛠️ Scripts (scripts/ directory)
- **`scripts/seed-database.js`** - Database seeding with sample data

### ⚙️ Configuration Files
- **`next.config.js`** - Next.js configuration with image domains
- **`netlify.toml`** - Netlify deployment configuration
- **`tailwind.config.js`** - Tailwind CSS configuration
- **`tsconfig.json`** - TypeScript configuration
- **`package.json`** - Dependencies and scripts

## 🎯 COMPONENT FEATURES & CAPABILITIES

### Video Components
- **VideoCard**: Hover animations, play buttons, duration display, category badges
- **Video Detail Page**: Full video player, metadata, related content
- **Video Modal**: Popup video player with controls

### News Components  
- **NewsCard**: Article preview, author info, read time, category tags
- **News Detail Page**: Full article view, SEO optimization, social sharing

### Admin Components
- **Admin Layout**: Sidebar navigation, user management, content CRUD
- **Dashboard**: Analytics, content overview, quick actions

### UI System Features
- **Glassmorphism Effects**: Backdrop blur, transparency, modern styling
- **Framer Motion**: Smooth animations, page transitions, hover effects
- **Responsive Design**: Mobile-first, tablet, desktop optimizations
- **Dark Theme**: Consistent dark mode throughout application

## 🚀 EXISTING FUNCTIONALITY

### Authentication System
- Mock JWT tokens for development
- Admin login with environment variable
- Token verification middleware
- Protected admin routes

### Content Management
- Full CRUD operations for news and videos
- Image upload integration (Cloudinary ready)
- SEO metadata management
- Content status workflow (draft/published/archived)

### Database Operations
- MongoDB connection with Mongoose
- Proper schema validation
- Automatic slug generation
- View count tracking
- Pagination support

### API Architecture
- RESTful endpoints with proper HTTP methods
- Error handling with appropriate status codes
- CORS support with OPTIONS methods
- Consistent response formats

## 🔍 BEFORE CREATING NEW COMPONENTS

### Always Check First:
1. **Search existing components** in `/components` directory
2. **Review UI system** in `/components/ui` for base components
3. **Check pages** in `/app` directory for similar functionality
4. **Verify API routes** in `/app/api` for backend needs
5. **Review models** in `/models` for data structures

### Reuse Patterns:
- **Styling**: Use existing Tailwind classes and glassmorphism patterns
- **Animations**: Reuse Framer Motion configurations
- **Data Handling**: Follow existing API response patterns
- **Error Handling**: Use established error boundary patterns
- **TypeScript**: Extend existing interfaces from `/types`

### Integration Points:
- **Database**: Use existing Mongoose models and connection
- **Authentication**: Integrate with existing auth system
- **Styling**: Follow established design system
- **API**: Use existing endpoint patterns and error handling

## 📋 COMPONENT DEPENDENCIES

### Required Packages (Already Installed)
- **Next.js 14**: App Router, API routes, image optimization
- **React 18**: Hooks, components, TypeScript support
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animation library
- **Mongoose**: MongoDB ODM
- **Lucide React**: Icon library
- **clsx**: Conditional class names

### Design System
- **Colors**: Purple/pink gradients, slate backgrounds
- **Typography**: Inter font, responsive text sizes
- **Spacing**: Consistent padding/margin scale
- **Borders**: Rounded corners, subtle borders
- **Effects**: Glassmorphism, backdrop blur, shadows

---

**CRITICAL RULE: Always check this inventory before creating new components. Most functionality already exists and should be reused or extended, not recreated.**
