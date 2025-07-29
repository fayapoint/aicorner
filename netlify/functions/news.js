exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Handle POST requests (create new article)
  if (event.httpMethod === 'POST') {
    try {
      // Check authentication
      const authHeader = event.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'No token provided' }),
        };
      }

      const token = authHeader.substring(7);
      const jwt = require('jsonwebtoken');
      const JWT_SECRET = process.env.JWT_SECRET || process.env.ADMIN_SECRET_KEY || 'fallback-secret-key-for-development';

      try {
        jwt.verify(token, JWT_SECRET);
      } catch (error) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Invalid token' }),
        };
      }

      // Parse the request body
      const articleData = JSON.parse(event.body);

      // Create mock article response
      const newArticle = {
        _id: Date.now().toString(),
        ...articleData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: articleData.status === 'published' ? new Date().toISOString() : null,
        views: 0,
        slug: articleData.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
      };

      console.log('Mock article created:', newArticle.title);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newArticle),
      };

    } catch (error) {
      console.error('Error creating article:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to create article' }),
      };
    }
  }

  // Handle GET requests (existing code)
  try {
    // Parse query parameters
    const queryParams = event.queryStringParameters || {};
    const limit = parseInt(queryParams.limit) || 10;
    const page = parseInt(queryParams.page) || 1;
    const status = queryParams.status || 'all';
    const search = queryParams.search || '';

    // Mock data for now - replace with actual database calls
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
          avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2ZjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAyQzEzLjEgMiAxNCAyLjkgMTQgNEMxNCA1LjEgMTMuMSA2IDEyIDZDMTAuOSA2IDEwIDUuMSAxMCA0QzEwIDIuOSAxMC45IDIgMTIgMlpNMjEgOVYyMkgxOVYxNkgxM1YyMkgxMVY5QzExIDguNDUgMTEuNDUgOCAxMiA4SDIwQzIwLjU1IDggMjEgOC40NSAyMSA5WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo='
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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
          avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2ZjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAyQzEzLjEgMiAxNCAyLjkgMTQgNEMxNCA1LjEgMTMuMSA2IDEyIDZDMTAuOSA2IDEwIDUuMSAxMCA0QzEwIDIuOSAxMC45IDIgMTIgMlpNMjEgOVYyMkgxOVYxNkgxM1YyMkgxMVY5QzExIDguNDUgMTEuNDUgOCAxMiA4SDIwQzIwLjU1IDggMjEgOC40NSAyMSA5WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo='
        },
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString()
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
          avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2ZjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAyQzEzLjEgMiAxNCAyLjkgMTQgNEMxNCA1LjEgMTMuMSA2IDEyIDZDMTAuOSA2IDEwIDUuMSAxMCA0QzEwIDIuOSAxMC45IDIgMTIgMlpNMjEgOVYyMkgxOVYxNkgxM1YyMkgxMVY5QzExIDguNDUgMTEuNDUgOCAxMiA4SDIwQzIwLjU1IDggMjEgOC40NSAyMSA5WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo='
        },
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date(Date.now() - 172800000).toISOString()
      }
    ];

    // Filter articles based on status
    let filteredArticles = mockArticles;
    if (status !== 'all') {
      filteredArticles = mockArticles.filter(article => article.status === status);
    }

    // Filter by search term
    if (search) {
      filteredArticles = filteredArticles.filter(article => 
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

    const totalCount = filteredArticles.length;
    const totalPages = Math.ceil(totalCount / limit);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        articles: paginatedArticles,
        totalCount,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      })
    };

  } catch (error) {
    console.error('News API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        articles: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false,
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};
