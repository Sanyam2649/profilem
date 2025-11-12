import { NextResponse } from 'next/server';
import { deleteProfile, getProfile } from '../../../../lib/profile.js';

export async function GET(req, context) {
  const resolvedParams = 'then' in context.params ? await context.params : context.params;
  const { profileId } = resolvedParams;

  const profile = await getProfile(profileId);
  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }
  return NextResponse.json({ profile });
}

export async function DELETE(req, context) {
  const resolvedParams = 'then' in context.params ? await context.params : context.params;
  const { profileId } = resolvedParams;

  if (!profileId)
    return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });

  const deleted = await deleteProfile(profileId);
  return NextResponse.json({
    message: deleted ? 'Profile deleted' : 'Profile not found',
    deleted,
  });
}