"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { skillCategories } from "@/data/content";

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);
  const [flipMap, setFlipMap] = useState<Record<string, boolean>>({});

  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title={
            <>
              Tools I use to <span className="text-gradient">turn ideas into products</span>
            </>
          }
          description="Hover any skill to see experience, project count, and how often I reach for it."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: gi * 0.08 }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent-secondary">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => {
                  const key = `${group.category}-${skill.name}`;
                  const isActive = active === key;
                  return (
                    <div key={key} className="relative">
                      <motion.button
                        type="button"
                        onMouseEnter={(e) => {
                          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                          setFlipMap((m) => ({ ...m, [key]: rect.top < 220 }));
                          setActive(key);
                        }}
                        onMouseLeave={() => setActive(null)}
                        onFocus={(e) => {
                          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                          setFlipMap((m) => ({ ...m, [key]: rect.top < 220 }));
                          setActive(key);
                        }}
                        onBlur={() => setActive(null)}
                        whileHover={{ scale: 1.06, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        className={`glass rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "border-accent-secondary/60 text-text-primary"
                            : active !== null
                            ? "opacity-40 text-text-secondary"
                            : "text-text-secondary hover:text-text-primary"
                        }`}
                      >
                        {skill.name}
                      </motion.button>

                      <AnimatePresence>
                        {isActive && (() => {
                          const flip = flipMap[key];
                          return (
                            <motion.div
                              initial={{ opacity: 0, y: flip ? -8 : 8, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: flip ? -8 : 8, scale: 0.95 }}
                              transition={{ duration: 0.18 }}
                              className={`glass-strong absolute left-1/2 z-20 w-52 -translate-x-1/2 rounded-xl p-4 text-left shadow-[0_16px_40px_rgba(0,0,0,0.5)] ${flip ? "top-full mt-3" : "bottom-full mb-3"}`}
                            >
                              <div className="flex flex-col gap-2 text-xs">
                                <div className="flex items-center justify-between">
                                  <span className="text-text-secondary">Experience</span>
                                  <span className="font-medium text-text-primary">{skill.experience}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-text-secondary">Projects</span>
                                  <span className="font-medium text-text-primary">{skill.projects}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-text-secondary">Usage</span>
                                  <span className="font-medium text-accent-secondary">{skill.usage}</span>
                                </div>
                              </div>
                              {/* Arrow pointing toward the button */}
                              {flip ? (
                                <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1.5 rotate-45 border-l border-t border-white/10 bg-[#0b1220]" />
                              ) : (
                                <div className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1.5 rotate-45 border-b border-r border-white/10 bg-[#0b1220]" />
                              )}
                            </motion.div>
                          );
                        })()}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
