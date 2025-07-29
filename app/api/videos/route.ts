import { NextRequest, NextResponse } from 'next/server';

const mockVideos = [
  {
    _id: '1',
    title: 'Introduction to Neural Networks',
    description: 'Learn the basics of neural networks and how they work.',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjM2NmYxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5OZXVyYWwgTmV0d29ya3M8L3RleHQ+PC9zdmc+',
    publicId: 'sample-video-1',
    duration: 300,
    category: 'Neural Networks',
    tags: ['Neural Networks', 'AI', 'Beginner'],
    status: 'published',
    views: 1500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Advanced Deep Learning',
    description: 'Explore advanced concepts in deep learning.',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWY0NDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5EZWVwIExlYXJuaW5nPC90ZXh0Pjwvc3ZnPg==',
    publicId: 'sample-video-2',
    duration: 450,
    category: 'Deep Learning',
    tags: ['Deep Learning', 'AI', 'Advanced'],
    status: 'draft',
    views: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: null
  }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10');
  const page = parseInt(searchParams.get('page') || '1');
  const status = searchParams.get('status');
  
  let filteredVideos = mockVideos;
  if (status) {
    filteredVideos = mockVideos.filter(video => video.status === status);
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedVideos = filteredVideos.slice(startIndex, endIndex);
  
  return NextResponse.json({
    videos: paginatedVideos,
    totalCount: filteredVideos.length,
    currentPage: page,
    totalPages: Math.ceil(filteredVideos.length / limit)
  });
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }
    
    const videoData = await request.json();
    const newVideo = {
      _id: Date.now().toString(),
      ...videoData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: videoData.status === 'published' ? new Date().toISOString() : null,
      views: 0
    };
    
    console.log('Mock video created:', newVideo.title);
    
    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
