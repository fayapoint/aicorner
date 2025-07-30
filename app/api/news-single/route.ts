import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      );
    }

    const article = await (News as any).findById(id);

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    // For development, accept the mock token
    if (token !== 'mock-jwt-token-for-local-development') {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const updateData = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      );
    }

    console.log('Updating article with data:', JSON.stringify(updateData, null, 2));

    // Ensure featured field has proper structure
    const processedUpdateData = {
      ...updateData,
      updatedAt: new Date(),
      featured: {
        isFeatured: updateData.featured?.isFeatured || false,
        order: updateData.featured?.isFeatured ? (updateData.featured?.order || null) : null
      },
      // Ensure featuredImage has required fields if provided
      ...(updateData.featuredImage && {
        featuredImage: {
          url: updateData.featuredImage?.url || '/images/default-ai-news.jpg',
          publicId: updateData.featuredImage?.publicId || 'default-ai-news',
          alt: updateData.featuredImage?.alt || updateData.title || 'Article image'
        }
      })
    };

    console.log('Processed update data:', JSON.stringify(processedUpdateData, null, 2));

    const updatedArticle = await (News as any).findByIdAndUpdate(
      id,
      processedUpdateData,
      { new: true, runValidators: true }
    );

    if (!updatedArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    console.log('Article updated successfully:', updatedArticle.title);

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: 'Failed to update article', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    // For development, accept the mock token
    if (token !== 'mock-jwt-token-for-local-development') {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      );
    }

    const deletedArticle = await (News as any).findByIdAndDelete(id);

    if (!deletedArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    console.log('Article deleted:', deletedArticle.title);

    return NextResponse.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
