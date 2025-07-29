import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Video from '@/models/Video';
import { VideoFilters } from '@/types/news';

// Mock data for development/fallback
const mockVideos = [
  {
    _id: '1',
    title: 'Introduction to Neural Networks',
    description: 'Learn the basics of neural networks and how they work in AI systems.',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjM2NmYxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5OZXVyYWwgTmV0d29ya3M8L3RleHQ+PC9zdmc+',
    publicId: 'sample-video-1',
    duration: 300,
    category: 'AI Education',
    tags: ['Neural Networks', 'AI', 'Education'],
    status: 'published',
    views: 2150,
    likes: 89,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Deep Learning Fundamentals',
    description: 'Explore the core concepts of deep learning and its applications.',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOGI1Y2Y2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5EZWVwIExlYXJuaW5nPC90ZXh0Pjwvc3ZnPg==',
    publicId: 'sample-video-2',
    duration: 450,
    category: 'Deep Learning',
    tags: ['Deep Learning', 'AI', 'Advanced'],
    status: 'published',
    views: 1890,
    likes: 76,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    publishedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: '3',
    title: 'Computer Vision Basics',
    description: 'Understanding how computers can interpret and analyze visual information.',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTBiOTgxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Db21wdXRlciBWaXNpb248L3RleHQ+PC9zdmc+',
    publicId: 'sample-video-3',
    duration: 600,
    category: 'Computer Vision',
    tags: ['Computer Vision', 'Image Processing', 'AI'],
    status: 'draft',
    views: 0,
    likes: 0,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    publishedAt: new Date(Date.now() - 172800000).toISOString()
  }
];

export async function GET(request: NextRequest) {
  try {
    // Try to connect to MongoDB, but fallback to mock data if it fails
    let useDatabase = true;
    try {
      await connectDB();
    } catch (dbError) {
      console.warn('Database connection failed, using mock data:', dbError);
      useDatabase = false;
    }

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

    let videos, totalCount;

    if (useDatabase) {
      // Execute database query
      [videos, totalCount] = await Promise.all([
        (Video as any).find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .lean(),
        (Video as any).countDocuments(query)
      ]);
    } else {
      // Use mock data
      let filteredVideos = mockVideos;

      // Apply filters to mock data
      if (filters.status && filters.status !== 'published') {
        filteredVideos = filteredVideos.filter(video => video.status === filters.status);
      }

      if (filters.category) {
        filteredVideos = filteredVideos.filter(video => video.category === filters.category);
      }

      if (filters.search) {
        filteredVideos = filteredVideos.filter(video =>
          video.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
          video.description.toLowerCase().includes(filters.search!.toLowerCase())
        );
      }

      // Apply pagination to mock data
      totalCount = filteredVideos.length;
      videos = filteredVideos.slice(skip, skip + limit);
    }

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
