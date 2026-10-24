import { NextResponse } from 'next/server';
import { verifyPassword, setAuthCookie } from '@/lib/auth';
import { getContent } from '@/lib/content';
import { checkLoginRateLimit, resetLoginRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    if (!checkLoginRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    let valid = false;
    if (process.env.ADMIN_PASSWORD_HASH) {
      valid = await verifyPassword(password, process.env.ADMIN_PASSWORD_HASH);
    } else if (process.env.ADMIN_PASSWORD) {
      valid = password === process.env.ADMIN_PASSWORD;
    } else {
      const content = await getContent();
      if (content.adminPassword) {
        valid = await verifyPassword(password, content.adminPassword);
      }
    }

    if (!valid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    resetLoginRateLimit(ip);
    await setAuthCookie();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
