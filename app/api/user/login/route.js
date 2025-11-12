import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/user.js';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await loginUser(email, password);
    return NextResponse.json({ user });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 401 });
  }
}