import { NextResponse } from 'next/server';
import { updateUser } from '@/lib/user.js';

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { userId, ...data } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const updatedUser = await updateUser(userId, data);

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found or not updated' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}