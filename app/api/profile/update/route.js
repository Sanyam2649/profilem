import { NextResponse } from 'next/server';
import { updateProfile } from '../../../../lib/profile.js';

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { profileId, updates, userId } = body;

    if (!profileId || !updates) {
      return NextResponse.json({ error: 'Profile ID and updates are required' }, { status: 400 });
    }

    const updatedProfile = await updateProfile(profileId, updates, userId);
    return NextResponse.json({ message: 'Profile updated', profile: updatedProfile });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}