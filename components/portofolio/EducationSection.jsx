import {
  Feather,
} from "lucide-react";
import { EducationCard, HeaderTag} from "./Cards";

export default function EducationSection({ education = [] }) {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#faf7f2]" />
      <div className="absolute inset-0 opacity-[0.15] bg-[url('/textures/paper-fiber.png')] mix-blend-multiply" />

      <div className="relative z-10 mx-auto px-6">
        <HeaderTag icon={<Feather className="w-5 h-5 text-[#5a3d2b]" />} title="Education" subtitle="Knowledge Archive"/>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none justify-center">
          {education.map((edu, i) => {
            return (
              <EducationCard
                key={i}
                education={edu}
                index={i}
              />
            );
          })}

        </div>
      </div>
    </section>
  );
}
