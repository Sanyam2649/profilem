"use client";

import { useRef, useState, useEffect } from "react";
import { Code, Calendar, Github, Play, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectsSection({ projects = [] }) {
  const scrollRef = useRef(null);

  const [showArrows, setShowArrows] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const CARD_WIDTH = 300 + 24;

  /* ----------------------- CHECK OVERFLOW ----------------------- */
  const checkOverflow = () => {
    const el = scrollRef.current;
    if (!el) return;

    const hasOverflow = el.scrollWidth > el.clientWidth;
    setShowArrows(hasOverflow);

    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  };

  /* ----------------------- SCROLL HANDLERS ----------------------- */
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -CARD_WIDTH, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: CARD_WIDTH, behavior: "smooth" });
  };

  /* ----------------------- EVENTS ----------------------- */
  useEffect(() => {
    const frame = requestAnimationFrame(checkOverflow);

    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkOverflow);
    window.addEventListener("resize", checkOverflow);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", checkOverflow);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [projects]);

  return (
    <section className="relative py-16 px-6">
      <div className="mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white border rounded-xl shadow-sm">
            <Code className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-gray-700">
              Project Portfolio
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black mt-4 bg-gradient-to-r from-gray-900 to-emerald-800 text-transparent bg-clip-text">
            Featured Projects
          </h2>
        </div>

        {/* SCROLL ARROWS */}
        {showArrows && (
          <div className="flex justify-end gap-3 mb-4">
            {/* LEFT BUTTON */}
            <button
              disabled={atStart}
              onClick={scrollLeft}
              className={`
                p-2 rounded-full transition
                ${atStart ? "bg-gray-200 opacity-40" : "bg-gray-200 hover:bg-gray-300"}
              `}
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* RIGHT BUTTON */}
            <button
              disabled={atEnd}
              onClick={scrollRight}
              className={`
                p-2 rounded-full transition
                ${atEnd ? "bg-gray-200 opacity-40" : "bg-gray-200 hover:bg-gray-300"}
              `}
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}

        {/* SCROLLER */}
        <div
          ref={scrollRef}
          className="
            flex gap-6 overflow-x-auto scrollbar-none
            snap-x snap-mandatory pb-4 pt-2
          "
        >
          {projects.map((p, i) => (
            <div
              key={i}
              className="snap-center flex-shrink-0 w-[300px]" // NO HALF CARDS, FIXED WIDTH
            >
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

  return (
    <div
      className="
        bg-white border border-gray-200 rounded-2xl shadow-sm
        hover:shadow-xl hover:-translate-y-1 transition-all
        p-6 flex flex-col h-full w-[300px]   /* FIXED SIZE */
      "
    >
      {/* TITLE ROW */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2">
          {project.name}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap
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

      {/* DATES */}
      <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
        <Calendar className="w-4 h-4" />

        {project.endDate
          ? `${formatDate(project.startDate)} - ${formatDate(project.endDate)}`
          : `Started ${formatDate(project.startDate)}`}
      </div>

      {/* DESCRIPTION */}
      <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-4">
        {project.description}
      </p>

      {/* TECH STACK */}
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

      {/* ACTION BUTTONS */}
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
            Live 
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
