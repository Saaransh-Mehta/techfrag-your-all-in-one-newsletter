import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { isSubscribed: false },
        { status: 200 }
      );
    }

    // Check if email exists and is active
    const subscriber = await prisma.subscriber.findUnique({
      where: { email },
      select: { isActive: true }
    });

    return NextResponse.json({
      isSubscribed: subscriber?.isActive || false
    });
  } catch (error) {
    console.error('Check subscription error:', error);
    return NextResponse.json(
      { isSubscribed: false },
      { status: 200 }
    );
  }
}
