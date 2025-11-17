"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";

export default function ExperienceSection({ experiences = [] }) {
  const [expandedCard, setExpandedCard] = useState(null);

  const scrollRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  const formatDate = (d) => {
    if (!d) return "Present";
    return new Date(d).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const calcDuration = (start, end) => {
    const s = new Date(start);
    const e = end ? new Date(end) : new Date();

    const months =
      (e.getFullYear() - s.getFullYear()) * 12 +
      (e.getMonth() - s.getMonth());

    const years = Math.floor(months / 12);
    const rem = months % 12;

    if (months <= 0) return "0 mos";
    if (years === 0) return `${rem} mos`;
    if (rem === 0) return `${years} yrs`;
    return `${years} yrs ${rem} mos`;
  };

  /* ---------------------------------------------
     DETECT OVERFLOW (React 19 safe)
  --------------------------------------------- */
  const checkOverflow = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowArrows(el.scrollWidth > el.clientWidth);
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      checkOverflow();
    });

    window.addEventListener("resize", checkOverflow);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [experiences]);

  /* --------------------------------------------- */
  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });

  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col items-center gap-4 mb-14">
          <div className="inline-flex items-center justify-center gap-3 px-4 py-2 rounded-xl bg-gray-50 text-sm text-gray-700 border border-gray-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Professional Journey
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-[#0b1220]">
            Work Experience
          </h2>
        </div>

        {/* ARROWS */}
        {showArrows && (
          <div className="flex justify-end gap-3 mb-4">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}

        {/* SCROLLABLE ROW */}
        <div
          ref={scrollRef}
          className="
            flex gap-6 overflow-x-auto
            snap-x snap-mandatory scrollbar-none pb-4 justify-center
          "
        >
          {experiences.map((exp, i) => {
            const expanded = expandedCard === i;

            return (
              <div
                key={i}
                className="
                  snap-center flex-shrink-0
                  w-[300px]   /* FIXED COMPACT CARD WIDTH */
                "
              >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6">

                    {/* TITLE */}
                    <h3 className="text-lg font-extrabold text-[#0b1220] leading-snug">
                      {exp.position}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-gray-600 truncate">
                      {exp.company}
                    </p>

                    {/* DATES */}
                    <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded-full">
                        {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                      </span>

                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-semibold">
                        {calcDuration(exp.startDate, exp.endDate)}
                      </span>
                      
                            {exp.responsibilities?.length > 3 && (
                      <button
                        className="px-4"
                        onClick={() => setExpandedCard(expanded ? null : i)}>
                        {expanded ? <ChevronUp /> : <ChevronDown />}
                      </button>
                    )}
                    </div>

                    {/* RESPONSIBILITIES */}
                    {exp.responsibilities?.length > 0 && (
                      <div
                        className={`mt-4 text-gray-700 transition-all duration-300 ${
                          expanded
                            ? "max-h-[1200px]"
                            : "max-h-20 overflow-hidden"
                        }`}
                      >
                        <ul className="space-y-2">
                          {(expanded
                            ? exp.responsibilities
                            : exp.responsibilities.slice(0, 3)
                          ).map((r, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <span className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                              <p className="text-sm leading-relaxed">{r}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {exp.technologies?.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-gray-50 border text-xs text-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
