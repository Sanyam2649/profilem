import { connectToDatabase } from './Database.js';
import User from '@/modals/user.js';
import bcrypt from 'bcryptjs';
import Profile from '@/modals/profile.js';
import { v2 as cloudinary } from 'cloudinary';

// ----------------- Cloudinary Config -----------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ----------------- User Functions -----------------
export async function registerUser(data) {
  await connectToDatabase();

  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error('User with this email already exists');

  let avatarUrl;
  if (data.avatar) {
    // Upload avatar to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(data.avatar, {
      folder: 'avatars',
      transformation: [{ width: 250, height: 250, crop: 'thumb', gravity: 'face' }],
    });
    avatarUrl = uploadResult.secure_url;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    avatar: avatarUrl,
  });

  return user;
}

export async function loginUser(email, password) {
  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid email or password');
  await user.save();

  return user;
}

export async function getUserById(userId) {
  await connectToDatabase();
  return await User.findById(userId).select('-password');
}

export async function updateUser(userId, data) {
  await connectToDatabase();

  let avatarUrl;
  if (data.avatar) {
    const uploadResult = await cloudinary.uploader.upload(data.avatar, {
      folder: 'avatars',
      transformation: [{ width: 250, height: 250, crop: 'thumb', gravity: 'face' }],
    });
    avatarUrl = uploadResult.secure_url;
  }

  const updatedData = {
    ...data,
    ...(avatarUrl ? { avatar: avatarUrl } : {}),
  };

  return await User.findByIdAndUpdate(userId, updatedData, { new: true }).select('-password');
}

export async function deleteUser(userId) {
  await connectToDatabase();

  // Optional: delete avatar from Cloudinary if exists
  const user = await User.findById(userId);
  if (user?.avatar) {
    try {
      const publicId = user.avatar.split('/').pop()?.split('.')[0];
      if (publicId) await cloudinary.uploader.destroy(`avatars/${publicId}`);
    } catch (err) {
      console.warn('Failed to delete Cloudinary avatar', err);
    }
  }

  await User.findByIdAndDelete(userId);
  await Profile.deleteMany({ user: userId });

  return { success: true };
}