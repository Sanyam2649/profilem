import {useState } from 'react';
import { GraduationCap, Calendar, Award, BookOpen, Star, Clock, Trophy, ChevronDown, ChevronUp } from 'lucide-react';


const EducationSection = ({ education }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return Math.ceil(months / 12);
  };

  const getGradeColor = (grade) => {
    const numericGrade = parseFloat(grade);
    if (!isNaN(numericGrade)) {
      if (numericGrade >= 3.8) return 'from-green-500 to-emerald-600';
      if (numericGrade >= 3.5) return 'from-blue-500 to-cyan-600';
      if (numericGrade >= 3.0) return 'from-purple-500 to-pink-600';
    }
    
    if (grade.includes('A+') || grade.includes('100')) return 'from-green-500 to-emerald-600';
    if (grade.includes('A') || grade.includes('90')) return 'from-blue-500 to-cyan-600';
    if (grade.includes('B') || grade.includes('80')) return 'from-purple-500 to-pink-600';
    return 'from-gray-500 to-gray-600';
  };

  const calculateGPAWidth = (grade) => {
    if (grade.includes('/')) {
      const [current, total] = grade.split('/').map(parseFloat);
      if (!isNaN(current) && !isNaN(total)) {
        return (current / total) * 100;
      }
    }
    
    if (grade.includes('%')) {
      return parseFloat(grade);
    }
    
    const numericGrade = parseFloat(grade);
    if (!isNaN(numericGrade)) {
      if (numericGrade <= 4.0) return (numericGrade / 4.0) * 100;
      if (numericGrade <= 10.0) return (numericGrade / 10.0) * 100;
    }
    
    return 0;
  };

  const getGradeText = (grade) => {
    if (grade.includes('/')) return `GPA: ${grade}`;
    if (grade.includes('%')) return `Score: ${grade}`;
    return `GPA: ${grade}`;
  };

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

return (
  <section className="relative py-14 sm:py-20 px-4 sm:px-6">
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 to-indigo-50/60"></div>

    <div className="container mx-auto max-w-6xl relative z-10">

      {/* HEADER */}
      <div className="text-center mb-14 sm:mb-16 px-2">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-blue-200/50 mb-5">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <span className="text-xs sm:text-sm font-semibold text-gray-700">
            Academic Excellence
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent leading-tight mb-5">
          Education
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Building foundations for innovation through academic achievement and continuous learning
        </p>
      </div>

      {/* EDUCATION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">

        {education.map((edu, index) => {
          const isExpanded = expandedCard === index;

          return (
            <div key={index} className="group h-full">
              <div className="
                bg-white/80 backdrop-blur-lg rounded-3xl p-6 sm:p-8 
                shadow-2xl border border-gray-200/60 
                transition-all duration-500 
                hover:border-blue-200 
                hover:shadow-3xl 
                hover:scale-[1.02] 
                h-full flex flex-col
              ">
                
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">

                  {/* Institution & Dates */}
                  <div className="flex items-start gap-4 w-full min-w-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <GraduationCap className="w-7 h-7 text-white" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xl sm:text-2xl font-black text-gray-900 truncate">
                        {edu.institution}
                      </h3>

                      <div className="flex items-center gap-2 sm:gap-3 text-gray-500 text-sm sm:text-lg flex-wrap">
                        <Calendar className="w-4 sm:w-5 h-4 sm:h-5" />
                        <span className="truncate">
                          {formatDate(edu.startDate)} — {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="self-end sm:self-auto">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 text-blue-700 rounded-2xl text-xs sm:text-sm font-bold shadow-lg">
                      <Clock className="w-4 h-4" />
                      <span>{calculateDuration(edu.startDate, edu.endDate)} yrs</span>
                    </div>
                  </div>
                </div>

                {/* Degree & Field */}
                <div className="mb-6 min-w-0">
                  <h4 className="text-xl sm:text-2xl font-black text-gray-800 truncate mb-2">
                    {edu.degree}
                  </h4>

                  <div className="flex items-center gap-2 sm:gap-3 text-gray-600 text-sm sm:text-lg truncate">
                    <BookOpen className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span className="font-semibold truncate">{edu.fieldOfStudy}</span>
                  </div>
                </div>

                {/* Grade Performance */}
                {edu.grade && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-amber-500" />
                        <span className="text-sm sm:text-lg font-bold text-gray-700">Academic Performance</span>
                      </div>

                      <span
                        className={`text-sm sm:text-lg font-black bg-gradient-to-r ${getGradeColor(
                          edu.grade
                        )} bg-clip-text text-transparent`}
                      >
                        {getGradeText(edu.grade)}
                      </span>
                    </div>

                    {/* GPA Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                      <div
                        className="
                          h-3 rounded-full bg-gradient-to-r 
                          from-blue-500 to-purple-600 shadow-lg 
                          transition-all duration-1000 ease-out
                        "
                        style={{ width: `${calculateGPAWidth(edu.grade)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* DESCRIPTION */}
                {edu.description && (
                  <div className="pt-6 border-t border-gray-200/60 flex-1">
                    <p
                      className={`
                        text-gray-700 text-sm sm:text-lg leading-relaxed 
                        transition-all duration-500 
                        ${isExpanded ? 'line-clamp-none' : 'line-clamp-3'}
                      `}
                    >
                      {edu.description}
                    </p>

                    {edu.description.length > 150 && (
                      <button
                        onClick={() => toggleExpand(index)}
                        className="flex items-center gap-2 mt-3 text-blue-600 hover:text-blue-700 text-sm sm:text-base font-semibold"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-4 h-4" /> Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" /> Read More
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* SUMMARY SECTION */}
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 sm:p-10 border border-gray-200/60 shadow-2xl">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">

          {/* Degrees */}
          <div>
            <div className="flex items-center justify-center gap-3">
              <GraduationCap className="w-7 sm:w-8 h-7 sm:h-8 text-blue-600" />
              <div className="text-3xl sm:text-4xl font-black text-gray-900">
                {education.length}
              </div>
            </div>
            <div className="text-sm sm:text-lg text-gray-600 font-semibold mt-1">
              Degrees
            </div>
          </div>

          {/* Years Studied */}
          <div>
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-7 sm:w-8 h-7 sm:h-8 text-green-600" />
              <div className="text-3xl sm:text-4xl font-black text-gray-900">
                {education.reduce(
                  (total, edu) => total + calculateDuration(edu.startDate, edu.endDate),
                  0
                )}
                +
              </div>
            </div>
            <div className="text-sm sm:text-lg text-gray-600 font-semibold mt-1">
              Years Studied
            </div>
          </div>

          {/* Honors */}
          <div>
            <div className="flex items-center justify-center gap-3">
              <Trophy className="w-7 sm:w-8 h-7 sm:h-8 text-amber-500" />
              <div className="text-3xl sm:text-4xl font-black text-gray-900">
                {
                  education.filter((edu) => {
                    if (!edu.grade) return false;
                    const num = parseFloat(edu.grade);
                    return !isNaN(num) && num >= 3.5;
                  }).length
                }
              </div>
            </div>
            <div className="text-sm sm:text-lg text-gray-600 font-semibold mt-1">
              Honors
            </div>
          </div>

          {/* Highest Degree */}
          <div>
            <div className="flex items-center justify-center gap-3">
              <Star className="w-7 sm:w-8 h-7 sm:h-8 text-purple-600" />
              <div className="text-3xl sm:text-4xl font-black text-gray-900">
                {(() => {
                  const degreeOrder = ['PhD', 'Masters', 'Bachelor', 'Associate', 'Diploma', 'Certificate'];
                  for (const d of degreeOrder) {
                    const match = education.find((e) =>
                      e.degree.toLowerCase().includes(d.toLowerCase())
                    );
                    if (match) return match.degree.split(' ')[0];
                  }
                  return education[0]?.degree.split(' ')[0] || 'None';
                })()}
              </div>
            </div>
            <div className="text-sm sm:text-lg text-gray-600 font-semibold mt-1">
              Highest Degree
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-8 pt-6 border-t border-gray-200/60">
          <div className="flex items-center justify-between text-sm sm:text-lg text-gray-600 mb-4 font-semibold">
            <span>Academic Journey Progress</span>
            <span>{education.length} qualifications completed</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 shadow-lg transition-all duration-1000 ease-out"
              style={{
                width: `${Math.min(100, (education.length / 5) * 100)}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

};

export default EducationSection;