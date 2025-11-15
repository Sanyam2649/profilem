import { Mail, MapPin, ExternalLink, Calendar, Github, Linkedin } from "lucide-react";

const ProfileHeader = ({ profile }) => {
  const initials = profile.name
    ?.split(" ")
    ?.map((n) => n[0])
    ?.join("")
    ?.toUpperCase();

  return (
    <section className="relative w-full min-h-[85vh] flex items-center py-24 overflow-hidden">

      {/* --- NEW PREMIUM BACKGROUND (Soft Indigo Mist) --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8faff] via-[#f3f6ff] to-[#eef2ff]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 flex flex-col lg:flex-row items-center lg:items-start gap-20">

        {/* LEFT SIDE */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900">
            {profile.name}
          </h1>

          {profile.designation && (
            <p className="text-xl md:text-2xl text-indigo-600 font-semibold tracking-wide">
              {profile.designation}
            </p>
          )}

          {profile.experience?.[0] && (
            <p className="text-lg md:text-xl text-gray-700 max-w-xl">
              {profile.experience[0].position} at
              <span className="font-semibold text-indigo-600 ml-1">
                {profile.experience[0].company}
              </span>
            </p>
          )}

          {profile.bio && (
            <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {profile.bio}
            </p>
          )}

          {/* CONTACT */}
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap pt-4">
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center gap-3 text-gray-700 hover:bg-gray-50"
              >
                <Mail className="w-5 h-5 text-indigo-600" />
                <span>{profile.email}</span>
              </a>
            )}

            {profile.location && (
              <div className="px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>{profile.location}</span>
              </div>
            )}
          </div>

          {/* SOCIALS */}
          <div className="flex flex-wrap gap-5 pt-6 justify-center text-black lg:justify-start">
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                className="px-4 py-3 bg-white border border-gray-200 shadow-sm rounded-xl flex items-center gap-2 hover:bg-gray-50"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Website</span>
              </a>
            )}

            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                className="px-4 py-3 bg-white border border-gray-200 shadow-sm rounded-xl flex items-center gap-2 hover:bg-gray-50"
              >
                <Linkedin className="w-5 h-5 text-blue-700" />
                <span>LinkedIn</span>
              </a>
            )}

            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                className="px-4 py-3 bg-white border border-gray-200 shadow-sm rounded-xl flex items-center gap-2 hover:bg-gray-50"
              >
                <Github className="w-5 h-5 text-gray-900" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* RIGHT SIDE — AVATAR OR INITIALS */}
        <div className="relative flex-shrink-0">
          {/* Avatar OR Initials Orb */}
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-indigo-500 via-blue-400 to-purple-400 shadow-2xl flex items-center justify-center">
            <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white">
              {initials}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
