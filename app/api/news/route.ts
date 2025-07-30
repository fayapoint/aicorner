import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';

// Fallback mock data when MongoDB is unavailable
const mockArticles = [
  {
    _id: '1',
    title: 'Getting Started with AI in 2024',
    slug: 'getting-started-with-ai-2024',
    excerpt: 'A comprehensive guide to understanding artificial intelligence and how it can transform your workflow.',
    content: '<p>Artificial Intelligence is revolutionizing the way we work and live. This comprehensive guide will help you understand the basics and get started with AI tools.</p>',
    featuredImage: {
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjM2NmYxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BSSBJbGx1c3RyYXRpb248L3RleHQ+PC9zdmc+',
      alt: 'AI illustration',
      publicId: 'sample-image-1'
    },
    author: {
      name: 'AInSeconds Team',
      avatar: '/images/ainseconds-avatar.svg'
    },
    category: 'AI Basics',
    tags: ['AI', 'Beginner', '2024'],
    status: 'published',
    views: 1250,
    readTime: 5,
    seo: {
      metaTitle: 'Getting Started with AI in 2024',
      metaDescription: 'Learn the basics of AI and how to get started',
      keywords: ['AI', 'artificial intelligence', 'beginner']
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Advanced Machine Learning Techniques',
    slug: 'advanced-ml-techniques',
    excerpt: 'Explore cutting-edge ML algorithms and their real-world applications.',
    content: '<p>Machine Learning continues to evolve with new techniques and algorithms. This article explores the latest advances in the field.</p>',
    featuredImage: {
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOGI1Y2Y2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NTCBJbGx1c3RyYXRpb248L3RleHQ+PC9zdmc+',
      alt: 'ML illustration',
      publicId: 'sample-image-2'
    },
    author: {
      name: 'AInSeconds Team',
      avatar: '/images/ainseconds-avatar.svg'
    },
    category: 'Machine Learning',
    tags: ['ML', 'Advanced', 'Algorithms'],
    status: 'published',
    views: 890,
    readTime: 8,
    seo: {
      metaTitle: 'Advanced Machine Learning Techniques',
      metaDescription: 'Explore cutting-edge ML algorithms',
      keywords: ['machine learning', 'ML', 'algorithms']
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString()
  }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10');
  const page = parseInt(searchParams.get('page') || '1');
  const status = searchParams.get('status');
  const search = searchParams.get('search');
  const category = searchParams.get('category');
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = searchParams.get('sortOrder') || 'desc';

  try {
    await connectDB();

    // Build query
    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get total count for pagination
    const totalCount = await (News as any).countDocuments(query);

    // Get articles with pagination
    const articles = await (News as any).find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPages = Math.ceil(totalCount / limit);

    // Ensure we always return an array
    const articlesArray = Array.isArray(articles) ? articles : [articles].filter(Boolean);

    return NextResponse.json({
      articles: articlesArray,
      totalCount,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });

  } catch (error) {
    console.error('MongoDB connection failed, using fallback data:', error);

    // Fallback to mock data when MongoDB is unavailable
    let filteredArticles = mockArticles;

    if (status) {
      filteredArticles = mockArticles.filter(article => article.status === status);
    }

    if (search) {
      filteredArticles = filteredArticles.filter(article =>
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        article.content.toLowerCase().includes(search.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (category) {
      filteredArticles = filteredArticles.filter(article => article.category === category);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredArticles.length / limit);

    return NextResponse.json({
      articles: paginatedArticles,
      totalCount: filteredArticles.length,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    // For development, accept the mock token
    if (token !== 'mock-jwt-token-for-local-development') {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const articleData = await request.json();

    // Create new article
    const article = new News({
      ...articleData,
      views: 0
    });

    const savedArticle = await article.save();

    console.log('Article created:', savedArticle.title);

    return NextResponse.json(savedArticle, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
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
