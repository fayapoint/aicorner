import { NextRequest, NextResponse } from 'next/server';

const mockArticle = {
  _id: '1',
  title: 'Getting Started with AI in 2024',
  slug: 'getting-started-with-ai-2024',
  excerpt: 'A comprehensive guide to understanding artificial intelligence.',
  content: '<p>Mock content for local development</p>',
  featuredImage: null,
  category: 'AI Basics',
  tags: ['AI', 'Beginner', '2024'],
  status: 'published',
  views: 1250,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  publishedAt: new Date().toISOString()
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  return NextResponse.json({
    ...mockArticle,
    _id: id || '1'
  });
}

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const updateData = await request.json();
    
    const updatedArticle = {
      ...mockArticle,
      ...updateData,
      _id: id || '1',
      updatedAt: new Date().toISOString()
    };
    
    console.log('Mock article updated:', updatedArticle.title);
    
    return NextResponse.json(updatedArticle);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    console.log('Mock article deleted:', id);
    
    return NextResponse.json({ message: 'Article deleted successfully' });
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
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
