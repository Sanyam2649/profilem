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
    <section className="relative py-20 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 mb-6">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">Academic Excellence</span>
          </div>
          <h2 className="text-5xl font-black bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-6">
            Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Building foundations for innovation through academic achievement and continuous learning
          </p>
        </div>

        {/* Enhanced Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {education.map((edu, index) => {
            const isExpanded = expandedCard === index;
            
            return (
              <div key={index} className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 hover:shadow-3xl hover:border-blue-200 transition-all duration-500 h-full flex flex-col transform hover:scale-105">
                  
                  {/* Institution Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <GraduationCap className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 line-clamp-1">{edu.institution}</h3>
                        <div className="flex items-center gap-3 text-gray-500 text-lg">
                          <Calendar className="w-5 h-5" />
                          <span>
                            {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Duration Badge */}
                    <div className="text-right">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-2xl text-sm font-bold shadow-lg">
                        <Clock className="w-4 h-4" />
                        <span>{calculateDuration(edu.startDate, edu.endDate)} yr</span>
                      </div>
                    </div>
                  </div>

                  {/* Degree & Field */}
                  <div className="mb-6">
                    <h4 className="text-2xl font-black text-gray-800 mb-2 line-clamp-1">{edu.degree}</h4>
                    <div className="flex items-center gap-3 text-gray-600 text-lg">
                      <BookOpen className="w-5 h-5" />
                      <span className="font-semibold line-clamp-1">{edu.fieldOfStudy}</span>
                    </div>
                  </div>

                  {/* Grade Section */}
                  {edu.grade && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-amber-500" />
                          <span className="text-lg font-bold text-gray-700">Academic Performance</span>
                        </div>
                        <span className={`text-lg font-black bg-gradient-to-r ${getGradeColor(edu.grade)} bg-clip-text text-transparent`}>
                          {getGradeText(edu.grade)}
                        </span>
                      </div>
                      
                      {/* Enhanced GPA Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                          style={{
                            width: `${calculateGPAWidth(edu.grade)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Expandable Description */}
                  {edu.description && (
                    <div className="pt-6 border-t border-gray-200/50 flex-1">
                      <p className={`text-gray-700 text-lg leading-relaxed transition-all duration-500 ${
                        isExpanded ? 'line-clamp-none' : 'line-clamp-2'
                      }`}>
                        {edu.description}
                      </p>
                      
                      {edu.description.length > 150 && (
                        <button
                          onClick={() => toggleExpand(index)}
                          className="flex items-center gap-2 mt-3 text-blue-600 hover:text-blue-700 transition-colors duration-300 font-semibold"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              Read More
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

        {/* Enhanced Education Summary */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <GraduationCap className="w-8 h-8 text-blue-600" />
                <div className="text-4xl font-black text-gray-900">{education.length}</div>
              </div>
              <div className="text-lg text-gray-600 font-semibold">Degrees</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-8 h-8 text-green-600" />
                <div className="text-4xl font-black text-gray-900">
                  {education.reduce((total, edu) => total + calculateDuration(edu.startDate, edu.endDate), 0)}+
                </div>
              </div>
              <div className="text-lg text-gray-600 font-semibold">Years Studied</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <Trophy className="w-8 h-8 text-amber-500" />
                <div className="text-4xl font-black text-gray-900">
                  {education.filter(edu => {
                    if (!edu.grade) return false;
                    const numericGrade = parseFloat(edu.grade);
                    return !isNaN(numericGrade) && numericGrade >= 3.5;
                  }).length}
                </div>
              </div>
              <div className="text-lg text-gray-600 font-semibold">Honors</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <Star className="w-8 h-8 text-purple-600" />
                <div className="text-4xl font-black text-gray-900">
                  {(() => {
                    const degreeOrder = ['PhD', 'Masters', 'Bachelor', 'Associate', 'Diploma', 'Certificate'];
                    for (const degreeType of degreeOrder) {
                      const found = education.find(edu => 
                        edu.degree.toLowerCase().includes(degreeType.toLowerCase())
                      );
                      if (found) return found.degree.split(' ')[0];
                    }
                    return education[0]?.degree.split(' ')[0] || 'No';
                  })()}
                </div>
              </div>
              <div className="text-lg text-gray-600 font-semibold">Highest Degree</div>
            </div>
          </div>

          {/* Learning Journey Progress */}
          <div className="mt-8 pt-8 border-t border-gray-200/50">
            <div className="flex items-center justify-between text-lg text-gray-600 mb-4 font-semibold">
              <span>Academic Journey Progress</span>
              <span>{education.length} qualifications completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{
                  width: `${Math.min(100, (education.length / 5) * 100)}%`
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