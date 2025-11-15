"use client";

import { useState } from "react";
import {
  Code,
  Layers,
  Cpu,
  Database,
  Cloud,
  Puzzle,
  Terminal,
  Wrench,
  Star,
  Filter,
} from "lucide-react";

export default function SkillsSection({ skills }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("level");

  /* -----------------------------
      CATEGORY ICONS
  -----------------------------*/
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

  /* -----------------------------
      LEVEL SYSTEM
  -----------------------------*/
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

  /* -----------------------------
       GROUP SKILLS
  -----------------------------*/
  const grouped = skills.reduce((acc, s) => {
    const cat = s.category || "Other";
    acc[cat] = acc[cat] || [];
    acc[cat].push(s);
    return acc;
  }, {});

  const categories = ["all", ...Object.keys(grouped)];

  /* -----------------------------
      FILTER + SORT
  -----------------------------*/
  const visibleSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  const sortedSkills = [...visibleSkills].sort((a, b) =>
    sortBy === "level"
      ? levelValue[b.level] - levelValue[a.level]
      : a.name.localeCompare(b.name)
  );

  /* SPLIT INTO TWO ROWS (alternate distribution) */
  const row1 = sortedSkills.filter((_, i) => i % 2 === 0);
  const row2 = sortedSkills.filter((_, i) => i % 2 !== 0);

  return (
    <section className="relative py-20 px-6">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#eef2ff] to-[#fdfcff]" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black tracking-tight text-gray-900">
            Technical Skills
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            A clean two-row sliding layout — optimized for clarity and space.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-14">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
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

          {/* Sort Menu */}
          <div className="flex items-center gap-3 bg-white border shadow-sm px-4 py-2 rounded-xl">
            <Filter className="w-4 h-4 text-black" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent outline-none text-sm  text-black font-medium"
            >
              <option value="level">Sort by Level</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* -----------------------------
              TWO-ROW SLIDER SYSTEM
        ------------------------------ */}
        <div className="space-y-12">

          {/* ROW 1 */}
          <div className="flex gap-6 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-none">
            {row1.map((skill, idx) => {
              const Icon = getCategoryIcon(skill.category);
              return (
                <div
                  key={idx}
                  className="snap-center flex-shrink-0 w-[85%] sm:w-[60%] lg:w-[45%]"
                >
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
          <div className="flex gap-6 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-none">
            {row2.map((skill, idx) => {
              const Icon = getCategoryIcon(skill.category);
              return (
                <div
                  key={idx}
                  className="snap-center flex-shrink-0 w-[85%] sm:w-[60%] lg:w-[45%]"
                >
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
      </div>
    </section>
  );
}

/* ------------------------------------
      REUSABLE SKILL CARD COMPONENT
------------------------------------ */
function SkillCard({ skill, Icon, levelLabel, levelColor, levelBar }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* TOP ROW */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center">
            <Icon className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">{skill.name}</h3>
            <p className="text-xs text-gray-500">{skill.category}</p>
          </div>
        </div>

        <span
          className={`text-xs font-bold uppercase ${levelColor[skill.level]}`}
        >
          {levelLabel[skill.level]}
        </span>
      </div>

      {/* BAR */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full bg-gray-900 ${levelBar[skill.level]}`} />
      </div>
    </div>
  );
}
