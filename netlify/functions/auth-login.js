const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'admin-secret';

// Simple admin user for demo purposes
const ADMIN_USER = {
  id: 'admin',
  username: 'admin',
  email: 'admin@ainseconds.com',
  role: 'admin'
};

function authenticateAdmin(credentials) {
  const { username, password } = credentials;
  
  // Simple authentication - in production, use proper user management
  if (username === 'admin' && password === ADMIN_SECRET_KEY) {
    return ADMIN_USER;
  }
  
  return null;
}

function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
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
    const { username, password } = JSON.parse(event.body);

    if (!username || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Username and password are required' })
      };
    }

    const user = authenticateAdmin({ username, password });

    if (!user) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }

    const token = generateToken(user);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        user,
        token,
        message: 'Login successful'
      })
    };

  } catch (error) {
    console.error('Login error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
