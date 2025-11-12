import { NextResponse } from 'next/server';
import { getUserById, updateUser, deleteUser } from '@/lib/user.js';

export async function GET(req, { params }) {
  try {
    const user = await getUserById(params.userId);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ user });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const data = await req.json();
    const user = await updateUser(params.userId, data);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ user });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await deleteUser(params.userId);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}