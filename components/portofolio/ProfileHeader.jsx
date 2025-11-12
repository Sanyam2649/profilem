import { Mail, MapPin, ExternalLink,  Sparkles, Calendar} from 'lucide-react';

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
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-purple-100/50"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left space-y-8">

            {/* Name and Title */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">Available for opportunities</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                {profile.name.split(' ').map((name, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    {name}{' '}
                  </span>
                ))}
              </h1>

              {profile.experience?.[0] && (
                <p className="text-2xl lg:text-3xl text-gray-600 font-light max-w-2xl">
                  {profile.experience[0].position} at{' '}
                  <span className="font-semibold text-gray-800">{profile.experience[0].company}</span>
                </p>
              )}
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl font-light">
                {profile.bio}
              </p>
            )}

            {/* Enhanced Contact and Links */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-8">

              {/* Contact Info */}
              <div className="flex items-center gap-6">
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                      <Mail className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="text-sm font-medium text-gray-900">{profile.email}</div>
                    </div>
                  </a>
                )}

                {profile.location && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-500">Location</div>
                      <div className="text-sm font-medium text-gray-900">{profile.location}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-6">
              {profile.website && (
                <a
                  href={profile.website}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-medium">Website</span>
                </a>
              )}

              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="font-medium">LinkedIn</span>
                </a>
              )}

              {profile.github && (
                <a
                  href={profile.github}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="font-medium">GitHub</span>
                </a>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 relative group">
            <div className="relative">
              <div className="relative w-48 h-48 lg:w-56 lg:h-56 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center rounded-full shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <span className="text-4xl lg:text-5xl font-bold text-white">
                  {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
                {/* Animated Sparkles */}
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-4 py-2 shadow-2xl border border-gray-100">
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