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
    <section className="relative py-20 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Professional Journey</span>
          </div>
          <h2 className="text-5xl font-black bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-6">
            Work Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Crafting digital excellence through {experiences.length} transformative roles
          </p>
        </div>

        {/* Enhanced Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-cyan-200 transform lg:-translate-x-1/2 rounded-full shadow-lg"></div>
          
          <div className="space-y-12 lg:space-y-16">
            {experiences.map((exp, index) => {
              const IconComponent = getRoleIcon(index);
              const isEven = index % 2 === 0;
              const isExpanded = expandedCard === index;
              
              return (
                <div key={index} className="relative group">
                  <div className={`flex flex-col lg:flex-row items-start gap-8 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}>
                    
                    {/* Enhanced Timeline Node */}
                    <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-white border-4 border-blue-500 shadow-2xl z-10 relative transform group-hover:scale-110 transition-transform duration-300 ${
                      isEven ? 'lg:ml-8' : 'lg:mr-8'
                    }`}>
                      <IconComponent className="w-6 h-6 text-blue-600" />
                      <div className="absolute -inset-4 bg-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>

                    {/* Enhanced Experience Card */}
                    <div className={`flex-1 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 group-hover:shadow-3xl group-hover:border-blue-200 transition-all duration-500 transform group-hover:scale-105 ${
                      isEven ? 'lg:text-right' : ''
                    }`}>
                      
                      {/* Role Badge */}
                      <div className={`inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100 shadow-lg mb-6 ${
                        isEven ? 'lg:ml-auto' : ''
                      }`}>
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        <span className="text-lg font-bold text-blue-700">{exp.position}</span>
                      </div>

                      {/* Company & Duration */}
                      <div className={`flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-6 ${
                        isEven ? 'lg:flex-row-reverse' : ''
                      }`}>
                        <h3 className="text-3xl font-black text-gray-900">{exp.company}</h3>
                        <div className={`flex items-center gap-3 text-gray-600 ${
                          isEven ? 'lg:flex-row-reverse' : ''
                        }`}>
                          <Calendar className="w-5 h-5" />
                          <span className="text-lg font-medium">
                            {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
                            {calculateDuration(exp.startDate, exp.endDate)}
                          </span>
                        </div>
                      </div>

                      {/* Location */}
                      {exp.location && (
                        <div className={`flex items-center gap-3 text-gray-500 mb-8 ${
                          isEven ? 'lg:justify-end' : ''
                        }`}>
                          <MapPin className="w-5 h-5" />
                          <span className="text-lg">{exp.location}</span>
                        </div>
                      )}

                      {/* Expandable Content */}
                      <div className="space-y-6">
                        {/* Achievements Preview */}
                        {exp.responsibilities.length > 0 && (
                          <div className="mb-6">
                            <h4 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-3">
                              <Target className="w-5 h-5 text-blue-600" />
                              Key Achievements
                            </h4>
                            <div className={`space-y-3 ${isEven ? 'lg:text-right' : ''}`}>
                              {exp.responsibilities.slice(0, isExpanded ? undefined : 3).map((resp, idx) => (
                                <div key={idx} className="flex items-start gap-4 group/item">
                                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0 transform group-hover/item:scale-150 transition-transform duration-300"></div>
                                  <p className="text-gray-700 leading-relaxed text-lg group-hover/item:text-gray-900 transition-colors flex-1">
                                    {resp}
                                  </p>
                                </div>
                              ))}
                            </div>
                            
                            {/* Show More/Less Button */}
                            {exp.responsibilities.length > 3 && (
                              <button
                                onClick={() => toggleExpand(index)}
                                className="flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700 transition-colors duration-300 font-semibold"
                              >
                                {isExpanded ? (
                                  <>
                                    <ChevronUp className="w-4 h-4" />
                                    Show Less
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-4 h-4" />
                                    Show More ({exp.responsibilities.length - 3} more)
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        )}

                        {/* Tech Stack */}
                        {exp.technologies.length > 0 && (
                          <div className="pt-6 border-t border-gray-200/50">
                            <h4 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">Tech Stack</h4>
                            <div className="flex flex-wrap gap-3">
                              {exp.technologies.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-4 py-2 bg-gradient-to-r from-gray-50 to-blue-50 text-gray-700 rounded-xl text-base font-semibold border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:scale-105 transform"
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
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Career Progress Footer */}
        <div className="mt-20 bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-4xl font-black text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {experiences.length}
              </div>
              <div className="text-lg text-gray-600 font-semibold">Roles Mastered</div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-black text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {(() => {
                  const totalMonths = experiences.reduce((total, exp) => {
                    const start = new Date(exp.startDate);
                    const end = exp.endDate ? new Date(exp.endDate) : new Date();
                    return total + (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                  }, 0);
                  return Math.floor(totalMonths / 12);
                })()}+
              </div>
              <div className="text-lg text-gray-600 font-semibold">Years Experience</div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-black text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {Array.from(new Set(experiences.flatMap(exp => exp.technologies))).length}+
              </div>
              <div className="text-lg text-gray-600 font-semibold">Technologies</div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-black text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {experiences.filter(exp => !exp.endDate).length}
              </div>
              <div className="text-lg text-gray-600 font-semibold">Current Roles</div>
            </div>
          </div>
          
          {/* Animated Progress Bar */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-lg text-gray-600 mb-4 font-semibold">
              <span>Career Journey Progress</span>
              <span>
                {(() => {
                  const totalMonths = experiences.reduce((total, exp) => {
                    const start = new Date(exp.startDate);
                    const end = exp.endDate ? new Date(exp.endDate) : new Date();
                    return total + (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                  }, 0);
                  const years = Math.floor(totalMonths / 12);
                  return `${years} year${years > 1 ? 's' : ''} of growth`;
                })()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{
                  width: `${Math.min(100, (experiences.length / 10) * 100)}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;