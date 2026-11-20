"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Lightbulb, RefreshCw, Scale, Target } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { caseStudy } from "@/data/content";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const outcomeNotes = ["bg-note-yellow", "bg-note-pink", "bg-note-mint", "bg-note-sky"];
const outcomeTilts = [-2, 1.5, -1, 2];
const badge = ["bg-note-orange", "bg-note-lilac", "bg-note-mint"];

function Label({ icon: Icon, children }: { icon: typeof Target; children: React.ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary">
      <Icon className="h-3.5 w-3.5 text-accent-primary" /> {children}
    </p>
  );
}

export default function CaseStudy() {
  const cs = caseStudy;
  return (
    <section id="case-study" data-frame="Case Study — WildMind AI" className="relative bg-bg-secondary/70 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow={`case study · ${cs.company}`} tone="sky" title={cs.title} description={cs.role} />

        <motion.ul {...reveal} transition={{ duration: 0.5 }} className="mt-6 flex flex-wrap gap-2">
          <li className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">{cs.period}</li>
          {cs.tags.map((t) => (
            <li key={t} className="rounded-full border border-ink/30 px-3 py-1 text-xs font-medium">
              {t}
            </li>
          ))}
        </motion.ul>

        {/* Outcomes first */}
        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {cs.outcomes.map((o, i) => (
            <motion.div
              key={o.label}
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: outcomeTilts[i] }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 170, damping: 15, delay: i * 0.06 }}
              className={`paper p-5 ${outcomeNotes[i]}`}
            >
              <p className="font-display text-4xl font-semibold">{o.value}</p>
              <p className="mt-2 text-sm leading-snug text-black/75">{o.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <motion.div {...reveal} transition={{ duration: 0.6 }} className="studio-box rounded-2xl border border-border bg-card p-7">
            <Label icon={Target}>Context &amp; problem</Label>
            <p className="text-[15px] leading-relaxed text-text-secondary">{cs.context}</p>
            <p className="mt-3 text-[15px] leading-relaxed">{cs.problem}</p>
          </motion.div>
          <motion.div {...reveal} transition={{ duration: 0.6, delay: 0.08 }} className="studio-box rounded-2xl border border-border bg-card p-7">
            <Label icon={AlertTriangle}>Constraints</Label>
            <ul className="flex flex-col gap-3">
              {cs.constraints.map((c) => (
                <li key={c} className="flex gap-3 text-[15px] leading-relaxed text-text-secondary">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div {...reveal} transition={{ duration: 0.6 }} className="mt-12">
          <Label icon={Lightbulb}>Key decisions &amp; trade-offs</Label>
          <ol className="flex flex-col gap-5">
            {cs.decisions.map((d, i) => (
              <li
                key={d.title}
                data-spec="Decision row · grid auto / 1fr · gap 20 · padding 24"
                className="studio-box grid gap-5 rounded-2xl border border-border bg-card p-6 sm:grid-cols-[auto_1fr]"
              >
                <span
                  className={`paper flex h-12 w-12 -rotate-3 items-center justify-center font-display text-xl font-semibold ${badge[i % badge.length]}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold leading-tight">{d.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{d.detail}</p>
                  <p className="mt-4 flex items-start gap-2 rounded-lg bg-note-yellow/50 px-3 py-2 text-sm leading-relaxed">
                    <Scale className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      <span className="font-semibold">Trade-off: </span>
                      {d.tradeOff}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 150, damping: 16 }}
          className="paper mt-12 flex flex-col gap-5 bg-note-lilac p-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              <RefreshCw className="h-3.5 w-3.5" /> What I&apos;d do differently
            </p>
            <p className="font-display text-xl leading-snug">{cs.reflection}</p>
          </div>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white sm:self-center"
          >
            Ask me about it <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
