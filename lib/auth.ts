import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

const SESSION_SECRET = process.env.SESSION_SECRET || 'change_this_in_production';

if (!process.env.SESSION_SECRET) {
  console.warn('⚠️ SESSION_SECRET not set. Using default insecure secret - set SESSION_SECRET in production environment.');
}

export async function createSession(userId: string) {
  const token = jwt.sign({ userId }, SESSION_SECRET, { expiresIn: `${SESSION_TTL_SECONDS}s` });
  return token;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(token, SESSION_SECRET) as { userId: string; exp?: number };
    return { userId: payload.userId };
  } catch (err) {
    // Invalid or expired token
    return null;
  }
}

// deleteSession is a noop for stateless JWTs (can't revoke without a store)
export async function deleteSession() {
  return;
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: SESSION_TTL_SECONDS,
    path: '/',
  });
}

export async function deleteSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
