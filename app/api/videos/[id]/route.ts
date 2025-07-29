import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Video from '@/models/Video';

// Mock video for development/fallback
const mockVideo = {
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
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Try to connect to MongoDB, but fallback to mock data if it fails
    let useDatabase = true;
    try {
      await connectDB();
    } catch (dbError) {
      console.warn('Database connection failed, using mock data:', dbError);
      useDatabase = false;
    }

    let video: any;

    if (useDatabase) {
      video = await (Video as any).findById(params.id).lean();
    } else {
      // Use mock data
      if (params.id === '1') {
        video = { ...mockVideo };
        // Simulate view increment
        video.views = (video.views || 0) + 1;
      }
    }

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(video);

  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const body = await request.json();

    // Prepare update data with proper defaults
    const updateData = {
      ...body,
      updatedAt: new Date()
    };

    const video = await (Video as any).findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(video);

  } catch (error: any) {
    console.error('Error updating video:', error);

    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update video' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const video = await (Video as any).findByIdAndDelete(params.id);

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Video deleted successfully' });

  } catch (error) {
    console.error('Error deleting video:', error);
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    );
  }
}
