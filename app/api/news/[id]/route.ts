import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET single article
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const article = await prisma.newsArticle.findUnique({
      where: { id },
    });

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ article });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}

// DELETE article (protected)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    await prisma.newsArticle.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Article deleted',
    });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}

// PUT update article (protected)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { title, excerpt, content, author, category, imageUrl, readTime } = body;

    const article = await prisma.newsArticle.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(excerpt && { excerpt }),
        ...(content && { content }),
        ...(author && { author }),
        ...(category && { category }),
        ...(imageUrl && { imageUrl }),
        ...(readTime && { readTime }),
      },
    });

    return NextResponse.json({
      success: true,
      article,
    });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}
