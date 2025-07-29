const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || process.env.ADMIN_SECRET_KEY || 'fallback-secret-key-for-development';

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Extract article ID from path
  const pathParts = event.path.split('/');
  const articleId = pathParts[pathParts.length - 1];

  // Mock article data
  const mockArticle = {
    _id: articleId,
    title: 'Getting Started with AI in 2024',
    slug: 'getting-started-with-ai-2024',
    excerpt: 'A comprehensive guide to understanding artificial intelligence and its applications.',
    content: `
      <h2>Introduction to Artificial Intelligence</h2>
      <p>Artificial Intelligence (AI) has become one of the most transformative technologies of our time. From virtual assistants to autonomous vehicles, AI is reshaping how we live, work, and interact with technology.</p>
      
      <h3>What is AI?</h3>
      <p>At its core, AI refers to computer systems that can perform tasks that typically require human intelligence. This includes learning, reasoning, problem-solving, perception, and language understanding.</p>
      
      <h3>Types of AI</h3>
      <ul>
        <li><strong>Narrow AI:</strong> Designed for specific tasks (like image recognition or language translation)</li>
        <li><strong>General AI:</strong> Hypothetical AI that could perform any intellectual task a human can do</li>
        <li><strong>Superintelligent AI:</strong> AI that surpasses human intelligence in all areas</li>
      </ul>
      
      <h3>Getting Started</h3>
      <p>If you're new to AI, here are some steps to begin your journey:</p>
      <ol>
        <li>Learn the basics of programming (Python is highly recommended)</li>
        <li>Understand fundamental concepts like machine learning and neural networks</li>
        <li>Practice with online courses and tutorials</li>
        <li>Work on small projects to apply your knowledge</li>
        <li>Join AI communities and forums</li>
      </ol>
      
      <h3>Conclusion</h3>
      <p>AI is not just a buzzword—it's a powerful tool that's already changing our world. By understanding its basics and staying curious, you can be part of this exciting technological revolution.</p>
    `,
    category: 'AI Basics',
    tags: ['AI', 'Machine Learning', 'Beginner'],
    status: 'published',
    slug: 'getting-started-with-ai-2024',
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
    publishedAt: new Date().toISOString()
  };

  if (event.httpMethod === 'GET') {
    try {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(mockArticle),
      };
    } catch (error) {
      console.error('Error fetching article:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Internal server error' }),
      };
    }
  }

  if (event.httpMethod === 'PUT') {
    // Check authentication for updates
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'No token provided' }),
      };
    }

    const token = authHeader.substring(7);
    
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid token' }),
      };
    }

    try {
      const updateData = JSON.parse(event.body);
      console.log(`Mock article updated: ${updateData.title}`);
      
      // Return updated article
      const updatedArticle = {
        ...mockArticle,
        ...updateData,
        _id: articleId,
        updatedAt: new Date().toISOString()
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(updatedArticle),
      };
    } catch (error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON' }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};
