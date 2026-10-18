import { NextResponse } from 'next/server';

const PORTAL_URL = process.env.PORTAL_URL || 'http://localhost:3001';

export async function GET(request: Request) {
  try {
    const cookie = request.headers.get('cookie') || '';
    const res = await fetch(`${PORTAL_URL}/api/member/check`, {
      headers: { cookie },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
