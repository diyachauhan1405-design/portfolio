"use client";

import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Code2, Coffee, PenTool, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const QUERY = "(min-width: 1024px)";
function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(QUERY);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}

type NoteProps = {
  id: string;
  index: number;
  rotate: number;
  className: string;
  children: ReactNode;
  spec?: string;
  drag: boolean;
  bounds: React.RefObject<HTMLDivElement | null>;
  z: number;
  onFront: (id: string) => void;
  label: string;
};

function Note({ id, index, rotate, className, children, spec, drag, bounds, z, onFront, label }: NoteProps) {
  return (
    <motion.div
      role="group"
      aria-label={label}
      data-spec={spec}
      drag={drag}
      dragConstraints={bounds}
      dragElastic={0.12}
      dragMomentum={false}
      onPointerDown={() => onFront(id)}
      initial={{ y: 28, rotate: 0, scale: 0.96 }}
      animate={{ y: 0, rotate, scale: 1 }}
      whileHover={drag ? { scale: 1.02 } : undefined}
      whileDrag={{ scale: 1.05, rotate: 0, cursor: "grabbing" }}
      transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.05 + index * 0.07 }}
      style={{ zIndex: z }}
      className={cn("lg:absolute", drag && "cursor-grab touch-none", className)}
    >
      {children}
    </motion.div>
  );
}

const STICKERS = [
  { Icon: PenTool, color: "text-accent-primary", pos: "left-[3%] top-[30px]", rot: -12 },
  { Icon: Code2, color: "text-accent-secondary", pos: "left-[93%] top-[250px]", rot: 10 },
  { Icon: Sparkles, color: "text-[#e0369a]", pos: "left-[54%] top-[300px]", rot: 6 },
  { Icon: Coffee, color: "text-[#9a5b2e]", pos: "left-[28%] top-[560px]", rot: -8 },
  { Icon: Star, color: "text-[#e2a400]", pos: "left-[88%] top-[560px]", rot: 14 },
];

export default function Hero() {
  const desk = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const [order, setOrder] = useState(["status", "impact", "skills", "code", "now", "hello"]);
  const z = (id: string) => order.indexOf(id) + 10;
  const front = (id: string) => setOrder((o) => [...o.filter((x) => x !== id), id]);
  const common = { drag: isDesktop, bounds: desk, onFront: front };

  return (
    <section id="top" data-frame="Hero — the desk" className="relative overflow-hidden pt-28 pb-16 lg:pb-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={desk}
          className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:block lg:h-[640px]"
        >
          {/* Stickers (desktop only) */}
          {STICKERS.map(({ Icon, color, pos, rot }, i) => (
            <motion.div
              key={i}
              aria-hidden
              drag={isDesktop}
              dragConstraints={desk}
              dragMomentum={false}
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: rot }}
              transition={{ type: "spring", stiffness: 220, damping: 12, delay: 0.5 + i * 0.08 }}
              className={cn(
                "sticker absolute z-[5] hidden h-14 w-14 cursor-grab items-center justify-center lg:flex",
                pos
              )}
            >
              <Icon className={cn("h-6 w-6", color)} strokeWidth={2.2} />
            </motion.div>
          ))}

          {/* Hello — yellow */}
          <Note
            {...common}
            id="hello"
            index={0}
            rotate={-3}
            z={z("hello")}
            label="Introduction"
            spec="Note · Fraunces 44/46 · #FFD54A · rotate −3°"
            className="paper bg-note-yellow p-7 sm:col-span-2 lg:left-[27%] lg:top-[20px] lg:w-[400px]"
          >
            <p className="text-sm font-medium">hi, i&apos;m diya —</p>
            <h1 className="mt-4 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-[2.75rem]">
              I design interfaces.
              <br />
              Then I <span className="italic text-accent-primary">build</span> them in code.
            </h1>
            <div className="mt-6 flex items-end justify-between gap-4">
              <p className="text-sm font-medium">AI products · Web · Design systems</p>
              <svg viewBox="0 0 64 40" className="h-10 w-16 shrink-0" aria-hidden>
                <path d="M4 32 L20 8 L26 14 L10 36 Z" fill="#fff" stroke="#1d1b19" strokeWidth="2" strokeLinejoin="round" />
                <path d="M30 20 Q 38 20 40 20" stroke="#1d1b19" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4" />
                <path d="M46 12 L40 20 L46 28 M54 12 L60 20 L54 28" fill="none" stroke="#1d1b19" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Note>

          {/* Now & before — lilac */}
          <Note
            {...common}
            id="now"
            index={1}
            rotate={4}
            z={z("now")}
            label="Experience and education"
            className="paper bg-note-lilac p-6 lg:left-[2%] lg:top-[150px] lg:w-[270px]"
          >
            <p className="text-sm font-medium">now &amp; before</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <span className="font-semibold">UI/UX + Frontend</span>
                <br />
                <span className="text-black/60">@ WildMind AI</span>
              </li>
              <li>
                <span className="font-semibold">UI/UX Intern</span>
                <br />
                <span className="text-black/60">@ Vnnovate Solutions</span>
              </li>
              <li>
                <span className="font-semibold">PG, AI Software Eng.</span>
                <br />
                <span className="text-black/60">@ IIT Kharagpur · from Oct 2026</span>
              </li>
              <li>
                <span className="font-semibold">B.E. Computer Eng.</span>
                <br />
                <span className="text-black/60">@ Ganpat University</span>
              </li>
            </ul>
            <div className="mt-5 flex gap-4 text-sm font-semibold">
              <a href="#summary" className="underline underline-offset-4">
                tl;dr →
              </a>
              <a href="resume.pdf" download="Diya_Chauhan_Resume.pdf" className="underline underline-offset-4">
                Resume ↗
              </a>
            </div>
          </Note>

          {/* Code — dark */}
          <Note
            {...common}
            id="code"
            index={2}
            rotate={3}
            z={z("code")}
            label="Diya as code"
            spec="Code card · JetBrains-style syntax · the 'build' half"
            className="paper overflow-hidden bg-ink text-[13px] text-white sm:col-span-2 lg:left-[64%] lg:top-[10px] lg:w-[330px]"
          >
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-[11px] text-white/50">diya.ts</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono leading-relaxed">
              <span className="text-note-pink">const</span> <span className="text-note-sky">diya</span> = {"{"}
              {"\n  "}role: <span className="text-note-yellow">&quot;designer + developer&quot;</span>,
              {"\n  "}designsIn: <span className="text-note-yellow">&quot;Figma&quot;</span>,
              {"\n  "}shipsIn: [<span className="text-note-yellow">&quot;React&quot;</span>, <span className="text-note-yellow">&quot;Next.js&quot;</span>],
              {"\n  "}focus: <span className="text-note-yellow">&quot;AI products&quot;</span>,
              {"\n  "}joins: <span className="text-note-mint">&quot;immediately&quot;</span>,
              {"\n"}
              {"}"};<span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-note-yellow" />
            </pre>
          </Note>

          {/* Strengths — mint */}
          <Note
            {...common}
            id="skills"
            index={3}
            rotate={-4}
            z={z("skills")}
            label="Core strengths"
            className="paper bg-note-mint p-6 lg:left-[66%] lg:top-[300px] lg:w-[290px]"
          >
            <p className="text-sm font-medium">things i&apos;m good at:</p>
            <ul className="mt-4 flex flex-wrap gap-2 text-sm">
              {["Figma → React handoff", "Design systems", "AI product UX", "Responsive & accessible UI", "User research"].map(
                (s) => (
                  <li key={s} className="rounded-md bg-white/60 px-2.5 py-1 font-medium">
                    {s}
                  </li>
                )
              )}
            </ul>
          </Note>

          {/* Impact — pink */}
          <Note
            {...common}
            id="impact"
            index={4}
            rotate={2}
            z={z("impact")}
            label="Impact"
            className="paper bg-note-pink p-6 lg:left-[33%] lg:top-[360px] lg:w-[300px]"
          >
            <p className="text-sm font-medium">impact, so far</p>
            <dl className="mt-3 grid grid-cols-3 gap-3">
              {[
                ["~30%", "better UX"],
                ["~40%", "component reuse"],
                ["~25%", "fewer iterations"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl font-semibold">{v}</dt>
                  <dd className="text-xs leading-snug text-black/70">{l}</dd>
                </div>
              ))}
            </dl>
          </Note>

          {/* Status — orange */}
          <Note
            {...common}
            id="status"
            index={5}
            rotate={-6}
            z={z("status")}
            label="Availability"
            className="paper bg-note-orange p-5 lg:left-[6%] lg:top-[490px] lg:w-[230px]"
          >
            <p className="flex items-center gap-2 text-sm font-semibold">
              <span className="h-2.5 w-2.5 animate-pulse-glow rounded-full bg-success" />
              open to work
            </p>
            <p className="mt-2 font-display text-xl font-semibold leading-tight">Immediate joiner</p>
            <p className="mt-1 text-sm text-black/70">Ahmedabad, India · open to UI/UX &amp; frontend roles</p>
          </Note>
        </div>

        <div className="relative z-20 mt-10 flex flex-col items-center gap-3 lg:mt-0">
          <motion.a
            href="#work"
            whileHover={{ rotate: -2, scale: 1.04 }}
            className="paper inline-flex flex-col items-center rounded-xl border-2 border-ink bg-card px-6 py-3"
          >
            <span className="flex items-center gap-2 font-display text-lg font-semibold">
              See my work <ArrowDownRight className="h-5 w-5" />
            </span>
            <span className="text-xs text-text-secondary">WildMind AI, FLYBIT &amp; more</span>
          </motion.a>
          <p className="hidden font-display text-sm italic text-text-secondary lg:block">
            psst — the notes are draggable. go on, make a mess.
          </p>
          <a
            href="#summary"
            className="inline-flex items-center gap-1 text-sm font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline lg:hidden"
          >
            Recruiter? Read the 30-second summary <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
