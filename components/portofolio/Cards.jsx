import { useState } from "react";
const { ChevronUp, ChevronDown, BookOpen, GraduationCap, Calendar } = require("lucide-react");


export  function EducationCard ({education , index}) {
  const [expanded, setExpanded] = useState(null);
  const toggle = (i) => setExpanded(expanded === i ? null : i);
  const isOpen = expanded === index;
   return (
              <div
                key={index}
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
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#84664b] to-[#5c3f2d] text-white flex items-center justify-center shadow-inner">
                    <GraduationCap className="w-7 h-7" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-2xl font-serif font-bold text-[#2f1e14] truncate">
                      {education.institution}
                    </h3>

                    <div className="flex items-center gap-2 text-[#6e5a46] text-sm mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(education.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                        {" — "}
                        {education.endDate
                          ? new Date(education.endDate).toLocaleDateString("en-US", {
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
                    {education.degree}
                  </h4>

                  <div className="flex items-center gap-2 text-[#6e5a46] mt-1 text-sm">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-medium">{education.fieldOfStudy}</span>
                  </div>
                </div>

                {/* DESCRIPTION */}
                {education.description && (
                  <div className="mt-6 border-t border-[#e0d8ce] pt-4">
                    <p
                      className={`text-[#5a4a38] leading-relaxed transition-all duration-500 ${
                        isOpen ? "line-clamp-none" : "line-clamp-3"
                      }`}
                    >
                      {education?.description}
                    </p>

                    {education?.description.length > 120 && (
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
}


export function HeaderTag({icon , title , subtitle}){
  return (
     <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white border border-gray-300 shadow-sm">
            {icon}
            <span className="text-sm font-semibold text-[#5a3d2b] tracking-wide">
              {subtitle}
            </span>
          </div>

          <h2 className="mt-5 text-5xl md:text-6xl font-serif font-bold tracking-tight text-[#2f1e14]">
            {title}
          </h2>
        </div>
  )
}

export function ExperienceCard ({experience , index})
{
  const [expandedCard, setExpandedCard] = useState(null);
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
   const expanded = expandedCard === index;
    return (
              <div
                key={index}
                className="
                  snap-center shrink-0
                  w-[300px] 
                "
              >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6">

                    {/* TITLE */}
                    <h3 className="text-lg font-extrabold text-[#0b1220] leading-snug">
                      {experience.position}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-gray-600 truncate">
                      {experience.company}
                    </p>

                    {/* DATES */}
                    <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded-full">
                        {formatDate(experience.startDate)} – {formatDate(experience.endDate)}
                      </span>

                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-semibold">
                        {calcDuration(experience.startDate, experience.endDate)}
                      </span>
                      
                            {experience.responsibilities?.length > 3 && (
                      <button
                        className="px-4"
                        onClick={() => setExpandedCard(expanded ? null : index)}>
                        {expanded ? <ChevronUp /> : <ChevronDown />}
                      </button>
                    )}
                    </div>

                    {/* RESPONSIBILITIES */}
                    {experience.responsibilities?.length > 0 && (
                      <div
                        className={`mt-4 text-gray-700 transition-all duration-300 ${
                          expanded
                            ? "max-h-[1200px]"
                            : "max-h-20 overflow-hidden"
                        }`}
                      >
                        <ul className="space-y-2">
                          {(expanded
                            ? experience.responsibilities
                            : experience.responsibilities.slice(0, 3)
                          ).map((r, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <span className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                              <p className="text-sm leading-relaxed">{r}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {experience.technologies?.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
                        {experience.technologies.map((tech, idx) => (
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
}