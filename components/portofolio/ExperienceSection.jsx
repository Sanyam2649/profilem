// ExperienceSection.tsx
import { useState } from 'react';
import { Calendar, MapPin, Rocket, Target, Zap, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

const ExperienceSection = ({ experiences }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${remainingMonths} mos`;
    if (remainingMonths === 0) return `${years} yr${years > 1 ? 's' : ''}`;
    return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mos`;
  };

  const getRoleIcon = (index) => {
    const icons = [Rocket, Target, Zap, TrendingUp];
    return icons[index % icons.length];
  };

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

return (
  <section className="relative py-16 sm:py-20 px-4 sm:px-6">
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50"></div>

    <div className="container mx-auto max-w-6xl relative z-10">

      {/* HEADER */}
      <div className="text-center mb-14 sm:mb-16 px-2">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 sm:px-6 sm:py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 mb-6">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-semibold text-gray-700">
            Professional Journey
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent leading-tight mb-4">
          Work Experience
        </h2>

        <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Crafting digital excellence through {experiences.length} transformative roles
        </p>
      </div>

      {/* TIMELINE WRAPPER */}
      <div className="relative">

        {/* Vertical Line */}
        <div className="absolute left-6 sm:left-10 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b 
                        from-blue-200 via-purple-200 to-cyan-200 rounded-full shadow-md
                        md:-translate-x-1/2"></div>

        <div className="space-y-12 sm:space-y-14 md:space-y-16">

          {experiences.map((exp, index) => {
            const IconComponent = getRoleIcon(index);
            const isEven = index % 2 === 0;
            const isExpanded = expandedCard === index;

            return (
              <div key={index} className="relative group px-2">

                {/* MOBILE FIRST — always stacked */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 
                                md:gap-12 
                                md:justify-between 
                                md:max-w-[48%]
                                md:absolute
                                md:top-0
                                md:left-0
                                md:right-0
                                md:mx-auto
                                md:relative
                                md:[&.even]:justify-end
                                ">

                  {/* TIMELINE NODE */}
                  <div className={`
                    w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-4 border-blue-500 
                    shadow-2xl z-10 flex items-center justify-center 
                    transform transition-transform duration-300 
                    ${isEven ? 'md:order-last md:ml-10' : 'md:mr-10'}
                  `}>
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>

                  {/* EXPERIENCE CARD */}
                  <div className={`
                    flex-1 bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 
                    shadow-xl hover:shadow-2xl border border-gray-200/70 
                    transition-all duration-300 
                    ${isEven ? 'md:text-right md:mr-auto' : 'md:text-left md:ml-auto'}
                  `}>

                    {/* ROLE BADGE */}
                    <div className={`inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 
                                    bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl 
                                    border border-blue-100 shadow-md mb-6 
                                    ${isEven ? 'md:ml-auto' : ''}`}>
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      <span className="text-base sm:text-lg font-bold text-blue-700">
                        {exp.position}
                      </span>
                    </div>

                    {/* COMPANY + DATE */}
                    <div className={`
                      flex flex-col lg:flex-row gap-3 sm:gap-6 mb-6 
                      ${isEven ? 'md:flex-row-reverse' : ''}
                    `}>
                      <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                        {exp.company}
                      </h3>

                      <div className={`flex items-center gap-3 text-gray-600 text-sm sm:text-base
                                      ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <Calendar className="w-5 h-5" />
                        <span>
                          {formatDate(exp.startDate)} –{' '}
                          {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold text-xs sm:text-sm">
                          {calculateDuration(exp.startDate, exp.endDate)}
                        </span>
                      </div>
                    </div>

                    {/* LOCATION */}
                    {exp.location && (
                      <div className={`flex items-center gap-3 text-gray-500 mb-6 
                                      text-sm sm:text-lg
                                      ${isEven ? 'md:justify-end' : ''}`}>
                        <MapPin className="w-5 h-5" />
                        {exp.location}
                      </div>
                    )}

                    {/* RESPONSIBILITIES */}
                    {exp.responsibilities?.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm sm:text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-3">
                          <Target className="w-5 h-5 text-blue-600" />
                          Key Achievements
                        </h4>

                        <div className="space-y-3">
                          {exp.responsibilities
                            .slice(0, isExpanded ? exp.responsibilities.length : 3)
                            .map((resp, idx) => (
                              <div key={idx} className="flex items-start gap-4">
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                  {resp}
                                </p>
                              </div>
                            ))}
                        </div>

                        {/* Toggle */}
                        {exp.responsibilities.length > 3 && (
                          <button
                            onClick={() => toggleExpand(index)}
                            className="flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700 text-sm sm:text-base font-semibold"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            {isExpanded
                              ? 'Show Less'
                              : `Show More (${exp.responsibilities.length - 3} more)`}
                          </button>
                        )}
                      </div>
                    )}

                    {/* TECH STACK */}
                    {exp.technologies.length > 0 && (
                      <div className="pt-6 border-t border-gray-200/50">
                        <h4 className="text-sm sm:text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">
                          Tech Stack
                        </h4>

                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {exp.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-gray-50 to-blue-50 
                                         text-gray-700 rounded-xl text-xs sm:text-base 
                                         border border-gray-200 hover:border-blue-300 
                                         hover:shadow-lg transition-all duration-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CAREER FOOTER */}
      <div className="mt-20 bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-2xl">

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">

          <div>
            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {experiences.length}
            </div>
            <div className="text-sm sm:text-lg text-gray-600 font-semibold">Roles Mastered</div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {(() => {
                const months = experiences.reduce((total, exp) => {
                  const start = new Date(exp.startDate);
                  const end = exp.endDate ? new Date(exp.endDate) : new Date();
                  return total + ((end - start) / (1000 * 60 * 60 * 24 * 30));
                }, 0);
                return Math.floor(months / 12);
              })()}+
            </div>
            <div className="text-sm sm:text-lg text-gray-600 font-semibold">Years Experience</div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {Array.from(new Set(experiences.flatMap(e => e.technologies))).length}+
            </div>
            <div className="text-sm sm:text-lg text-gray-600 font-semibold">Technologies</div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {experiences.filter(exp => !exp.endDate).length}
            </div>
            <div className="text-sm sm:text-lg text-gray-600 font-semibold">Current Roles</div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-10">
          <div className="flex items-center justify-between text-xs sm:text-lg text-gray-600 mb-3 font-semibold">
            <span>Career Journey Progress</span>
            <span>
              {(() => {
                const months = experiences.reduce((total, exp) => {
                  const start = new Date(exp.startDate);
                  const end = exp.endDate ? new Date(exp.endDate) : new Date();
                  return total + ((end - start) / (1000 * 60 * 60 * 24 * 30));
                }, 0);
                const years = Math.floor(months / 12);
                return `${years} years of growth`;
              })()}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(100, (experiences.length / 10) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

};

export default ExperienceSection;