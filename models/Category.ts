import mongoose, { Schema, Document } from 'mongoose';
import { NewsCategory, VideoCategory } from '@/types/news';

export interface INewsCategory extends Omit<NewsCategory, '_id'>, Document {}
export interface IVideoCategory extends Omit<VideoCategory, '_id'>, Document {}

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
    match: [/^#[0-9A-F]{6}$/i, 'Color must be a valid hex color']
  }
}, {
  timestamps: true
});

// Indexes
CategorySchema.index({ slug: 1 });
CategorySchema.index({ name: 1 });

// Pre-save middleware to generate slug
CategorySchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  next();
});

export const NewsCategoryModel = mongoose.models.NewsCategory || mongoose.model<INewsCategory>('NewsCategory', CategorySchema);
export const VideoCategoryModel = mongoose.models.VideoCategory || mongoose.model<IVideoCategory>('VideoCategory', CategorySchema);
