import { NextRequest, NextResponse } from 'next/server';
import { getScheduler } from '@/lib/services/content-scheduler';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    const scheduler = getScheduler();

    switch (action) {
      case 'status':
        const status = scheduler.getStatus();
        return NextResponse.json({
          success: true,
          data: status
        });

      case 'logs':
        const logs = scheduler.getLogs();
        return NextResponse.json({
          success: true,
          data: logs
        });

      case 'latest':
        const latestLog = scheduler.getLatestLog();
        return NextResponse.json({
          success: true,
          data: latestLog
        });

      default:
        return NextResponse.json({
          success: true,
          data: {
            message: 'Content Aggregation API',
            endpoints: {
              'GET ?action=status': 'Get scheduler status',
              'GET ?action=logs': 'Get aggregation logs',
              'GET ?action=latest': 'Get latest aggregation log',
              'POST': 'Trigger manual aggregation'
            }
          }
        });
    }
  } catch (error) {
    console.error('Error in aggregation API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

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
    // For development, accept the mock token
    if (token !== 'mock-jwt-token-for-local-development') {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const scheduler = getScheduler();

    // Check if aggregation is already running
    if (scheduler.isAggregationRunning()) {
      return NextResponse.json({
        success: false,
        error: 'Aggregation is already running'
      }, { status: 409 });
    }

    // Trigger manual aggregation
    console.log('Manual aggregation triggered via API');
    const result = await scheduler.triggerManualAggregation();

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Manual aggregation completed'
    });

  } catch (error) {
    console.error('Error triggering manual aggregation:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
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
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
