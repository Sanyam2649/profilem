"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Rocket,
  Target,
  Zap,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const ICONS = [Rocket, Target, Zap, TrendingUp];

export default function ExperienceSection({ experiences = [] }) {
  const [expandedCard, setExpandedCard] = useState(null);

  const IconFor = (i) => ICONS[i % ICONS.length];

  const formatDate = (d) => {
    if (!d) return "Present";
    const dt = new Date(d);
    return dt.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const calcDuration = (start, end) => {
    const s = new Date(start);
    const e = end ? new Date(end) : new Date();

    const months =
      (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());

    const years = Math.floor(months / 12);
    const rem = months % 12;

    if (years === 0) return `${rem} mos`;
    if (rem === 0) return `${years} yrs`;
    return `${years} yrs ${rem} mos`;
  };

  const totalYears = () => {
    const months = experiences.reduce((sum, exp) => {
      const s = new Date(exp.startDate);
      const e = exp.endDate ? new Date(exp.endDate) : new Date();

      return (
        sum + (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth())
      );
    }, 0);

    return Math.floor(months / 12);
  };

  const uniqueTechCount = () =>
    new Set(experiences.flatMap((e) => e.technologies || [])).size;

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-50 text-sm text-gray-700 border border-gray-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Professional Journey
            </div>

            <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#0b1220]">
              Work Experience
            </h2>

            <p className="mt-2 text-gray-600 max-w-xl">
              Calm force. Heavy impact. A timeline of mastery.
            </p>
          </div>
        </div>

        {/* ------------------------
            HORIZONTAL EXPERIENCE CARDS
         ------------------------ */}
        <div
          className="
            flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory
            pb-4
          "
        >
          {experiences.map((exp, i) => {
            const Icon = IconFor(i);
            const expanded = expandedCard === i;

            return (
              <div
                key={i}
                className="
                  snap-center flex-shrink-0
                  w-[90%] sm:w-[70%] lg:w-[50%]
                "
              >
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden relative">
                  <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
                    {/* Left Icon */}
                    <div className="px-6 py-6 flex md:flex-col items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Right Content */}
                    <div className="p-6 md:p-8">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-extrabold text-[#0b1220]">
                            {exp.position}
                          </h3>

                          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600">
                            <span className="font-semibold text-gray-800">
                              {exp.company}
                            </span>

                            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                              {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                            </span>

                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                              {calcDuration(exp.startDate, exp.endDate)}
                            </span>
                          </div>
                        </div>

                        {/* Expand Button */}
                        <div className="flex items-center gap-3">
                          {exp.responsibilities?.length > 3 && (
                            <button
                              onClick={() =>
                                setExpandedCard(expanded ? null : i)
                              }
                              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-full bg-gray-50 hover:bg-gray-100 border"
                            >
                              {expanded ? <ChevronUp /> : <ChevronDown />}
                              {expanded ? "Collapse" : "Details"}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Responsibilities */}
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <div
                          className={`mt-5 text-gray-700 transition-all ${
                            expanded ? "max-h-[2000px]" : "max-h-28 overflow-hidden"
                          }`}
                        >
                          <ul className="space-y-3">
                            {(expanded
                              ? exp.responsibilities
                              : exp.responsibilities.slice(0, 3)
                            ).map((r, idx) => (
                              <li key={idx} className="flex gap-3 items-start">
                                <span className="w-2.5 h-2.5 mt-2 rounded-full bg-blue-500" />
                                <p className="text-sm leading-relaxed">{r}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tech Stack */}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
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
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

