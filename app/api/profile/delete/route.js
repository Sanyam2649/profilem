import { NextResponse } from 'next/server';
import { deleteProfile } from '@/lib/profile';

export async function POST(req) {
  try {
    const { profileId } = await req.json();
    if (!profileId) {
      return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
    }

    const deleted = await deleteProfile(profileId);
    return NextResponse.json({ message: deleted ? 'Profile deleted' : 'Profile not found', deleted });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}