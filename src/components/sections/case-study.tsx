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

function Label({ icon: Icon, children }: { icon: typeof Target; children: React.ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent-secondary">
      <Icon className="h-3.5 w-3.5" /> {children}
    </p>
  );
}

export default function CaseStudy() {
  const cs = caseStudy;
  return (
    <section id="case-study" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow={`Case Study · ${cs.company}`}
          title={<span className="text-gradient">{cs.title}</span>}
          description={cs.role}
        />

        <motion.ul {...reveal} transition={{ duration: 0.5 }} className="mt-8 flex flex-wrap justify-center gap-2">
          <li className="font-nums rounded-full border border-accent-primary/30 bg-accent-primary/10 px-3 py-1 text-xs text-text-primary">
            {cs.period}
          </li>
          {cs.tags.map((t) => (
            <li key={t} className="rounded-full border border-border bg-white/5 px-3 py-1 text-xs text-text-secondary">
              {t}
            </li>
          ))}
        </motion.ul>

        {/* Outcomes first: recruiters scan for impact */}
        <motion.div {...reveal} transition={{ duration: 0.6 }} className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {cs.outcomes.map((o) => (
            <div key={o.label} className="glass rounded-2xl p-5 text-center">
              <p className="font-nums font-heading text-3xl font-bold text-gradient-accent">{o.value}</p>
              <p className="mt-2 text-xs leading-relaxed text-text-secondary">{o.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <motion.div {...reveal} transition={{ duration: 0.6 }} className="glass rounded-2xl p-7">
            <Label icon={Target}>Context &amp; problem</Label>
            <p className="text-sm leading-relaxed text-text-secondary">{cs.context}</p>
            <p className="mt-3 text-sm leading-relaxed text-text-primary">{cs.problem}</p>
          </motion.div>
          <motion.div {...reveal} transition={{ duration: 0.6, delay: 0.08 }} className="glass rounded-2xl p-7">
            <Label icon={AlertTriangle}>Constraints</Label>
            <ul className="flex flex-col gap-2.5">
              {cs.constraints.map((c) => (
                <li key={c} className="text-sm leading-relaxed text-text-secondary">
                  <span className="mr-2 text-accent-primary">—</span>
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div {...reveal} transition={{ duration: 0.6 }} className="mt-10">
          <Label icon={Lightbulb}>Key decisions &amp; trade-offs</Label>
          <ol className="flex flex-col gap-4">
            {cs.decisions.map((d, i) => (
              <li key={d.title} className="glass grid gap-4 rounded-2xl p-6 sm:grid-cols-[auto_1fr]">
                <span className="font-nums flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary to-purple-glow font-heading text-sm font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{d.detail}</p>
                  <p className="mt-3 flex items-start gap-2 rounded-xl bg-white/[0.03] px-3 py-2 text-xs leading-relaxed text-text-secondary">
                    <Scale className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-secondary" />
                    <span>
                      <span className="font-semibold text-text-primary">Trade-off: </span>
                      {d.tradeOff}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-col gap-4 rounded-2xl border border-accent-primary/25 bg-accent-primary/10 p-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <Label icon={RefreshCw}>What I&apos;d do differently</Label>
            <p className="text-sm leading-relaxed text-text-primary">{cs.reflection}</p>
          </div>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-gradient-to-r from-accent-primary to-purple-glow px-5 py-2.5 text-sm font-semibold text-white sm:self-center"
          >
            Talk about this project <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
