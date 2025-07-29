import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    // Check if slug is actually an ID (for admin access)
    let article: any;
    if (params.slug.match(/^[0-9a-fA-F]{24}$/)) {
      // It's an ObjectId, fetch by ID (for admin)
      article = await (News as any).findById(params.slug).lean();
    } else {
      // It's a slug, fetch published article
      article = await (News as any).findOne({
        slug: params.slug,
        status: 'published'
      }).lean();

      if (article) {
        // Increment view count for published articles
        await (News as any).findByIdAndUpdate(article._id, { $inc: { views: 1 } });
      }
    }

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const body = await request.json();

    // Check if slug is actually an ID
    let article: any;
    if (params.slug.match(/^[0-9a-fA-F]{24}$/)) {
      article = await (News as any).findByIdAndUpdate(
        params.slug,
        { ...body, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
    } else {
      article = await (News as any).findOneAndUpdate(
        { slug: params.slug },
        { ...body, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
    }

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(article);

  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    // Check if slug is actually an ID
    let article: any;
    if (params.slug.match(/^[0-9a-fA-F]{24}$/)) {
      article = await (News as any).findByIdAndDelete(params.slug);
    } else {
      article = await (News as any).findOneAndDelete({ slug: params.slug });
    }

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Article deleted successfully' });

  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
