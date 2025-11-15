import { connectToDatabase } from './Database.js';
import Profile from '@/modals/profile.js';
import { Types } from 'mongoose';

export async function createProfile(userId, data) {
  await connectToDatabase();

  const duplicate = await Profile.findOne({ user: userId, name: data.name });
  if (duplicate) throw new Error('A profile with this name already exists.');

  const profile = new Profile({
    ...data,
    user: new Types.ObjectId(userId)
  });

  await profile.save();
  return profile;
}

export async function getProfile(profileId) {
  await connectToDatabase();
  if (!Types.ObjectId.isValid(profileId)) throw new Error('Invalid profile ID');

  return Profile.findById(profileId);
}

export async function getProfilesByUser(userId) {
  await connectToDatabase();
  return Profile.find({ user: userId }).sort({ updatedAt: -1 });
}

export async function updateProfile(profileId, updates, userId) {
  await connectToDatabase();

  if (!Types.ObjectId.isValid(profileId)) throw new Error('Invalid profile ID');

  const query = { _id: new Types.ObjectId(profileId) };
  if (userId) query.user = new Types.ObjectId(userId);

  // Directly apply updates; schema allows optional fields
  const updated = await Profile.findOneAndUpdate(query, updates, {
    new: true,
    runValidators: true
  });

  if (!updated) throw new Error('Profile not found or unauthorized');

  return updated;
}

export async function deleteProfile(profileId, userId) {
  await connectToDatabase();

  if (!Types.ObjectId.isValid(profileId)) throw new Error('Invalid profile ID');

  const query = { _id: new Types.ObjectId(profileId) };
  if (userId) query.user = new Types.ObjectId(userId);

  const result = await Profile.deleteOne(query);
  return result.deletedCount > 0;
}

export async function deleteProfileField(profileId, field, itemIdOrValue) {
  await connectToDatabase();

  if (!Types.ObjectId.isValid(profileId)) throw new Error('Invalid profile ID');

  let pullQuery;

  // For custom section item removal
  if (field.startsWith("customSections")) {
    const [_, sectionId] = field.split(".");
    pullQuery = {
      $pull: {
        "customSections.$[section].items": { _id: new Types.ObjectId(itemIdOrValue) }
      }
    };

    return Profile.findByIdAndUpdate(
      profileId,
      pullQuery,
      {
        new: true,
        arrayFilters: [{ "section._id": new Types.ObjectId(sectionId) }]
      }
    );
  }

  pullQuery = {
    $pull: {
      [field]: { _id: new Types.ObjectId(itemIdOrValue) }
    }
  };

  return Profile.findByIdAndUpdate(profileId, pullQuery, { new: true });
}

export async function searchProfiles({
  name,
  location,
  skill,
  email,
  customFieldKey,
  customFieldValue,
  page = 1,
  limit = 10,
  sortBy = 'updatedAt',
  order = 'desc'
}) {
  await connectToDatabase();

  const query = {};

  if (name) query.name = { $regex: name, $options: 'i' };
  if (location) query.location = { $regex: location, $options: 'i' };
  if (email) query.email = { $regex: email, $options: 'i' };

  if (skill)
    query['skills.name'] = { $regex: skill, $options: 'i' };

  if (customFieldKey && customFieldValue) {
    query[`customSections.items.fields.${customFieldKey}`] = {
      $regex: customFieldValue,
      $options: 'i'
    };
  }

  const skip = (page - 1) * limit;
  const sortOrder = order === 'asc' ? 1 : -1;

  const [results, total] = await Promise.all([
    Profile.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit),
    Profile.countDocuments(query),
  ]);

  return {
    results,
    total,
    page,
    pages: Math.ceil(total / limit)
  };
}
