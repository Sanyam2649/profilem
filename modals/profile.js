import { Schema, model, models } from 'mongoose';

const EducationSchema = new Schema(
    {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        fieldOfStudy: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        grade: { type: String },
        description: { type: String },
    },
    { _id: false }
);

const ExperienceSchema = new Schema(
    {
        company: { type: String, required: true },
        position: { type: String, required: true },
        location: { type: String },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        responsibilities: [{ type: String }],
        technologies: [{ type: String }],
    },
    { _id: false }
);

const ProjectSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        link: { type: String },
        github: { type: String },
        technologies: [{ type: String }],
        startDate: { type: Date },
        endDate: { type: Date },
    },
    { _id: false }
);

const SkillSchema = new Schema(
    {
        name: { type: String, required: true },
        level: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'] },
        category: { type: String },
    },
    { _id: false }
);

// ---- Main Profile Schema ----
const ProfileSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String },
        bio: { type: String },
        location: { type: String },
        website: { type: String },
        email: { type: String },
        phone: { type: String },
        github: { type: String },
        linkedin: { type: String },
        twitter: { type: String },
        education: [EducationSchema],
        experience: [ExperienceSchema],
        projects: [ProjectSchema],
        skills: [SkillSchema],
        certification : [{type : String}]
     },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// ---- Virtuals ----
ProfileSchema.virtual('userInfo', {
    ref: 'User',
    localField: 'user',
    foreignField: '_id',
    justOne: true,
});

// ---- Model Export ----
const Profile = models.Profile || model('Profile', ProfileSchema);
module.exports = Profile;