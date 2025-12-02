import { NextResponse } from 'next/server';
import { createProfile } from '@/lib/profile'; 
import { authenticateRequest } from '@/lib/apiAuth.js';

export async function POST(req) {
  try {
    // Authenticate the request
    const { error, user } = await authenticateRequest(req);
    
    if (error) {
      return error;
    }

    const body = await req.json();
    const { ...data } = body;

    // Use authenticated user's ID
    const profile = await createProfile(user._id.toString(), data);
    return NextResponse.json({ message: 'Profile created', profile });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}