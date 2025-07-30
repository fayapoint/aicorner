import mongoose, { Schema, Document } from 'mongoose';
import { NewsArticle } from '@/types/news';

export interface INewsArticle extends Omit<NewsArticle, '_id'>, Document {}

const NewsSchema = new Schema<INewsArticle>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  featuredImage: {
    url: {
      type: String,
      required: [true, 'Featured image URL is required']
    },
    publicId: {
      type: String,
      required: [true, 'Featured image public ID is required']
    },
    alt: {
      type: String,
      required: [true, 'Featured image alt text is required']
    }
  },
  author: {
    name: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true
    },
    avatar: {
      type: String,
      trim: true
    }
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  publishedAt: {
    type: Date
  },
  seo: {
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [60, 'Meta title cannot exceed 60 characters']
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description cannot exceed 160 characters']
    },
    keywords: [{
      type: String,
      trim: true
    }]
  },
  readTime: {
    type: Number,
    default: 1
  },
  views: {
    type: Number,
    default: 0
  },
  // Automated content aggregation fields
  source: {
    platform: {
      type: String,
      enum: ['manual', 'newsapi', 'google-news', 'rss', 'google-ai'],
      default: 'manual'
    },
    originalUrl: {
      type: String,
      trim: true
    },
    apiId: {
      type: String,
      trim: true
    },
    aggregatedAt: {
      type: Date
    },
    lastUpdated: {
      type: Date
    }
  },
  aggregation: {
    isAutomated: {
      type: Boolean,
      default: false
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
      default: 1
    },
    relevanceScore: {
      type: Number,
      min: 0,
      max: 1
    },
    duplicateCheck: {
      type: Boolean,
      default: false
    },
    processed: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
NewsSchema.index({ status: 1, publishedAt: -1 });
NewsSchema.index({ category: 1, status: 1 });
NewsSchema.index({ tags: 1, status: 1 });
NewsSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

// Pre-save middleware to generate slug and set publishedAt
NewsSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  // Calculate read time (average 200 words per minute)
  if (this.isModified('content')) {
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / 200);
  }
  
  next();
});

export default mongoose.models.News || mongoose.model<INewsArticle>('News', NewsSchema);
