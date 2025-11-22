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
        <div className="flex-1 text-center lg:text-left space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900">
            {profile.name}
          </h1>

          {profile.designation && (
            <p className="text-xl md:text-2xl text-indigo-600 font-semibold tracking-tight">
              {profile.designation}
            </p>
          )}


          {profile.bio && (
            <p className="text-gray-700 text-lg leading-tight max-w-2xl mx-auto lg:mx-0">
              {profile.bio}
            </p>
          )}

          {/* CONTACT */}
          <div className="flex flex-col sm:flex-row gap-2 justify-center lg:justify-start">
            {profile.email && (
               <CommonAnchorTag
                tag={`mailto:${profile.email}`}
                title={profile.email}
                icon={<Mail className="w-5 h-5 text-indigo-600" />}
                />
            )}

            {profile.location && (
              <CommonAnchorTag 
               tag=''
               title={profile?.location}
               icon={<MapPin className="w-5 h-5 text-blue-500" />}/>
            )}
          </div>

          {/* SOCIALS */}
          <div className="flex flex-wrap gap-2 justify-center text-black lg:justify-start">
            {profile.website && (
              <CommonAnchorTag
                tag={profile.website}
                title="Website"
                icon={<ExternalLink className="w-5 h-5" />}
              />
            )}


            {profile.linkedin && (
              <CommonAnchorTag
                tag={profile?.linkedin}
                title="LinkedIn"
                icon={ <svg viewBox="0 0 32 32"  className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="2" y="2" width="28" height="28" rx="14" fill="#1275B1"></rect> <path d="M12.6186 9.69215C12.6186 10.6267 11.8085 11.3843 10.8093 11.3843C9.81004 11.3843 9 10.6267 9 9.69215C9 8.7576 9.81004 8 10.8093 8C11.8085 8 12.6186 8.7576 12.6186 9.69215Z" fill="white"></path> <path d="M9.24742 12.6281H12.3402V22H9.24742V12.6281Z" fill="white"></path> <path d="M17.3196 12.6281H14.2268V22H17.3196C17.3196 22 17.3196 19.0496 17.3196 17.2049C17.3196 16.0976 17.6977 14.9855 19.2062 14.9855C20.911 14.9855 20.9008 16.4345 20.8928 17.5571C20.8824 19.0244 20.9072 20.5219 20.9072 22H24V17.0537C23.9738 13.8954 23.1508 12.4401 20.4433 12.4401C18.8354 12.4401 17.8387 13.1701 17.3196 13.8305V12.6281Z" fill="white"></path> </g></svg>}
                />
            )}

            {profile.github && (
               <CommonAnchorTag
                tag={profile?.github}
                title="Github"
                icon={<svg viewBox="0 0 48 48" fill="none" className="w-8 h-8 text-gray-900" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="24" cy="24" r="20" fill="#181717"></circle> <path d="M6.81348 34.235C9.24811 38.3138 13.0939 41.4526 17.6772 42.9784C18.6779 43.1614 19.0425 42.5438 19.0425 42.0134C19.0425 41.7938 19.0388 41.4058 19.0339 40.8866C19.0282 40.2852 19.0208 39.5079 19.0155 38.6124C13.4524 39.8206 12.2787 35.931 12.2787 35.931C11.3689 33.6215 10.0576 33.0064 10.0576 33.0064C8.2417 31.7651 10.1951 31.7896 10.1951 31.7896C12.2025 31.9321 13.2584 33.8511 13.2584 33.8511C15.0424 36.9071 17.94 36.0243 19.0794 35.5135C19.2611 34.2207 19.7767 33.3391 20.3489 32.8394C15.908 32.3348 11.2387 30.6183 11.2387 22.9545C11.2387 20.7715 12.0184 18.9863 13.2977 17.5879C13.0914 17.082 12.4051 15.0488 13.4929 12.2949C13.4929 12.2949 15.1725 11.7571 18.9934 14.3453C20.5883 13.9021 22.2998 13.6798 24.0003 13.6725C25.6983 13.6798 27.4099 13.9021 29.0072 14.3453C32.8256 11.7571 34.5016 12.2949 34.5016 12.2949C35.5931 15.0488 34.9067 17.082 34.7005 17.5879C35.9823 18.9863 36.757 20.7715 36.757 22.9545C36.757 30.638 32.0804 32.3286 27.6247 32.8234C28.343 33.441 28.9827 34.6614 28.9827 36.5277C28.9827 38.3152 28.9717 39.8722 28.9644 40.9035C28.9608 41.4143 28.9581 41.7962 28.9581 42.0134C28.9581 42.5487 29.3178 43.1712 30.3332 42.976C33.9844 41.7572 37.1671 39.5154 39.5403 36.5903C35.8734 41.1108 30.274 44 23.9997 44C16.6943 44 10.3038 40.0832 6.81348 34.235Z" fill="white"></path> </g></svg>}
                />
            )}
          </div>
        </div>

       {/* Avatar Container - hidden on mobile */}
<div className="relative shrink-0 hidden sm:flex">
  <div
    className="
      relative 
      w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 
      rounded-full 
      bg-gradient-to-br from-indigo-500 via-blue-400 to-purple-500 
      shadow-[0_20px_40px_rgba(0,0,0,0.25)]
      flex items-center justify-center
      overflow-hidden
    "
  >
    {/* Glow Ring */}
    <div className="absolute inset-0 rounded-full bg-white/10 blur-xl" />

    {/* Inner Light Pulse */}
    <div className="absolute w-[65%] h-[65%] rounded-full bg-white/20 blur-2xl animate-pulse" />

    {/* Border Glow */}
    <div className="absolute inset-0 rounded-full border-4 border-white/30 shadow-inner" />

    {/* Initials */}
    <span className="
      relative z-10 
      text-5xl sm:text-6xl md:text-7xl 
      font-extrabold 
      text-white drop-shadow-lg
    ">
      {initials}
    </span>
  </div>
</div>

      </div>
    </section>
  );
};

export default ProfileHeader;


const CommonAnchorTag = ({ tag, title, icon }) => {
  const baseClasses = `
    group
    w-full sm:w-auto
    px-4 py-3 
    bg-white 
    border border-gray-200 
    shadow-sm 
    rounded-xl 
    flex items-center gap-3
    transition-all duration-200
    active:scale-[0.97]
  `;

  const content = (
    <>
      <div className="shrink-0 text-gray-600 group-hover:text-blue-600 transition">
        {icon}
      </div>
      <span className="font-medium text-gray-800 text-sm sm:text-base group-hover:text-blue-700 transition">
        {title}
      </span>
    </>
  );

  // No tag → non-clickable DIV
  if (!tag) {
    return (
      <div
        className={`${baseClasses} opacity-70 cursor-not-allowed hover:bg-white`}
      >
        {content}
      </div>
    );
  }

  // Tag exists → clickable LINK
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
