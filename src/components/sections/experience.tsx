"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { experience } from "@/data/content";

const notes = ["bg-note-pink", "bg-note-sky", "bg-note-mint"];
const dots = ["bg-accent-primary", "bg-accent-secondary", "bg-success"];

export default function Experience() {
  return (
    <section id="experience" data-frame="Journey" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="my journey"
          tone="mint"
          title={
            <>
              Where I&apos;ve been <span className="marker-pink">designing</span> &amp;{" "}
              <span className="marker-mint">building</span>
            </>
          }
        />

        <ol className="relative mt-16 border-l-2 border-dashed border-ink/25 pl-8 sm:pl-12">
          {experience.map((job, i) => (
            <motion.li
              key={`${job.company}-${job.role}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="relative mb-14 last:mb-0"
            >
              <span
                className={`absolute -left-[41px] top-2 h-4 w-4 rounded-full border-[3px] border-bg sm:-left-[57px] ${dots[i % dots.length]}`}
              />
              <p className="font-nums text-sm font-semibold text-text-secondary">{job.period}</p>
              <h3 className="mt-1 font-display text-3xl font-semibold leading-tight">{job.role}</h3>
              <p className="text-base font-medium text-accent-primary">@ {job.company}</p>

              {job.impact && job.impact.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-3">
                  {job.impact.map((m, k) => (
                    <li
                      key={m.label}
                      style={{ rotate: `${k % 2 ? 1.5 : -1.5}deg` }}
                      className={`paper px-3.5 py-2 ${notes[(i + k) % notes.length]}`}
                    >
                      <span className="font-display text-lg font-semibold">{m.value}</span>
                      <span className="ml-2 text-sm">{m.label}</span>
                    </li>
                  ))}
                </ul>
              )}

              <ul className="mt-5 flex flex-col gap-2">
                {[...job.achievements, ...job.responsibilities].slice(0, 4).map((r) => (
                  <li key={r} className="flex gap-3 text-[15px] leading-relaxed text-text-secondary">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" />
                    {r}
                  </li>
                ))}
              </ul>

              <ul className="mt-4 flex flex-wrap gap-2">
                {job.tech.map((t) => (
                  <li key={t} className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium">
                    {t}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
