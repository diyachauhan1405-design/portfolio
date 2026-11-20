"use client";

import { motion } from "framer-motion";
import { Download, Link2, Mail, Zap } from "lucide-react";
import { profile, recruiterSummary } from "@/data/content";

export default function RecruiterSummary() {
  return (
    <section id="summary" aria-label="Summary for recruiters" className="relative py-16">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass-strong gradient-border relative overflow-hidden rounded-3xl p-7 sm:p-10"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-primary/20 blur-3xl" />

          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent-secondary">
              <Zap className="h-3.5 w-3.5" /> 30-second summary
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-success" />
              {profile.availability}
            </span>
          </div>

          <h2 className="relative mt-5 font-heading text-2xl font-semibold sm:text-3xl">
            {recruiterSummary.headline}
          </h2>

          <div className="relative mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {recruiterSummary.facts.map((f) => (
                <div key={f.label} className="border-l-2 border-accent-primary/40 pl-4">
                  <dt className="text-xs uppercase tracking-widest text-text-secondary">{f.label}</dt>
                  <dd className="mt-1 text-sm text-text-primary">{f.value}</dd>
                </div>
              ))}
            </dl>

            <ul className="flex flex-col gap-3">
              {recruiterSummary.highlights.map((h) => (
                <li
                  key={h.label}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-white/[0.03] px-5 py-4"
                >
                  <span className="font-nums font-heading text-2xl font-bold text-gradient-accent">
                    {h.value}
                  </span>
                  <span className="text-sm text-text-secondary">{h.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
            <a
              href="resume.pdf"
              download="Diya_Chauhan_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-primary to-purple-glow px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              <Download className="h-4 w-4" /> Resume (PDF)
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-text-primary transition-colors hover:border-accent-secondary/50"
            >
              <Mail className="h-4 w-4" /> {profile.email}
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-text-primary transition-colors hover:border-accent-secondary/50"
            >
              <Link2 className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
