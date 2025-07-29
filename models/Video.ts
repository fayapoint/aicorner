import mongoose, { Schema, Document } from 'mongoose';
import { Video } from '@/types/news';

export interface IVideo extends Omit<Video, '_id'>, Document {}

const VideoSchema = new Schema<IVideo>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    sparse: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  thumbnailUrl: {
    type: String,
    default: ''
  },
  publicId: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    min: [0, 'Duration cannot be negative'],
    default: 0
  },
  category: {
    type: String,
    trim: true,
    default: ''
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
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
VideoSchema.index({ status: 1, publishedAt: -1 });
VideoSchema.index({ category: 1, status: 1 });
VideoSchema.index({ tags: 1, status: 1 });
VideoSchema.index({ title: 'text', description: 'text' });

// Pre-save middleware to generate slug and set publishedAt
VideoSchema.pre('save', function(next) {
  if (this.title && (!this.slug || this.isModified('title'))) {
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

  next();
});

export default mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);
