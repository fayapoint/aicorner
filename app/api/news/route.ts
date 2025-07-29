import { NextRequest, NextResponse } from 'next/server';

const mockArticles = [
  {
    _id: '1',
    title: 'Getting Started with AI in 2024',
    slug: 'getting-started-with-ai-2024',
    excerpt: 'A comprehensive guide to understanding artificial intelligence.',
    content: '<p>Mock content for local development</p>',
    featuredImage: {
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjM2NmYxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BSSBJbGx1c3RyYXRpb248L3RleHQ+PC9zdmc+',
      alt: 'AI illustration',
      publicId: 'sample-image-1'
    },
    category: 'AI Basics',
    tags: ['AI', 'Beginner', '2024'],
    status: 'published',
    views: 1250,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Advanced Machine Learning Techniques',
    slug: 'advanced-ml-techniques',
    excerpt: 'Explore cutting-edge ML algorithms and their applications.',
    content: '<p>Mock content for local development</p>',
    featuredImage: {
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOGI1Y2Y2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NTCBJbGx1c3RyYXRpb248L3RleHQ+PC9zdmc+',
      alt: 'ML illustration',
      publicId: 'sample-image-2'
    },
    category: 'Machine Learning',
    tags: ['ML', 'Advanced', 'Algorithms'],
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
  
  let filteredArticles = mockArticles;
  if (status) {
    filteredArticles = mockArticles.filter(article => article.status === status);
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
  
  return NextResponse.json({
    articles: paginatedArticles,
    totalCount: filteredArticles.length,
    currentPage: page,
    totalPages: Math.ceil(filteredArticles.length / limit)
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
    
    const articleData = await request.json();
    const newArticle = {
      _id: Date.now().toString(),
      ...articleData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: articleData.status === 'published' ? new Date().toISOString() : null,
      views: 0
    };
    
    console.log('Mock article created:', newArticle.title);
    
    return NextResponse.json(newArticle, { status: 201 });
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
