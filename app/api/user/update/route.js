import { NextResponse } from 'next/server';
import { updateUser } from '@/lib/user.js';

export async function PATCH(req) {
  try {
    const formData = await req.formData();
    const userId = formData.get("userId");
    const name = formData.get("name");
    const email = formData.get("email");
    const avatarFile = formData.get("avatar");

    const updatePayload = { name, email };

    if (avatarFile && avatarFile.size > 0) {
      updatePayload.avatarBuffer = Buffer.from(await avatarFile.arrayBuffer());
      updatePayload.avatarFileName = avatarFile.name;
    }

    const updatedUser = await updateUser(userId, updatePayload);

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
