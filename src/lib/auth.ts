import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET environment variable is missing.');
    }
    return 'dev-secret-do-not-use-in-production';
  }
  return secret;
}

const COOKIE_NAME = 'onex_admin_token';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (!hash) return false;
  return bcrypt.compare(password, hash);
}

export function signToken(): string {
  return jwt.sign({ role: 'admin' }, getJwtSecret(), { expiresIn: '24h' });
}

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, getJwtSecret());
    return true;
  } catch {
    return false;
  }
}

export async function setAuthCookie() {
  const token = signToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400,
    path: '/',
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}
