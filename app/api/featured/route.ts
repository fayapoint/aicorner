import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import Video from '@/models/Video';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'news', 'videos', or 'all'

    let featuredNews = [];
    let featuredVideos = [];

    if (type === 'news' || type === 'all' || !type) {
      // Get featured news articles ordered by featured.order
      featuredNews = await (News as any)
        .find({ 
          'featured.isFeatured': true,
          status: 'published'
        })
        .sort({ 'featured.order': 1 })
        .limit(6)
        .lean();
    }

    if (type === 'videos' || type === 'all' || !type) {
      // Get featured videos ordered by featured.order
      featuredVideos = await (Video as any)
        .find({ 
          'featured.isFeatured': true,
          status: 'published'
        })
        .sort({ 'featured.order': 1 })
        .limit(6)
        .lean();
    }

    // Return based on requested type
    if (type === 'news') {
      return NextResponse.json({
        success: true,
        data: featuredNews
      });
    }

    if (type === 'videos') {
      return NextResponse.json({
        success: true,
        data: featuredVideos
      });
    }

    // Return both for 'all' or no type specified
    return NextResponse.json({
      success: true,
      data: {
        news: featuredNews,
        videos: featuredVideos
      }
    });

  } catch (error) {
    console.error('Error fetching featured content:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch featured content' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

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

    const { type, id, isFeatured, order } = await request.json();

    if (!type || !id) {
      return NextResponse.json(
        { success: false, error: 'Type and ID are required' },
        { status: 400 }
      );
    }

    const Model = type === 'news' ? News : Video;
    
    // If setting as featured and order is provided, check for conflicts
    if (isFeatured && order) {
      // Check if another item already has this order
      const existingItem = await (Model as any).findOne({
        'featured.isFeatured': true,
        'featured.order': order,
        _id: { $ne: id }
      });

      if (existingItem) {
        return NextResponse.json(
          { success: false, error: `Order ${order} is already taken by another ${type}` },
          { status: 400 }
        );
      }
    }

    // Update the item
    const updateData: any = {
      'featured.isFeatured': isFeatured
    };

    if (isFeatured && order) {
      updateData['featured.order'] = order;
    } else if (!isFeatured) {
      updateData['featured.order'] = null;
    }

    const updatedItem = await (Model as any).findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedItem) {
      return NextResponse.json(
        { success: false, error: `${type} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedItem
    });

  } catch (error) {
    console.error('Error updating featured status:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update featured status' 
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
