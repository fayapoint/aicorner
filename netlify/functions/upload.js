const jwt = require('jsonwebtoken');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only handle POST requests for image upload
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

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

    // Parse the request body (assuming it's base64 encoded image data)
    const requestBody = JSON.parse(event.body);
    const { image, filename } = requestBody;

    // For now, return a mock URL since we don't have actual file storage
    // In a real implementation, you'd upload to a service like Cloudinary, AWS S3, etc.
    const mockImageUrl = `https://picsum.photos/800/600?random=${Date.now()}`;

    console.log('Mock image upload:', filename);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        url: mockImageUrl,
        filename: filename || 'uploaded-image.jpg'
      }),
    };

  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to upload image' }),
    };
  }
};
