import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Video from '@/models/Video';
import { VideoFilters } from '@/types/news';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    
    const filters: VideoFilters = {
      category: searchParams.get('category') || undefined,
      tags: searchParams.get('tags')?.split(',') || undefined,
      status: (searchParams.get('status') as 'draft' | 'published') || 'published',
      search: searchParams.get('search') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      sortBy: (searchParams.get('sortBy') as any) || 'publishedAt',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    };

    // Build query
    const query: any = {};
    
    if (filters.status) {
      query.status = filters.status;
    }
    
    if (filters.category) {
      query.category = filters.category;
    }
    
    if (filters.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }
    
    if (filters.search) {
      query.$text = { $search: filters.search };
    }

    // Calculate pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    // Build sort object
    const sort: any = {};
    if (filters.sortBy) {
      sort[filters.sortBy] = filters.sortOrder === 'asc' ? 1 : -1;
    }

    // Execute query
    const [videos, totalCount] = await Promise.all([
      (Video as any).find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      (Video as any).countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      videos,
      totalCount,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });

  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Ensure required fields have defaults
    const videoData = {
      title: body.title || 'Untitled Video',
      description: body.description || '',
      videoUrl: body.videoUrl || '',
      thumbnailUrl: body.thumbnailUrl || '',
      publicId: body.publicId || '',
      duration: body.duration || 0,
      category: body.category || 'Getting Started',
      tags: body.tags || [],
      status: body.status || 'draft',
      views: body.views || 0,
      likes: body.likes || 0
    };

    const video = new Video(videoData);
    await video.save();

    return NextResponse.json(video, { status: 201 });

  } catch (error: any) {
    console.error('Error creating video:', error);

    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    );
  }
}
