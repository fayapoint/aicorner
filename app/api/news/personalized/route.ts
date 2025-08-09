import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth-options';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import { buildUssUserSummary } from '@/lib/uss/summary';

// Heuristic extraction of interest tags from a USS user document or related docs
function extractInterestTags(input: any): string[] {
  const out = new Set<string>();
  if (!input) return [];

  const push = (v: unknown) => {
    if (!v) return;
    if (typeof v === 'string') {
      const s = v.trim();
      if (s) out.add(s);
      return;
    }
    if (typeof v === 'number' || typeof v === 'boolean') {
      out.add(String(v));
      return;
    }
    if (Array.isArray(v)) {
      for (const item of v) push(item);
      return;
    }
    if (typeof v === 'object') {
      // Common fields
      const candidateKeys = [
        'interests', 'tags', 'topics', 'skills', 'categories', 'labels', 'keywords',
        'persona', 'personas', 'preferences'
      ];
      for (const key of candidateKeys) {
        if (key in (v as any)) push((v as any)[key]);
      }
      // Try generic object shapes
      const nameLike = (v as any).name || (v as any).title || (v as any).label || (v as any).tag;
      if (nameLike) push(nameLike);
    }
  };

  push(input);

  // Normalize, unique, and cap
  return Array.from(out)
    .map(s => String(s).trim())
    .map(s => s.replace(/\s+/g, ' '))
    .filter(Boolean)
    .slice(0, 20);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '12');
  const page = parseInt(searchParams.get('page') || '1');
  const sortParam = (searchParams.get('sort') || 'latest').toLowerCase();
  const focus = searchParams.get('focus');

  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!session || !email) {
      return NextResponse.json(
        { error: 'Unauthorized', details: 'Sign in to access personalized news.' },
        { status: 401 }
      );
    }

    // Discover interests from USS
    const summary = await buildUssUserSummary(email);
    const interests = [
      ...extractInterestTags(summary.userDoc),
      // also peek into sample docs of likely collections
      ...summary.collections
        .filter(c => /persona|profile|interest|preference|tag|topic/i.test(c.collection))
        .flatMap(c => c.sample)
        .flatMap(doc => extractInterestTags(doc))
    ];

    // Fallback interests if none found
    const finalInterests = interests.length ? Array.from(new Set(interests)).slice(0, 20) : [
      'artificial intelligence', 'machine learning', 'LLM', 'OpenAI', 'Google AI', 'Deep Learning', 'NLP', 'Computer Vision'
    ];

    await connectDB();

    // Build a query that matches any of the interest tags (case-insensitive)
    const tagRegexes = finalInterests.map(t => new RegExp(t, 'i'));

    const query: any = {
      status: 'published',
      $or: [
        { tags: { $in: tagRegexes } },
        { category: { $in: finalInterests } },
        { title: { $in: tagRegexes } },
        { excerpt: { $in: tagRegexes } },
        { content: { $in: tagRegexes } },
      ],
    };

    // If user clicked a specific interest chip, narrow to that focus
    if (focus && focus.trim()) {
      const r = new RegExp(focus.trim(), 'i');
      query.$and = [
        {
          $or: [
            { tags: r },
            { category: focus.trim() },
            { title: r },
            { excerpt: r },
            { content: r },
          ],
        },
      ];
    }

    const totalCount = await (News as any).countDocuments(query);

    const sortObj =
      sortParam === 'trending'
        ? { views: -1, publishedAt: -1 }
        : { publishedAt: -1, createdAt: -1 };

    const articles = await (News as any)
      .find(query)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // If nothing matched, gracefully fallback to latest published
    let resultArticles = Array.isArray(articles) ? articles : [];
    let resultTotal = totalCount;
    if (resultArticles.length === 0) {
      resultTotal = await (News as any).countDocuments({ status: 'published' });
      resultArticles = await (News as any)
        .find({ status: 'published' })
        .sort(sortObj)
        .limit(limit)
        .lean();
    }

    const totalPages = Math.ceil((resultTotal || 0) / limit) || 1;

    return NextResponse.json({
      articles: resultArticles,
      totalCount: resultTotal,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      inferredInterests: finalInterests,
    });
  } catch (error: any) {
    console.error('Error in personalized news API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch personalized news', details: error?.message ?? String(error) },
      { status: 500 }
    );
  }
}
