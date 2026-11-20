"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Code2 } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { projects } from "@/data/content";
import Link from "next/link";
import { cn } from "@/lib/utils";

const noteBg: Record<string, string> = {
  sky: "bg-note-sky",
  pink: "bg-note-pink",
  mint: "bg-note-mint",
  yellow: "bg-note-yellow",
  lilac: "bg-note-lilac",
  orange: "bg-note-orange",
};
const tilts = [-2.5, 1.5, -1.5, 2];

export default function Projects() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <section id="work" data-frame="Featured Work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="selected work"
          tone="pink"
          title={
            <>
              Things I&apos;ve <span className="italic text-accent-primary">designed</span> &amp;{" "}
              <span className="squiggle">shipped</span>, 2023–2026
            </>
          }
          description="Real products, live on the web — from first wireframe to production code."
        />
        <Link
          href="/designs"
          className="paper mt-8 inline-flex -rotate-1 items-center gap-3 border-2 border-ink bg-card px-5 py-3 font-semibold transition-transform hover:rotate-0"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0d99ff] text-xs font-bold text-white">#</span>
          Open my Figma files — browse them like you&apos;re in the editor
          <ArrowUpRight className="h-4 w-4" />
        </Link>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => {
            const hasLive = p.liveUrl && p.liveUrl !== "#";
            const hasCode = p.github && p.github !== "#";
            return (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: tilts[i % tilts.length] }}
                whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 150, damping: 16, delay: i * 0.06 }}
                data-spec="Project card · tape · paper shadow · hover straightens"
                className={cn("paper tape flex flex-col p-3 pb-5", noteBg[p.note] ?? "bg-note-yellow")}
              >
                <a
                  href={hasLive ? p.liveUrl : "#case-study"}
                  target={hasLive ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={`Open ${p.name}`}
                  className="block overflow-hidden rounded-[3px] bg-card"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${base}${p.image}`}
                    alt=""
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </a>
                <div className="flex flex-1 flex-col px-2 pt-4">
                  <p className="text-xs font-medium text-black/60">
                    {p.timeline} · {p.category}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold leading-tight">{p.name}</h3>
                  <p className="mt-1 text-sm text-black/75">{p.tagline}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <li key={t} className="rounded bg-white/55 px-2 py-0.5 text-[11px] font-medium">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-between border-t border-dashed border-black/25 pt-3 text-sm font-semibold">
                    {hasLive ? (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                        visit <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <a href="#case-study" className="inline-flex items-center gap-1 hover:underline">
                        case study <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                    {hasCode && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} source code`}>
                        <Code2 className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}

          {/* Case study teaser card */}
          <motion.a
            href="#case-study"
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 150, damping: 16, delay: 0.2 }}
            className="paper tape flex flex-col justify-between bg-note-yellow p-6 lined"
          >
            <div>
              <p className="text-xs font-medium text-black/60">deep dive</p>
              <p className="mt-3 font-display text-3xl font-semibold leading-tight">
                How I made a generative AI platform feel simple
              </p>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 font-semibold">
              Read the case study <ArrowRight className="h-4 w-4" />
            </p>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
