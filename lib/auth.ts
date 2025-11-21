import { cookies } from 'next/headers';
import { prisma } from './prisma';

const SESSION_COOKIE_NAME = 'admin_session';

// Simple session store (in production, use Redis or database)
const sessions = new Map<string, { userId: string; expiresAt: Date }>();

export async function createSession(userId: string) {
  const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  sessions.set(sessionId, { userId, expiresAt });
  
  return sessionId;
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  if (!sessionId) return null;
  
  const session = sessions.get(sessionId);
  
  if (!session || session.expiresAt < new Date()) {
    sessions.delete(sessionId);
    return null;
  }
  
  return session;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  if (sessionId) {
    sessions.delete(sessionId);
  }
}

export async function setSessionCookie(sessionId: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
}

export async function deleteSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function hashPassword(password: string): Promise<string> {
  // Simple hash - in production use bcrypt or argon2
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const hash = await hashPassword(password);
  return hash === hashedPassword;
}
