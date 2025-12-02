import { Mail, MapPin, ExternalLink, Calendar, Github, Linkedin } from "lucide-react";
import Bio from "./bio";
import Background from "@/public/SPRINKLES.png";
import person from "@/public/Group 2345.png"
import Image from "next/image";

const ProfileHeader = ({ profile }) => {
  const initials = profile.name
    ?.split(" ")
    ?.map((n) => n[0])
    ?.join("")
    ?.toUpperCase();

  return (
    <div className="flex flex-col">
     <section className="relative w-full min-h-[90vh] flex items-center py-20 md:py-28 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gray-900">
                {profile.name}
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#00ADB5] mt-4">
                  {profile.designation}
                </span>
              </h1>

              {/* Contact Section */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {profile.email && (
                  <CommonAnchorTag
                    tag={`mailto:${profile.email}`}
                    title={profile.email}
                    icon={<Mail className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />}
                  />
                )}

                {profile.location && (
                  <CommonAnchorTag
                    tag=''
                    title={profile.location}
                    icon={<MapPin className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300" />}
                  />
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <p className="text-lg font-semibold text-white">Connect with me</p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {profile.website && (
                  <CommonAnchorTag
                    tag={profile.website}
                    title="Website"
                    icon={
                      <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                        <ExternalLink className="w-5 h-5 text-blue-700" />
                      </div>
                    }
                  />
                )}

                {profile.linkedin && (
                  <CommonAnchorTag
                    tag={profile.linkedin}
                    title="LinkedIn"
                    icon={
                      <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                        <div className="w-5 h-5">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="text-[#0A66C2]">
                            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                          </svg>
                        </div>
                      </div>
                    }
                  />
                )}

                {profile.github && (
                  <CommonAnchorTag
                    tag={profile.github}
                    title="GitHub"
                    icon={
                      <div className="p-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl group-hover:from-gray-100 group-hover:to-gray-200 transition-all duration-300">
                        <div className="w-5 h-5">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
                            <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"></path>
                          </svg>
                        </div>
                      </div>
                    }
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative shrink-0 hidden lg:flex">
            <div className="relative w-[500px] h-[500px]">
              {/* Background decorative frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-[3rem] rotate-6 opacity-80"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 rounded-[2.8rem] -rotate-3 opacity-60"></div>
              
              {/* Images */}
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image 
                  src={Background} 
                  alt="Background" 
                  fill
                  className="object-cover"
                  priority
                />
                <Image 
                  src={person} 
                  alt={profile.name} 
                  fill
                  className="object-contain object-center scale-90"
                  priority
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {profile.bio && <section>
          {profile.bio && (
            <Bio Bio={profile.bio}/>
        )}
      </section>}
    </div>
  );
};

export default ProfileHeader;


const CommonAnchorTag = ({ tag, title, icon }) => {
  const baseClasses = `
    group
    w-full sm:w-auto
    px-4 py-3 
    bg-[#00ADB5] 
    border border-gray-200 
    shadow-sm 
    rounded-xl 
    flex items-center gap-3
    transition-all duration-200
    active:scale-[0.97]
  `;

  const content = (
    <>
      <div className="shrink-0 text-white group-hover:text-[#00ADB5] transition">
        {icon}
      </div>
      <span className="font-medium text-white group-hover:text-[#00ADB5] transition">
        {title}
      </span>
    </>
  );

  if (!tag) {
    return (
      <div
        className={`${baseClasses} opacity-70 cursor-not-allowed hover:bg-white hover:text-[#00ADB5]`}
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={tag}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        ${baseClasses} 
        cursor-pointer 
        hover:shadow-md 
        hover:bg-gray-50
      `}
    >
      {content}
    </a>
  );
};
