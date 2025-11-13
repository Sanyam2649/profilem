import { Mail, MapPin, ExternalLink,  Sparkles, Calendar, Linkedin, Github} from 'lucide-react';

const ProfileHeader = ({ profile }) => {
 
  const calculateExperience = () => {
    if (!profile.experience?.length) return 0;
    
    const totalMonths = profile.experience.reduce((total, exp) => {
      const start = new Date(exp.startDate);
      const end = exp.endDate ? new Date(exp.endDate) : new Date();
      return total + (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    }, 0);
    
    return Math.floor(totalMonths / 12);
  };

return (
  <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-purple-100/50"></div>
    </div>

    <div className="container mx-auto max-w-6xl relative z-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">

        {/* LEFT COLUMN */}
        <div className="flex-1 text-center lg:text-left space-y-8">

          {/* Name + Title */}
          <div className="space-y-4">

            {/* Availability */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700">
                Available for opportunities
              </span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 leading-tight flex flex-wrap justify-center lg:justify-start">
              {profile.name.split(" ").map((name, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mr-2"
                >
                  {name}
                </span>
              ))}
            </h1>

            {/* Subtitle (Experience) */}
            {profile.experience?.[0] && (
              <p className="text-lg sm:text-2xl lg:text-3xl text-gray-600 font-light max-w-2xl mx-auto lg:mx-0">
                {profile.experience[0].position} at{" "}
                <span className="font-semibold text-gray-800">
                  {profile.experience[0].company}
                </span>
              </p>
            )}
          </div>

          {/* BIO */}
          {profile.bio && (
            <p className="text-base sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto lg:mx-0">
              {profile.bio}
            </p>
          )}

          {/* CONTACT CARDS */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-6 sm:pt-8">

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">

              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-300 w-full sm:w-auto"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Email</div>
                    <div className="text-sm font-medium text-gray-900 break-all">
                      {profile.email}
                    </div>
                  </div>
                </a>
              )}

              {profile.location && (
                <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl w-full sm:w-auto border border-gray-200 shadow-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Location</div>
                    <div className="text-sm font-medium text-gray-900">
                      {profile.location}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex flex-wrap items-center gap-4 pt-6 justify-center lg:justify-start">

            {profile.website && (
              <a
                href={profile.website}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg"
                target="_blank"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="font-medium">Website</span>
              </a>
            )}

            {profile.linkedin && (
              <a
                href={profile.linkedin}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
                target="_blank"
              >
                <Linkedin className="w-4 h-4" />
                <span className="font-medium">LinkedIn</span>
              </a>
            )}

            {profile.github && (
              <a
                href={profile.github}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all duration-300 shadow-lg"
                target="_blank"
              >
                <Github className="w-4 h-4" />
                <span className="font-medium">GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN — Avatar */}
        <div className="flex-shrink-0 relative group mt-4 sm:mt-6 lg:mt-0">

          <div className="relative">
            <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                {profile.name
                  .split(" ")
                  .map(n => n[0])
                  .join("")
                  .toUpperCase()}
              </span>

              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Experience Floating Tag */}
          <div className="absolute -bottom-4 -right-3 bg-white rounded-2xl px-4 py-2 shadow-2xl border border-gray-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-gray-900">
                {calculateExperience()}+ years
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

};

export default ProfileHeader;