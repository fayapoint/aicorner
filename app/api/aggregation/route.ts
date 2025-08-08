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

      case 'preview':
        // Preview fresh content from external sources without saving
        console.log('Preview aggregation requested via API - fetching fresh content');
        const previewResult = await scheduler.previewAggregation();
        return NextResponse.json({
          success: true,
          data: previewResult,
          message: 'Fresh content preview completed'
        });

      case 'sources':
        // Get current aggregation sources configuration
        const sources = scheduler.getSources();
        return NextResponse.json({
          success: true,
          data: sources
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
              'GET ?action=preview': 'Preview content without saving',
              'GET ?action=sources': 'Get aggregation sources',
              'POST': 'Trigger manual aggregation or import selected items'
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
    const body = await request.json().catch(() => ({}));

    // Check if this is a selective import request
    if (body.action === 'import-selected' && body.selectedItems) {
      console.log('Selective import triggered via API');
      const result = await scheduler.importSelectedItems(body.selectedItems);

      const allSucceeded = result?.failed === 0;
      const noneSucceeded = (result?.imported ?? 0) === 0;

      if (allSucceeded) {
        return NextResponse.json({
          success: true,
          data: result,
          message: `Imported ${result.imported} items`
        });
      }

      if (noneSucceeded) {
        return NextResponse.json(
          {
            success: false,
            data: result,
            error: 'Import failed for all selected items'
          },
          { status: 500 }
        );
      }

      // Partial success: some items imported, some failed
      return NextResponse.json(
        {
          success: false,
          data: result,
          error: `Partial import: ${result.imported} imported, ${result.failed} failed`
        },
        { status: 207 }
      );
    }

    // Check if this is a source management request
    if (body.action === 'update-sources' && body.sources) {
      console.log('Source configuration update triggered via API');
      const result = await scheduler.updateSources(body.sources);

      return NextResponse.json({
        success: true,
        data: result,
        message: 'Sources updated successfully'
      });
    }

    // Check if aggregation is already running
    if (scheduler.isAggregationRunning()) {
      return NextResponse.json({
        success: false,
        error: 'Aggregation is already running'
      }, { status: 409 });
    }

    // Default: Trigger manual aggregation
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
