"use client";

import { motion } from "framer-motion";
import { Code2, PenTool, Wrench } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { skillCategories } from "@/data/content";

const looks = [
  { Icon: PenTool, bg: "bg-note-yellow", tilt: -2 },
  { Icon: Code2, bg: "bg-note-sky", tilt: 1.5 },
  { Icon: Wrench, bg: "bg-note-orange", tilt: -1 },
];

export default function Skills() {
  return (
    <section id="skills" data-frame="Toolbox" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="toolbox"
          tone="orange"
          title={
            <>
              One person, the <span className="italic text-accent-primary">whole</span> pipeline
            </>
          }
          description="Research and design in Figma, then production code in React and Next.js."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {skillCategories.map((group, gi) => {
            const { Icon, bg, tilt } = looks[gi % looks.length];
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: tilt }}
                whileHover={{ rotate: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 150, damping: 16, delay: gi * 0.08 }}
                className={`paper tape flex flex-col gap-5 p-6 ${bg}`}
              >
                <div className="flex items-center gap-3">
                  <span className="sticker flex h-10 w-10 items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="font-display text-2xl font-semibold">{group.category}</p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li key={skill} className="rounded-md bg-white/60 px-3 py-1.5 text-sm font-medium">
                      {skill}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto border-t border-dashed border-black/25 pt-3 text-xs">
                  used at <span className="font-semibold">{group.usedAt}</span>
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
