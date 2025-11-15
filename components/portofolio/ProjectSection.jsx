"use client";
import { Code, Calendar, Clock, Github, Play } from "lucide-react";

export default function ProjectsSection({ projects = [] }) {
  // Monster Trio Ordering (same design, different priority)
  const luffy = projects.slice(0, 3);
  const zoro = projects.slice(3, 6);
  const sanji = projects.slice(6);

  const ordered = [...luffy, ...zoro, ...sanji];

  return (
    <section className="relative py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white border rounded-xl shadow-sm">
            <Code className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-gray-700">Project Portfolio</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black mt-4 bg-gradient-to-r from-gray-900 to-emerald-800 text-transparent bg-clip-text">
            Featured Projects
          </h2>
        </div>

        {/* --- HORIZONTAL SCROLL CARDS --- */}
        <div
          className="
            flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory
            pb-4 pt-2
          "
        >
          {ordered.map((p, i) => (
            <div key={i} className="snap-center flex-shrink-0 w-[90%] sm:w-[60%] lg:w-[33%]">
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "—";

  const getDuration = (startDate, endDate) => {
    if (!startDate) return null;

    const s = new Date(startDate);
    const e = endDate ? new Date(endDate) : new Date();

    const months =
      (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());

    if (months < 12) return `${months} mo`;
    const yrs = Math.floor(months / 12);
    const rem = months % 12;

    if (rem === 0) return `${yrs} yrs`;
    return `${yrs} yrs ${rem} mo`;
  };

  return (
    <div
      className="
        bg-white border border-gray-200 rounded-2xl shadow-sm
        hover:shadow-xl hover:-translate-y-1 transition-all duration-300
        p-6 flex flex-col h-full
      "
    >
      {/* Title Row */}
      <div className="flex justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
          {project.name}
        </h3>

        <span
          className={`
            text-xs px-2 py-1 rounded-full font-semibold
            ${
              project.endDate
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-orange-50 text-orange-700 border border-orange-200"
            }
          `}
        >
          {project.endDate ? "Completed" : "Active"}
        </span>
      </div>

      {/* Dates */}
      <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
        <Calendar className="w-4 h-4" />
        {project.endDate
          ? `${formatDate(project.startDate)} - ${formatDate(project.endDate)}`
          : `Started ${formatDate(project.startDate)}`}
      </div>

      {/* Duration */}
      {project.startDate && (
        <div className="mb-4">
          <span className="text-xs px-3 py-1 rounded-lg bg-gray-100 text-gray-700 font-semibold w-fit flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {getDuration(project.startDate, project.endDate)}
          </span>
        </div>
      )}

      {/* Description */}
      <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-4">
        {project.description}
      </p>

      {/* Tech Stack */}
      {project.technologies?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.slice(0, 5).map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-lg bg-gray-100 border text-gray-700 font-medium"
            >
              {tech}
            </span>
          ))}

          {project.technologies.length > 5 && (
            <span className="px-3 py-1 text-xs rounded-lg bg-gray-50 border text-gray-500">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-auto pt-4 border-t">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            className="
              flex-1 flex items-center justify-center gap-2 px-4 py-2
              bg-emerald-500 text-white rounded-xl text-sm font-semibold
              hover:bg-emerald-600 transition-all
            "
          >
            <Play className="w-4 h-4" />
            Live Demo
          </a>
        )}

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            className="
              px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-black
              flex items-center justify-center transition-all
            "
          >
            <Github className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
