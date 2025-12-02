import { NextResponse } from 'next/server';
import { deleteProfile } from '@/lib/profile';
import { authenticateRequest } from '@/lib/apiAuth.js';

export async function POST(req) {
  try {
    // Authenticate the request
    const { error, user } = await authenticateRequest(req);
    
    if (error) {
      return error;
    }

    const { profileId } = await req.json();
    if (!profileId) {
      return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
    }

    // Use authenticated user's ID to ensure ownership
    const deleted = await deleteProfile(profileId, user._id.toString());
    return NextResponse.json({ message: deleted ? 'Profile deleted' : 'Profile not found', deleted });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}