"use client";

import { motion } from "framer-motion";
import { Code2, PenTool, Wrench } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { skillCategories } from "@/data/content";

const icons = [PenTool, Code2, Wrench];

export default function Skills() {
  return (
    <section id="skills" data-frame="Skills" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title={
            <>
              Tools I use to <span className="text-gradient">turn ideas into products</span>
            </>
          }
          description="One person across the whole pipeline — research and design in Figma, then production code in React and Next.js."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((group, gi) => {
            const Icon = icons[gi % icons.length];
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: gi * 0.08 }}
                className="glass flex flex-col gap-5 rounded-2xl p-7"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-primary/15">
                    <Icon className="h-4 w-4 text-accent-secondary" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-secondary">
                    {group.category}
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border bg-white/5 px-4 py-2 text-sm text-text-secondary transition-colors hover:border-accent-secondary/50 hover:text-text-primary"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto border-t border-border pt-4 text-xs text-text-secondary">
                  Used at <span className="text-text-primary">{group.usedAt}</span>
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
