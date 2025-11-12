import { NextResponse } from 'next/server';
import { deleteProfileField } from '../../../../lib/profile.js';

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { profileId, field, itemIdOrValue } = body;

    if (!profileId || !field || !itemIdOrValue) {
      return NextResponse.json({ error: 'profileId, field, and itemIdOrValue are required' }, { status: 400 });
    }

    const updatedProfile = await deleteProfileField(profileId, field, itemIdOrValue);
    return NextResponse.json({ message: 'Field item deleted', profile: updatedProfile });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}