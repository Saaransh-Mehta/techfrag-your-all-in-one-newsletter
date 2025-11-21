import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    // Check authentication
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get total articles count
    const totalArticles = await prisma.newsArticle.count();

    // Get total subscribers count
    const totalSubscribers = await prisma.subscriber.count({
      where: { isActive: true }
    });

    // Get subscribers from this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const subscribersThisMonth = await prisma.subscriber.count({
      where: {
        isActive: true,
        subscribedAt: {
          gte: startOfMonth
        }
      }
    });

    // Get recent articles (last 10)
    const recentArticles = await prisma.newsArticle.findMany({
      orderBy: {
        publishedAt: 'desc'
      },
      take: 10,
      select: {
        id: true,
        title: true,
        publishedAt: true,
        readTime: true,
        category: true
      }
    });

    return NextResponse.json({
      totalArticles,
      totalSubscribers,
      subscribersThisMonth,
      recentArticles
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
