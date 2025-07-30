import { NextRequest, NextResponse } from 'next/server';
import { URLParser } from '@/lib/url-parser';

export async function POST(request: NextRequest) {
  try {
    // Check for admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    if (token !== 'mock-jwt-token-for-local-development') {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Parse the URL
    const parsedContent = await URLParser.parseURL(url);

    if (parsedContent.type === 'unknown') {
      return NextResponse.json(
        {
          success: false,
          error: 'Could not parse content from URL. The website may be blocking automated requests or the URL may be invalid.'
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: parsedContent
    });

  } catch (error) {
    console.error('Error parsing URL:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to parse URL' 
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
