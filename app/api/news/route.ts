import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import { NewsFilters } from '@/types/news';

// Mock data for development/fallback
const mockArticles = [
  {
    _id: '1',
    title: 'Getting Started with AI in 2024',
    excerpt: 'A comprehensive guide to understanding artificial intelligence and its applications.',
    content: 'Full article content here...',
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
      avatar: '/images/ainseconds-avatar.svg'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Advanced Machine Learning Techniques',
    excerpt: 'Explore cutting-edge ML algorithms and their real-world applications.',
    content: 'Full article content here...',
    category: 'Advanced AI',
    tags: ['Machine Learning', 'Deep Learning', 'Advanced'],
    status: 'published',
    featuredImage: {
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOGI1Y2Y2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NTCBJbGx1c3RyYXRpb248L3RleHQ+PC9zdmc+',
      alt: 'ML illustration',
      publicId: 'sample-image-2'
    },
    readTime: 8,
    views: 890,
    author: {
      name: 'AInSeconds Team',
      avatar: '/images/ainseconds-avatar.svg'
    },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    publishedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: '3',
    title: 'AI Ethics and Responsible Development',
    excerpt: 'Understanding the importance of ethical AI development and implementation.',
    content: 'Full article content here...',
    category: 'AI Ethics',
    tags: ['Ethics', 'Responsible AI', 'Guidelines'],
    status: 'draft',
    featuredImage: {
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTBiOTgxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5FdGhpY3MgSWxsdXN0cmF0aW9uPC90ZXh0Pjwvc3ZnPg==',
      alt: 'Ethics illustration',
      publicId: 'sample-image-3'
    },
    readTime: 6,
    views: 0,
    author: {
      name: 'AInSeconds Team',
      avatar: '/images/ainseconds-avatar.svg'
    },
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
      if (process.env.NODE_ENV === 'development') {
        console.log('📝 Using mock data (MongoDB not configured for development)');
      } else {
        console.warn('Database connection failed, using mock data:', dbError);
      }
      useDatabase = false;
    }

    const { searchParams } = new URL(request.url);
    
    const filters: NewsFilters = {
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

    let articles, totalCount;

    if (useDatabase) {
      // Execute database query
      [articles, totalCount] = await Promise.all([
        (News as any).find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .lean(),
        (News as any).countDocuments(query)
      ]);
    } else {
      // Use mock data
      let filteredArticles = mockArticles;

      // Apply filters to mock data
      if (filters.status && filters.status !== 'published') {
        filteredArticles = filteredArticles.filter(article => article.status === filters.status);
      }

      if (filters.category) {
        filteredArticles = filteredArticles.filter(article => article.category === filters.category);
      }

      if (filters.search) {
        filteredArticles = filteredArticles.filter(article =>
          article.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(filters.search!.toLowerCase())
        );
      }

      // Apply pagination to mock data
      totalCount = filteredArticles.length;
      articles = filteredArticles.slice(skip, skip + limit);
    }

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      articles,
      totalCount,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });

  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news articles' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    
    const article = new News({
      ...body,
      author: {
        name: 'AInSeconds Team', // Default author
        avatar: '/images/ainseconds-avatar.svg'
      }
    });

    await article.save();

    return NextResponse.json(article, { status: 201 });

  } catch (error) {
    console.error('Error creating news article:', error);
    return NextResponse.json(
      { error: 'Failed to create news article' },
      { status: 500 }
    );
  }
}
