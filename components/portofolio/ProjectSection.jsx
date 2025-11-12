import {useState } from 'react';
import { ExternalLink, Calendar, Code, Zap, Star, Clock, Github, ArrowUpRight, Play } from 'lucide-react';

const ProjectsSection = ({ projects }) => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getProjectDuration = (startDate, endDate) => {
    if (!startDate) return null;
    
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    if (months < 12) return `${months} month${months !== 1 ? 's' : ''}`;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`;
    return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  };

  const getTechColor = (tech) => {
    const techColors = {
      'React': 'from-blue-500 to-cyan-500',
      'TypeScript': 'from-blue-600 to-blue-800',
      'JavaScript': 'from-yellow-400 to-yellow-600',
      'Node.js': 'from-green-500 to-green-700',
      'Python': 'from-blue-400 to-indigo-600',
      'Next.js': 'from-gray-700 to-gray-900',
      'Vue': 'from-green-400 to-green-600',
      'Angular': 'from-red-500 to-red-700',
      'Express': 'from-gray-500 to-gray-700',
      'MongoDB': 'from-green-600 to-green-800',
      'PostgreSQL': 'from-blue-700 to-blue-900',
      'Tailwind': 'from-teal-400 to-cyan-500',
      'AWS': 'from-orange-400 to-orange-600',
      'Docker': 'from-blue-400 to-blue-600',
      'Kubernetes': 'from-blue-500 to-blue-700',
    };
    
    return techColors[tech] || 'from-purple-500 to-pink-500';
  };

  const getProjectStatus = (startDate, endDate) => {
    if (!endDate) return 'active';
    return 'completed';
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => getProjectStatus(project.startDate, project.endDate) === filter);

  return (
    <section className="relative py-20 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-cyan-50/50"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-200/50 mb-6">
            <Code className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-semibold text-gray-700">Portfolio Showcase</span>
          </div>
          <h2 className="text-5xl font-black bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Building innovative solutions and bringing ideas to life through cutting-edge technology
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200/50">
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'All Projects', count: projects.length },
                { key: 'active', label: 'Active', count: projects.filter(p => !p.endDate).length },
                { key: 'completed', label: 'Completed', count: projects.filter(p => p.endDate).length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    filter === tab.key
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => {
            const isHovered = hoveredProject === index;
            const status = getProjectStatus(project.startDate, project.endDate);
            
            return (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Background Glow */}
                <div className={`absolute -inset-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                  isHovered ? 'opacity-20' : ''
                }`}></div>
                
                <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-200/50 transition-all duration-500 h-full flex flex-col relative z-10 ${
                  isHovered ? 'transform scale-105 shadow-3xl border-emerald-200' : ''
                }`}>
                  
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                          {project.name}
                        </h3>
                        {project.startDate && (
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {project.endDate 
                                ? `${formatDate(project.startDate)} - ${formatDate(project.endDate)}`
                                : `Started ${formatDate(project.startDate)}`
                              }
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                      status === 'active'
                        ? 'bg-orange-50 text-orange-700 border border-orange-200'
                        : 'bg-green-50 text-green-700 border border-green-200'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        status === 'active' ? 'bg-orange-500 animate-pulse' : 'bg-green-500'
                      }`}></div>
                      <span>{status === 'active' ? 'Active' : 'Completed'}</span>
                    </div>
                  </div>

                  {/* Duration */}
                  {project.startDate && (
                    <div className="mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-xl text-sm font-semibold">
                        <Clock className="w-4 h-4" />
                        <span>{getProjectDuration(project.startDate, project.endDate)}</span>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div className="mb-6 flex-1">
                    <p className="text-gray-700 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 5).map((tech, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1.5 bg-gradient-to-r ${getTechColor(tech)} text-white rounded-lg text-xs font-semibold shadow-lg transform transition-transform duration-300 ${
                              isHovered ? 'scale-105' : 'scale-100'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold">
                            +{project.technologies.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Project Links */}
                  <div className="pt-4 border-t border-gray-200/50">
                    <div className="flex items-center gap-3">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all duration-300 flex-1 justify-center group/link shadow-lg hover:shadow-xl"
                        >
                          <Play className="w-4 h-4" />
                          <span className="font-semibold">Live Demo</span>
                          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                        </a>
                      )}
                      
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Projects Summary */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <Code className="w-8 h-8 text-emerald-600" />
                <div className="text-4xl font-black text-gray-900">{projects.length}</div>
              </div>
              <div className="text-lg text-gray-600 font-semibold">Total Projects</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <Zap className="w-8 h-8 text-orange-500" />
                <div className="text-4xl font-black text-gray-900">
                  {projects.filter(p => !p.endDate).length}
                </div>
              </div>
              <div className="text-lg text-gray-600 font-semibold">Active Projects</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <Star className="w-8 h-8 text-amber-500" />
                <div className="text-4xl font-black text-gray-900">
                  {Array.from(new Set(projects.flatMap(p => p.technologies || []))).length}+
                </div>
              </div>
              <div className="text-lg text-gray-600 font-semibold">Technologies</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <ExternalLink className="w-8 h-8 text-blue-500" />
                <div className="text-4xl font-black text-gray-900">
                  {projects.filter(p => p.link).length}
                </div>
              </div>
              <div className="text-lg text-gray-600 font-semibold">Live Demos</div>
            </div>
          </div>

          {/* Technology Diversity Chart */}
          <div className="mt-8 pt-8 border-t border-gray-200/50">
            <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">Technology Distribution</h4>
            <div className="flex flex-wrap gap-3 justify-center">
              {Array.from(new Set(projects.flatMap(p => p.technologies || [])))
                .slice(0, 8)
                .map((tech, idx) => (
                  <div key={tech} className="flex items-center gap-2">
                    <div 
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${getTechColor(tech)}`}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">{tech}</span>
                  </div>
                ))}
              {Array.from(new Set(projects.flatMap(p => p.technologies || []))).length > 8 && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    +{Array.from(new Set(projects.flatMap(p => p.technologies || []))).length - 8} more
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;