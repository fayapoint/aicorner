import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'No token provided' },
      { status: 401 }
    );
  }
  
  const token = authHeader.substring(7);
  
  // For local development, accept any token
  if (token === 'mock-jwt-token-for-local-development') {
    return NextResponse.json({
      valid: true,
      user: { username: 'admin', role: 'admin' }
    });
  }
  
  return NextResponse.json(
    { error: 'Invalid token' },
    { status: 401 }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
