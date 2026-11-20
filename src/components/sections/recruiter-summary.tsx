"use client";

import { motion } from "framer-motion";
import { Download, Link2, Mail } from "lucide-react";
import { profile, recruiterSummary } from "@/data/content";

const dots = ["bg-note-yellow", "bg-note-pink", "bg-note-mint", "bg-note-sky", "bg-note-lilac", "bg-note-orange"];
const notes = ["bg-note-yellow", "bg-note-pink", "bg-note-mint"];
const tilts = [-2, 1.5, -1];

export default function RecruiterSummary() {
  return (
    <section id="summary" data-frame="Recruiter Summary" aria-label="Summary for recruiters" className="relative py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          data-spec="Card · radius 3xl · 2px ink border · hard shadow 8px"
          className="studio-box relative rounded-3xl border-2 border-ink bg-card p-6 shadow-[8px_8px_0_0_var(--text-primary)] sm:p-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="paper -rotate-2 bg-note-sky px-3 py-1 text-sm font-semibold">tl;dr · 30-second summary</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm font-medium">
              <span className="h-2 w-2 animate-pulse-glow rounded-full bg-success" />
              {profile.availability}
            </span>
          </div>

          <h2 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Designer who <span className="marker">ships the code</span> — focused on AI products.
          </h2>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {recruiterSummary.facts.map((f, i) => (
                <div key={f.label} className="flex gap-3">
                  <span className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${dots[i % dots.length]}`} />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-text-secondary">{f.label}</dt>
                    <dd className="mt-1 text-[15px]">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <ul className="flex flex-col gap-4">
              {recruiterSummary.highlights.map((h, i) => (
                <li
                  key={h.label}
                  style={{ rotate: `${tilts[i]}deg` }}
                  className={`paper flex items-center gap-4 px-5 py-4 ${notes[i]}`}
                >
                  <span className="font-display text-3xl font-semibold">{h.value}</span>
                  <span className="text-sm">{h.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-dashed border-border pt-6">
            <a
              href="resume.pdf"
              download="Diya_Chauhan_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-rotate-2"
            >
              <Download className="h-4 w-4" /> Resume (PDF)
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-5 py-2.5 text-sm font-semibold hover:bg-note-yellow"
            >
              <Mail className="h-4 w-4" /> {profile.email}
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-5 py-2.5 text-sm font-semibold hover:bg-note-sky"
            >
              <Link2 className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
