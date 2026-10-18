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

    const content = await getContent();
    const valid = await verifyPassword(password, content.adminPassword);

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
