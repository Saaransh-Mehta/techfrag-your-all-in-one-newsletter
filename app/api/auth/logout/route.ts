import { NextResponse } from 'next/server';
import { deleteSession, deleteSessionCookie } from '@/lib/auth';

export async function POST() {
  try {
    await deleteSession();
    await deleteSessionCookie();

    return NextResponse.json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
