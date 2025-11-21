import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { sendNewsletterToSubscribers } from '@/lib/email';

// GET all news articles
export async function GET() {
  try {
    const articles = await prisma.newsArticle.findMany({
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

// POST create new article (protected)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, excerpt, content, author, category, imageUrl, readTime } = body;

    // Validation
    if (!title || !excerpt || !content || !author || !category || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create article
    const article = await prisma.newsArticle.create({
      data: {
        title,
        excerpt,
        content,
        author,
        category,
        imageUrl,
        readTime: readTime || 5,
      },
    });

    // Send newsletter to subscribers in the background
    // Don't await this - let it run asynchronously
    sendNewsletterToSubscribers({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      author: article.author,
      category: article.category,
      imageUrl: article.imageUrl,
      readTime: article.readTime,
    }).catch((error) => {
      console.error('Error sending newsletter emails:', error);
      // Log the error but don't fail the article creation
    });

    return NextResponse.json({
      success: true,
      article,
      message: 'Article published! Newsletter emails are being sent to subscribers.',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}
