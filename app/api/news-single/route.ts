import { NextRequest, NextResponse } from 'next/server';

const mockArticle = {
  _id: '1',
  title: 'Getting Started with AI in 2024',
  slug: 'getting-started-with-ai-2024',
  excerpt: 'A comprehensive guide to understanding artificial intelligence.',
  content: `
    <h2>Introduction to Artificial Intelligence</h2>
    <p>Artificial Intelligence (AI) has become one of the most transformative technologies of our time. From virtual assistants to autonomous vehicles, AI is reshaping how we live, work, and interact with technology.</p>

    <h3>What is AI?</h3>
    <p>At its core, AI refers to computer systems that can perform tasks that typically require human intelligence. This includes learning, reasoning, problem-solving, perception, and language understanding.</p>

    <h3>Types of AI</h3>
    <ul>
      <li><strong>Narrow AI:</strong> Designed for specific tasks (like voice recognition)</li>
      <li><strong>General AI:</strong> Theoretical AI that matches human cognitive abilities</li>
      <li><strong>Super AI:</strong> Hypothetical AI that exceeds human intelligence</li>
    </ul>

    <h3>Getting Started</h3>
    <p>To begin your AI journey, consider starting with these foundational concepts:</p>
    <ol>
      <li>Machine Learning basics</li>
      <li>Python programming</li>
      <li>Statistics and mathematics</li>
      <li>Data analysis</li>
    </ol>
  `,
  featuredImage: {
    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjM2NmYxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BSSBJbGx1c3RyYXRpb248L3RleHQ+PC9zdmc+',
    alt: 'AI illustration',
    publicId: 'sample-image'
  },
  category: 'AI Basics',
  tags: ['AI', 'Beginner', '2024'],
  status: 'published',
  readTime: 5,
  views: 1250,
  author: {
    name: 'AInSeconds Team',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2ZjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAyQzEzLjEgMiAxNCAyLjkgMTQgNEMxNCA1LjEgMTMuMSA2IDEyIDZDMTAuOSA2IDEwIDUuMSAxMCA0QzEwIDIuOSAxMC45IDIgMTIgMlpNMjEgOVYyMkgxOVYxNkgxM1YyMkgxMVY5QzExIDguNDUgMTEuNDUgOCAxMiA4SDIwQzIwLjU1IDggMjEgOC40NSAyMSA5WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo='
  },
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
