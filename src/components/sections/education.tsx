"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { education } from "@/data/content";
import { cn } from "@/lib/utils";

export default function Education() {
  return (
    <section id="education" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Education"
          title={
            <>
              Strong foundations, <span className="text-gradient">still building</span>
            </>
          }
          description="A computer engineering degree, now followed by a postgraduate program in AI software engineering."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {education.map((item, i) => {
            const inProgress = item.status === "In progress";
            return (
              <motion.article
                key={`${item.institution}-${item.degree}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass gradient-border relative flex flex-col gap-6 rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-primary to-purple-glow shadow-[0_0_28px_rgba(108,99,255,0.5)]">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>

                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
                      inProgress
                        ? "bg-success/10 text-success"
                        : "border border-border bg-white/5 text-text-secondary"
                    )}
                  >
                    {inProgress && <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-success" />}
                    {item.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-semibold">{item.institution}</h3>
                  <p className="mt-1 text-sm text-accent-secondary">{item.degree}</p>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border pt-5 text-sm text-text-secondary">
                  <span className="font-nums">{item.period}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.location}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
