import { NextResponse } from 'next/server';
import { updateProfile } from '../../../../lib/profile.js';
import { authenticateRequest } from '@/lib/apiAuth.js';

export async function PATCH(req) {
  try {
    // Authenticate the request
    const { error, user } = await authenticateRequest(req);
    
    if (error) {
      return error;
    }

    const body = await req.json();
    const { profileId, updates } = body;

    if (!profileId || !updates) {
      return NextResponse.json({ error: 'Profile ID and updates are required' }, { status: 400 });
    }

    // Use authenticated user's ID to ensure ownership
    const updatedProfile = await updateProfile(profileId, updates, user._id.toString());
    return NextResponse.json({ message: 'Profile updated', profile: updatedProfile });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}