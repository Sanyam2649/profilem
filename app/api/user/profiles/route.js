import { NextResponse } from 'next/server';
import { getProfilesByUser } from '@/lib/profile.js';

export async function POST(req) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const profiles = await getProfilesByUser(userId);
    return NextResponse.json({ profiles });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}