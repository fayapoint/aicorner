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
          url: 'https://via.placeholder.com/600x400',
          alt: 'AI illustration',
          publicId: 'sample-image'
        },
        readTime: 5,
        views: 1250,
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
          url: 'https://via.placeholder.com/600x400',
          alt: 'ML illustration',
          publicId: 'sample-image-2'
        },
        readTime: 8,
        views: 890,
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
          url: 'https://via.placeholder.com/600x400',
          alt: 'Ethics illustration',
          publicId: 'sample-image-3'
        },
        readTime: 6,
        views: 0,
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
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};
