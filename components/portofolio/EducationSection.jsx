"use client";
import { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Library,
  Feather,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function EducationSection({ education = [] }) {
  const [expanded, setExpanded] = useState(null);
  const toggle = (i) => setExpanded(expanded === i ? null : i);

  return (
    <section className="relative w-full py-20 overflow-hidden">

      {/* --- OHARA BACKGROUND (subtle parchment) --- */}
      <div className="absolute inset-0 bg-[#faf7f2]" />
      <div className="absolute inset-0 opacity-[0.15] bg-[url('/textures/paper-fiber.png')] mix-blend-multiply" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white border border-gray-300 shadow-sm">
            <Feather className="w-5 h-5 text-[#5a3d2b]" />
            <span className="text-sm font-semibold text-[#5a3d2b] tracking-wide">
              Ohara Knowledge Archive
            </span>
          </div>

          <h2 className="mt-5 text-5xl md:text-6xl font-serif font-bold tracking-tight text-[#2f1e14]">
            Education
          </h2>

          <p className="text-lg md:text-xl text-[#6e5a46] mt-4 max-w-2xl mx-auto leading-relaxed font-light">
            A chronicle of scholarly growth, discipline, and intellectual refinement.
          </p>
        </div>

        {/* --- HORIZONTAL SCROLL CARDS --- */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
          {education.map((edu, i) => {
            const isOpen = expanded === i;
            return (
              <div
                key={i}
                className="snap-center flex-[0_0_88%] sm:flex-[0_0_48%] lg:flex-[0_0_38%]
                bg-white rounded-3xl p-8 border border-[#ded7cc]
                shadow-[0_8px_20px_rgba(0,0,0,0.08)]
                hover:shadow-[0_12px_26px_rgba(0,0,0,0.12)]
                transition-all duration-500 relative group"
              >
                {/* Ink Outline Hover */}
                <div className="absolute inset-0 rounded-3xl border border-[#9b886c]/30 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />

                {/* HEADER */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#84664b] to-[#5c3f2d] text-white flex items-center justify-center shadow-inner">
                    <GraduationCap className="w-7 h-7" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-2xl font-serif font-bold text-[#2f1e14] truncate">
                      {edu.institution}
                    </h3>

                    <div className="flex items-center gap-2 text-[#6e5a46] text-sm mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(edu.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                        {" — "}
                        {edu.endDate
                          ? new Date(edu.endDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                            })
                          : "Present"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* DEGREE */}
                <div className="mt-6">
                  <h4 className="text-xl font-serif font-bold text-[#3b2a1d]">
                    {edu.degree}
                  </h4>

                  <div className="flex items-center gap-2 text-[#6e5a46] mt-1 text-sm">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-medium">{edu.fieldOfStudy}</span>
                  </div>
                </div>

                {/* DESCRIPTION */}
                {edu.description && (
                  <div className="mt-6 border-t border-[#e0d8ce] pt-4">
                    <p
                      className={`text-[#5a4a38] leading-relaxed transition-all duration-500 ${
                        isOpen ? "line-clamp-none" : "line-clamp-3"
                      }`}
                    >
                      {edu.description}
                    </p>

                    {edu.description.length > 120 && (
                      <button
                        onClick={() => toggle(i)}
                        className="flex items-center gap-2 text-[#6d4f31] hover:text-[#5a3d2b] font-semibold mt-3 text-sm"
                      >
                        {isOpen ? (
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
