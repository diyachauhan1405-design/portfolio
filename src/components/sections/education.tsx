"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { certifications, education } from "@/data/content";

const certColors = ["bg-note-pink", "bg-note-mint", "bg-note-lilac"];

export default function Education() {
  return (
    <section id="education" data-frame="Education" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="education"
          tone="lilac"
          title={
            <>
              Strong foundations, <span className="squiggle">still learning</span>
            </>
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {education.map((item, i) => {
            const inProgress = item.status === "In progress";
            return (
              <motion.article
                key={item.institution}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="studio-box flex flex-col gap-5 rounded-2xl border-2 border-ink bg-card p-7 shadow-[6px_6px_0_0_var(--text-primary)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className={`sticker flex h-12 w-12 items-center justify-center ${i ? "" : ""}`}>
                    <GraduationCap className="h-6 w-6 text-accent-secondary" />
                  </span>
                  <span
                    className={`paper rotate-2 px-3 py-1 text-xs font-semibold ${inProgress ? "bg-note-mint" : "bg-note-yellow"}`}
                  >
                    {item.status}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold leading-tight">{item.institution}</h3>
                  <p className="mt-1 font-medium text-accent-primary">{item.degree}</p>
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-border pt-4 text-sm text-text-secondary">
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

        <p className="mt-14 mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary">
          <Award className="h-4 w-4 text-accent-primary" /> Certifications
        </p>
        <ul className="grid gap-5 sm:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.li
              key={cert.name}
              initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: i % 2 ? 2 : -2 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 180, damping: 14, delay: i * 0.06 }}
              className={`paper flex flex-col gap-1 p-5 ${certColors[i % certColors.length]}`}
            >
              <span className="font-display text-lg font-semibold">{cert.name}</span>
              <span className="text-sm text-black/70">{cert.issuer}</span>
              <span className="font-nums mt-2 text-xs font-semibold">{cert.date}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
