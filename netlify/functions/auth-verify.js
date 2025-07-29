const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get token from Authorization header or request body
    let token = null;
    
    // Check Authorization header first
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    
    // If no token in header, check request body
    if (!token && event.body) {
      const body = JSON.parse(event.body);
      token = body.token;
    }

    if (!token) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'No token provided' })
      };
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Return the decoded user information
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        valid: true,
        user: {
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
          role: decoded.role
        },
        message: 'Token is valid'
      })
    };

  } catch (error) {
    console.error('Token verification error:', error);
    
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid token' })
      };
    }
    
    if (error.name === 'TokenExpiredError') {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Token expired' })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
