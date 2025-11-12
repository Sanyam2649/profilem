import { NextResponse } from 'next/server';
import { createProfile } from '@/lib/profile'; 

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, ...data } = body;

    if (!userId) return NextResponse.json({ error: 'User ID is required' }, { status: 400 });

    const profile = await createProfile(userId, data);
    return NextResponse.json({ message: 'Profile created', profile });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}