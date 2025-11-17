"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Settings, Filter, Code, Cpu, Database, Cloud, Wrench, Layers, Terminal, Puzzle, Star } from "lucide-react";

export default function SkillsSection({ skills }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("level");

  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  const [showArrowsRow1, setShowArrowsRow1] = useState(false);
  const [showArrowsRow2, setShowArrowsRow2] = useState(false);

  const Icons = {
    Frontend: Code,
    Backend: Cpu,
    Database: Database,
    Cloud: Cloud,
    DevOps: Wrench,
    Mobile: Layers,
    Programming: Terminal,
    Design: Puzzle,
    Tools: Wrench,
    Other: Star,
  };

  const getCategoryIcon = (c) => Icons[c] || Star;

  const levelValue = {
    expert: 4,
    advanced: 3,
    intermediate: 2,
    beginner: 1,
  };

  const levelLabel = {
    expert: "Expert",
    advanced: "Advanced",
    intermediate: "Intermediate",
    beginner: "Beginner",
  };

  const levelColor = {
    expert: "text-emerald-500",
    advanced: "text-blue-500",
    intermediate: "text-amber-500",
    beginner: "text-gray-500",
  };

  const levelBar = {
    expert: "w-full",
    advanced: "w-[75%]",
    intermediate: "w-[55%]",
    beginner: "w-[35%]",
  };

  const visibleSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  const sortedSkills = [...visibleSkills].sort((a, b) =>
    sortBy === "level"
      ? levelValue[b.level] - levelValue[a.level]
      : a.name.localeCompare(b.name)
  );

  const row1 = sortedSkills.filter((_, i) => i % 2 === 0);
  const row2 = sortedSkills.filter((_, i) => i % 2 !== 0);

  /* ---------------------------------------------
        DETECT OVERFLOW SCROLL (like certificates)
  ----------------------------------------------*/
  const checkOverflow = () => {
    setShowArrowsRow1(row1Ref.current?.scrollWidth > row1Ref.current?.clientWidth);
    setShowArrowsRow2(row2Ref.current?.scrollWidth > row2Ref.current?.clientWidth);
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
}, [sortedSkills]);

  /* --------------------------------------------- */

  const scrollLeft = (ref) => ref.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = (ref) => ref.current.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <section className="relative py-20 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-[#eef2ff] to-[#fdfcff]" />
      <div className="relative max-w-7xl mx-auto z-10 text-center">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white shadow-sm border rounded-xl">
            <Settings className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold text-gray-700">
              Skills Archive
            </span>
          </div>

          <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Skills
          </h2>
        </div>

        {/* FILTERS */}
        <div className="flex justify-between items-center mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3">
            {["all", ...new Set(skills.map((s) => s.category))].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm border shadow-sm transition ${
                  selectedCategory === cat
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat === "all" ? "All Skills" : cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3 bg-white border shadow-sm px-4 py-2 rounded-xl">
            <Filter className="w-4 h-4 text-black" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent outline-none text-sm text-black font-medium"
            >
              <option value="level">Sort by Level</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* ROW 1 */}
        {showArrowsRow1 && (
          <div className="flex justify-end mb-2 gap-3">
            <button className="p-2 bg-gray-200 rounded-full" onClick={() => scrollLeft(row1Ref)}>
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button className="p-2 bg-gray-200 rounded-full" onClick={() => scrollRight(row1Ref)}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div
          ref={row1Ref}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none"
        >
          {row1.map((skill, i) => {
            const Icon = getCategoryIcon(skill.category);
            return (
              <div key={i} className="snap-center flex-shrink-0">
                <SkillCard
                  skill={skill}
                  Icon={Icon}
                  levelLabel={levelLabel}
                  levelColor={levelColor}
                  levelBar={levelBar}
                />
              </div>
            );
          })}
        </div>

        {/* ROW 2 */}
        {showArrowsRow2 && (
          <div className="flex justify-end mb-2 mt-10 gap-3">
            <button className="p-2 bg-gray-200 rounded-full" onClick={() => scrollLeft(row2Ref)}>
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button className="p-2 bg-gray-200 rounded-full" onClick={() => scrollRight(row2Ref)}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div
          ref={row2Ref}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none"
        >
          {row2.map((skill, i) => {
            const Icon = getCategoryIcon(skill.category);
            return (
              <div key={i} className="snap-center flex-shrink-0">
                <SkillCard
                  skill={skill}
                  Icon={Icon}
                  levelLabel={levelLabel}
                  levelColor={levelColor}
                  levelBar={levelBar}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, Icon, levelLabel, levelColor, levelBar }) {
  return (
    <div
      className="
        bg-white/80 backdrop-blur-sm 
        border border-gray-200 
        rounded-2xl p-5 
        shadow-sm hover:shadow-lg hover:-translate-y-1 
        transition-all duration-300

        w-[260px]      /* Fixed width like certificates */
        h-full
        flex flex-col
      "
    >
      {/* TOP */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </div>

          <div className="max-w-[130px]">
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {skill.name}
            </h3>
            <p className="text-xs text-gray-500 truncate">{skill.category}</p>
          </div>
        </div>

        <span
          className={`text-xs font-bold uppercase truncate ${levelColor[skill.level]}`}
        >
          {levelLabel[skill.level]}
        </span>
      </div>

      {/* PROGRESS BAR */}
      <div className="mt-auto w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full bg-gray-900 ${levelBar[skill.level]}`} />
      </div>
    </div>
  );
}
