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
  <section className="relative py-16 px-4 sm:px-6">
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-cyan-50/50" />

    <div className="relative max-w-6xl mx-auto z-10">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-xl shadow border mb-4">
          <Code className="w-4 h-4 text-emerald-600" />
          <span className="text-xs sm:text-sm font-semibold text-gray-700">
            Portfolio Showcase
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-4">
          Featured Projects
        </h2>

        <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Innovative builds crafted with modern technologies and precision.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-10">
        <div className="bg-white/80 rounded-xl p-1 sm:p-2 shadow border flex gap-1 sm:gap-2">
          {[
            { key: "all", label: "All", count: projects.length },
            { key: "active", label: "Active", count: projects.filter(p => !p.endDate).length },
            { key: "completed", label: "Completed", count: projects.filter(p => p.endDate).length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all ${
                filter === tab.key
                  ? "bg-emerald-500 text-white shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project, index) => {
          const status = getProjectStatus(project.startDate, project.endDate);

          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow border flex flex-col hover:shadow-lg transition-all"
            >
              {/* Title */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow text-white">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl text-gray-900">
                      {project.name}
                    </h3>
                    {project.startDate && (
                      <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.endDate
                          ? `${formatDate(project.startDate)} - ${formatDate(project.endDate)}`
                          : `Started ${formatDate(project.startDate)}`}
                      </p>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1 border ${
                    status === "active"
                      ? "bg-orange-50 text-orange-700 border-orange-200"
                      : "bg-green-50 text-green-700 border-green-200"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      status === "active" ? "bg-orange-500 animate-pulse" : "bg-green-500"
                    }`}
                  ></span>
                  {status === "active" ? "Active" : "Completed"}
                </span>
              </div>

              {/* Duration */}
              {project.startDate && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold">
                    <Clock className="w-4 h-4" />
                    {getProjectDuration(project.startDate, project.endDate)}
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-gray-700 text-sm sm:text-base mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Tech Stack */}
              {project.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg text-white bg-gradient-to-r ${getTechColor(
                        tech
                      )}`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-3 py-1 text-xs rounded-lg bg-gray-100 text-gray-600">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              )}

              {/* Links */}
              <div className="flex gap-3 mt-auto pt-4 border-t">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-semibold hover:bg-emerald-600"
                  >
                    <Play className="w-4 h-4" />
                    Live Demo
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    className="px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 flex items-center justify-center"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-16 p-6 sm:p-10 bg-white rounded-3xl shadow border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-center">
          <SummaryStat
            icon={<Code className="w-6 h-6 text-emerald-600" />}
            value={projects.length}
            label="Total Projects"
          />
          <SummaryStat
            icon={<Zap className="w-6 h-6 text-orange-500" />}
            value={projects.filter(p => !p.endDate).length}
            label="Active"
          />
          <SummaryStat
            icon={<Star className="w-6 h-6 text-amber-500" />}
            value={Array.from(new Set(projects.flatMap(p => p.technologies))).length}
            label="Technologies"
          />
          <SummaryStat
            icon={<ExternalLink className="w-6 h-6 text-blue-600" />}
            value={projects.filter(p => p.link).length}
            label="Live Demos"
          />
        </div>
      </div>
    </div>
  </section>
);


};

export default ProjectsSection;

  const SummaryStat = ({ icon, value, label }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-center gap-3">
      {icon}
      <div className="text-3xl sm:text-4xl font-black text-gray-900">
        {value}
      </div>
    </div>
    <div className="text-sm sm:text-lg text-gray-600 font-semibold">
      {label}
    </div>
  </div>
);