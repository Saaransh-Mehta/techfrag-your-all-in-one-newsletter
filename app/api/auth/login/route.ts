import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, createSession, setSessionCookie } from '@/lib/auth';

// Simple in-memory lockout for admin login (no Redis). Suitable for single-instance admin use.
const failedAttempts = new Map<string, { count: number; lockedUntil?: number }>();
const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const entry = failedAttempts.get(username) || { count: 0 };
    if (entry.lockedUntil && Date.now() < entry.lockedUntil) {
      return NextResponse.json({ error: `Account locked. Try again later.` }, { status: 423 });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      // Avoid user enumeration by incrementing a fake counter
      const next: { count: number; lockedUntil?: number } = { count: entry.count + 1 };
      if (next.count >= MAX_ATTEMPTS) next.lockedUntil = Date.now() + LOCK_MINUTES * 60 * 1000;
      failedAttempts.set(username, next);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      const next: { count: number; lockedUntil?: number } = { count: entry.count + 1 };
      if (next.count >= MAX_ATTEMPTS) next.lockedUntil = Date.now() + LOCK_MINUTES * 60 * 1000;
      failedAttempts.set(username, next);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Reset failed attempts on success
    failedAttempts.delete(username);

    // Create session (JWT) and set cookie
    const token = await createSession(user.id);
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
