export interface NewsArticle {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: {
    url: string;
    publicId: string;
    alt: string;
  };
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  readTime: number; // in minutes
  views: number;
  // Featured content system
  featured?: {
    isFeatured: boolean;
    order?: number; // 1-6 for homepage ordering
  };
  // Automated content aggregation fields
  source?: {
    platform: 'manual' | 'newsapi' | 'google-news' | 'rss' | 'google-ai';
    originalUrl?: string;
    apiId?: string;
    aggregatedAt?: Date;
    lastUpdated?: Date;
  };
  aggregation?: {
    isAutomated: boolean;
    confidence?: number;
    relevanceScore?: number;
    duplicateCheck?: boolean;
    processed?: boolean;
  };
}

export interface Video {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  publicId: string; // Cloudinary public ID
  duration: number; // in seconds
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
  // Featured content system
  featured?: {
    isFeatured: boolean;
    order?: number; // 1-6 for homepage ordering
  };
  // Automated content aggregation fields
  source?: {
    platform: 'manual' | 'youtube' | 'instagram' | 'tiktok';
    originalUrl?: string;
    videoId?: string;
    channelId?: string;
    channelName?: string;
    aggregatedAt?: Date;
    lastUpdated?: Date;
  };
  aggregation?: {
    isAutomated: boolean;
    confidence?: number;
    relevanceScore?: number;
    duplicateCheck?: boolean;
    processed?: boolean;
  };
}

export interface NewsCategory {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  createdAt: Date;
}

export interface VideoCategory {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  createdAt: Date;
}

// API Response types
export interface NewsResponse {
  articles: NewsArticle[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface VideoResponse {
  videos: Video[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Form types for admin
export interface NewsFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  featuredImage?: File;
}

export interface VideoFormData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  videoFile?: File;
  thumbnailFile?: File;
}

// Search and filter types
export interface NewsFilters {
  category?: string;
  tags?: string[];
  status?: 'draft' | 'published';
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'publishedAt' | 'views' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface VideoFilters {
  category?: string;
  tags?: string[];
  status?: 'draft' | 'published';
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'publishedAt' | 'views' | 'title';
  sortOrder?: 'asc' | 'desc';
}
