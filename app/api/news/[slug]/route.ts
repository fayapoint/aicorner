import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';

// Mock article for development/fallback
const mockArticle = {
  _id: '1',
  title: 'Getting Started with AI in 2024',
  excerpt: 'A comprehensive guide to understanding artificial intelligence and its applications.',
  content: '<h2>Introduction to AI</h2><p>Artificial Intelligence is transforming the world...</p><h3>Key Concepts</h3><p>Machine learning, deep learning, and neural networks are fundamental concepts...</p>',
  category: 'AI Basics',
  tags: ['AI', 'Machine Learning', 'Beginner'],
  status: 'published',
  featuredImage: {
    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjM2NmYxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BSSBJbGx1c3RyYXRpb248L3RleHQ+PC9zdmc+',
    alt: 'AI illustration',
    publicId: 'sample-image'
  },
  readTime: 5,
  views: 1250,
  author: {
    name: 'AInSeconds Team',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2ZjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAyQzEzLjEgMiAxNCAyLjkgMTQgNEMxNCA1LjEgMTMuMSA2IDEyIDZDMTAuOSA2IDEwIDUuMSAxMCA0QzEwIDIuOSAxMC45IDIgMTIgMlpNMjEgOVYyMkgxOVYxNkgxM1YyMkgxMVY5QzExIDguNDUgMTEuNDUgOCAxMiA4SDIwQzIwLjU1IDggMjEgOC40NSAyMSA5WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo='
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  publishedAt: new Date().toISOString(),
  slug: 'getting-started-with-ai-2024'
};

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
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

    let article: any;

    if (useDatabase) {
      // Check if slug is actually an ID (for admin access)
      if (params.slug.match(/^[0-9a-fA-F]{24}$/)) {
        // It's an ObjectId, fetch by ID (for admin)
        article = await (News as any).findById(params.slug).lean();
      } else {
        // It's a slug, fetch published article
        article = await (News as any).findOne({
          slug: params.slug,
          status: 'published'
        }).lean();

        if (article) {
          // Increment view count for published articles
          await (News as any).findByIdAndUpdate(article._id, { $inc: { views: 1 } });
        }
      }
    } else {
      // Use mock data
      if (params.slug === '1' || params.slug === mockArticle.slug) {
        article = { ...mockArticle };
        // Simulate view increment
        article.views = (article.views || 0) + 1;
      }
    }

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(article);

  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Try to connect to MongoDB, but fallback to mock data if it fails
    let useDatabase = true;
    try {
      await connectDB();
    } catch (dbError) {
      console.warn('Database connection failed, using mock data for update:', dbError);
      useDatabase = false;
    }

    const body = await request.json();
    let article: any;

    if (useDatabase) {
      // Check if slug is actually an ID
      if (params.slug.match(/^[0-9a-fA-F]{24}$/)) {
        article = await (News as any).findByIdAndUpdate(
          params.slug,
          { ...body, updatedAt: new Date() },
          { new: true, runValidators: true }
        );
      } else {
        article = await (News as any).findOneAndUpdate(
          { slug: params.slug },
          { ...body, updatedAt: new Date() },
          { new: true, runValidators: true }
        );
      }
    } else {
      // Mock update - just return the updated data
      if (params.slug === '1' || params.slug === mockArticle.slug) {
        article = {
          ...mockArticle,
          ...body,
          updatedAt: new Date().toISOString()
        };
        console.log('Mock article updated:', article.title);
      }
    }

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(article);

  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Try to connect to MongoDB, but fallback to mock data if it fails
    let useDatabase = true;
    try {
      await connectDB();
    } catch (dbError) {
      console.warn('Database connection failed, using mock data for delete:', dbError);
      useDatabase = false;
    }

    let article: any;

    if (useDatabase) {
      // Check if slug is actually an ID
      if (params.slug.match(/^[0-9a-fA-F]{24}$/)) {
        article = await (News as any).findByIdAndDelete(params.slug);
      } else {
        article = await (News as any).findOneAndDelete({ slug: params.slug });
      }
    } else {
      // Mock delete - just return success
      if (params.slug === '1' || params.slug === mockArticle.slug) {
        article = mockArticle;
        console.log('Mock article deleted:', article.title);
      }
    }

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Article deleted successfully' });

  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
