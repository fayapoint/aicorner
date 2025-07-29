exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const envVars = {
      NODE_ENV: process.env.NODE_ENV,
      ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY ? 'SET' : 'NOT_SET',
      JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT_SET',
      MONGODB_URI: process.env.MONGODB_URI ? 'SET' : 'NOT_SET',
      NETLIFY: process.env.NETLIFY ? 'SET' : 'NOT_SET',
      NETLIFY_DEV: process.env.NETLIFY_DEV ? 'SET' : 'NOT_SET',
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: envVars,
        message: 'Netlify Functions are working correctly',
        functionType: 'netlify-function'
      })
    };

  } catch (error) {
    console.error('Health check error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'ERROR',
        error: 'Health check failed',
        timestamp: new Date().toISOString(),
        errorMessage: error.message
      })
    };
  }
};
