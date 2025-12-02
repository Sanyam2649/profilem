"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ExperienceCard, HeaderTag } from "./Cards";

export default function ExperienceSection({ experiences = [] }) {
  const scrollRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
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
    <section className="relative px-4">
      <div className="mx-auto">
        <HeaderTag title="Experience" subtitle="Professional Journey" icon={<span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />} />

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

        <div
          ref={scrollRef}
          className="
            flex gap-6 overflow-x-auto
            snap-x snap-mandatory scrollbar-none pb-4 justify-center
          "
        >
          {experiences.map((exp, i) => {
            return (
              <ExperienceCard
                key={i}
                experience={exp}
                index={i}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
