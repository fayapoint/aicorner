import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const envVars = {
      NODE_ENV: process.env.NODE_ENV,
      ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY ? 'SET' : 'NOT_SET',
      JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT_SET',
      MONGODB_URI: process.env.MONGODB_URI ? 'SET' : 'NOT_SET',
      NETLIFY: process.env.NETLIFY ? 'SET' : 'NOT_SET',
      NETLIFY_DEV: process.env.NETLIFY_DEV ? 'SET' : 'NOT_SET',
    };

    return NextResponse.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: envVars,
      message: 'API routes are working correctly',
      url: request.url,
      method: request.method
    });

  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      {
        status: 'ERROR',
        error: 'Health check failed',
        timestamp: new Date().toISOString(),
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json({
    method: 'POST',
    status: 'OK',
    message: 'POST method working'
  });
}
