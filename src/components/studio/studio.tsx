"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Code2,
  Command,
  Copy,
  Download,
  Layers,
  Link2,
  Mail,
  PenTool,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { profile } from "@/data/content";
import { cn } from "@/lib/utils";

type Mode = "build" | "design";

const ACCENTS = [
  { name: "Indigo", primary: "#6c63ff", secondary: "#00e5ff", glow: "#7c3aed" },
  { name: "Coral", primary: "#ff6b6b", secondary: "#ffd166", glow: "#e8466b" },
  { name: "Lime", primary: "#84cc16", secondary: "#22d3ee", glow: "#16a34a" },
  { name: "Amber", primary: "#f59e0b", secondary: "#f472b6", glow: "#ea580c" },
] as const;

type Tokens = { accent: number; radius: number; motion: boolean };
const DEFAULT_TOKENS: Tokens = { accent: 0, radius: 16, motion: true };
const STORE_KEY = "dc-studio";

function readStore(): { mode: Mode; tokens: Tokens } | null {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStore(v: { mode: Mode; tokens: Tokens }) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(v));
  } catch {
    /* storage unavailable — settings just won't persist */
  }
}

function applyTokens(t: Tokens) {
  const root = document.documentElement;
  const a = ACCENTS[t.accent] ?? ACCENTS[0];
  root.style.setProperty("--accent-primary", a.primary);
  root.style.setProperty("--accent-secondary", a.secondary);
  root.style.setProperty("--purple-glow", a.glow);
  root.style.setProperty("--radius-xl", `${Math.round(t.radius * 0.75)}px`);
  root.style.setProperty("--radius-2xl", `${t.radius}px`);
  root.style.setProperty("--radius-3xl", `${Math.round(t.radius * 1.5)}px`);
  root.dataset.motion = t.motion ? "on" : "off";
  document.querySelectorAll("[data-token='accent-hex']").forEach((el) => {
    el.textContent = a.primary.toUpperCase();
  });
}

function cssFor(t: Tokens) {
  const a = ACCENTS[t.accent] ?? ACCENTS[0];
  return `:root {
  --accent-primary: ${a.primary};
  --accent-secondary: ${a.secondary};
  --purple-glow: ${a.glow};
  --radius-2xl: ${t.radius}px;
}`;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

type Frame = { id: string; name: string };

function useFrames(active: boolean) {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-frame][id]"));
      setFrames(els.map((el) => ({ id: el.id, name: el.dataset.frame ?? el.id })));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!active) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent((e.target as HTMLElement).id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("[data-frame][id]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [active]);

  return { frames, current };
}

export default function Studio() {
  const [mode, setMode] = useState<Mode>("build");
  const [tokens, setTokens] = useState<Tokens>(DEFAULT_TOKENS);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [hint, setHint] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const hydrated = useRef(false);
  const { frames, current } = useFrames(mode === "design");

  // Restore saved state once.
  useEffect(() => {
    const saved = readStore();
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(
      setTimeout(() => {
        if (saved) {
          setMode(saved.mode === "design" ? "design" : "build");
          setTokens({ ...DEFAULT_TOKENS, ...saved.tokens });
        }
        if (window.innerWidth < 640) setPanelOpen(false);
        hydrated.current = true;
      }, 0)
    );
    if (!saved) {
      timers.push(setTimeout(() => setHint(true), 2500));
      timers.push(setTimeout(() => setHint(false), 11000));
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    applyTokens(tokens);
    if (hydrated.current) writeStore({ mode, tokens });
  }, [mode, tokens]);

  const toggleMode = useCallback(() => {
    setHint(false);
    setMode((m) => (m === "design" ? "build" : "design"));
  }, []);

  const flash = (key: string) => {
    setCopied(key);
    setTimeout(() => setCopied(null), 1600);
  };

  const copy = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      flash(key);
    } catch {
      /* clipboard blocked */
    }
  }, []);

  // Keyboard: ⌘/Ctrl+K palette, "D" toggles mode, Esc closes.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing = target.closest("input, textarea, [contenteditable=true]");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
      } else if (!typing && !e.metaKey && !e.ctrlKey && !e.altKey && e.key.toLowerCase() === "d") {
        toggleMode();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleMode]);

  const isDesign = mode === "design";

  return (
    <>
      {/* Layers panel — like Figma's left sidebar */}
      <AnimatePresence>
        {isDesign && (
          <motion.aside
            key="layers"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            aria-label="Page layers"
            className="studio-panel fixed left-4 top-28 z-[60] hidden w-56 rounded-2xl p-3 xl:block"
          >
            <p className="flex items-center gap-2 px-2 pb-2 text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
              <Layers className="h-3.5 w-3.5" /> Layers
            </p>
            <ul className="flex flex-col">
              {frames.map((f) => (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(f.id)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors",
                      current === f.id
                        ? "bg-accent-primary/20 text-text-primary"
                        : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                    )}
                  >
                    <span className="font-mono text-[10px] text-accent-secondary">#</span>
                    {f.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Inspect panel — live design tokens */}
      <AnimatePresence>
        {isDesign && (
          <motion.aside
            key="inspect"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25 }}
            aria-label="Design tokens"
            className="studio-panel fixed inset-x-3 bottom-24 z-[60] max-h-[55vh] overflow-y-auto rounded-2xl p-4 sm:inset-x-auto sm:right-4 sm:top-28 sm:bottom-auto sm:w-72"
          >
            <button
              type="button"
              onClick={() => setPanelOpen((o) => !o)}
              aria-expanded={panelOpen}
              className="flex w-full items-center justify-between text-[11px] font-semibold uppercase tracking-widest text-text-secondary"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="h-3.5 w-3.5" /> Inspect · live tokens
              </span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", !panelOpen && "-rotate-90")} />
            </button>

            {panelOpen && (
              <div className="mt-4 flex flex-col gap-5">
                <p className="text-xs leading-relaxed text-text-secondary">
                  This page is built from the same tokens I design with. Change them and the whole
                  site updates — no reload.
                </p>

                <fieldset>
                  <legend className="mb-2 text-xs text-text-primary">Accent</legend>
                  <div className="flex gap-2">
                    {ACCENTS.map((a, i) => (
                      <button
                        key={a.name}
                        type="button"
                        onClick={() => setTokens((t) => ({ ...t, accent: i }))}
                        aria-label={`${a.name} accent`}
                        aria-pressed={tokens.accent === i}
                        title={a.name}
                        className={cn(
                          "h-8 w-8 rounded-full border-2 transition-transform hover:scale-110",
                          tokens.accent === i ? "border-white" : "border-transparent"
                        )}
                        style={{ background: `linear-gradient(135deg, ${a.primary}, ${a.secondary})` }}
                      />
                    ))}
                  </div>
                </fieldset>

                <label className="flex flex-col gap-2 text-xs text-text-primary">
                  <span className="flex justify-between">
                    Corner radius <span className="font-mono text-text-secondary">{tokens.radius}px</span>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={32}
                    step={2}
                    value={tokens.radius}
                    onChange={(e) => setTokens((t) => ({ ...t, radius: Number(e.target.value) }))}
                    className="studio-range"
                  />
                </label>

                <label className="flex items-center justify-between text-xs text-text-primary">
                  Ambient motion
                  <button
                    type="button"
                    role="switch"
                    aria-checked={tokens.motion}
                    onClick={() => setTokens((t) => ({ ...t, motion: !t.motion }))}
                    className={cn(
                      "relative h-5 w-9 rounded-full transition-colors",
                      tokens.motion ? "bg-accent-primary" : "bg-white/15"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all",
                        tokens.motion ? "left-[18px]" : "left-0.5"
                      )}
                    />
                  </button>
                </label>

                <div>
                  <div className="mb-2 flex items-center justify-between text-xs text-text-primary">
                    <span>Code</span>
                    <button
                      type="button"
                      onClick={() => copy(cssFor(tokens), "css")}
                      className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary"
                    >
                      {copied === "css" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      {copied === "css" ? "Copied" : "Copy CSS"}
                    </button>
                  </div>
                  <pre className="overflow-x-auto rounded-xl bg-black/40 p-3 font-mono text-[11px] leading-relaxed text-accent-secondary">
                    {cssFor(tokens)}
                  </pre>
                </div>

                <button
                  type="button"
                  onClick={() => setTokens(DEFAULT_TOKENS)}
                  className="self-start text-xs text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                >
                  Reset to my defaults
                </button>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Toolbar */}
      <div className="fixed inset-x-0 bottom-5 z-[70] flex justify-center px-4 pointer-events-none">
        <div className="relative pointer-events-auto">
          <AnimatePresence>
            {hint && !isDesign && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="studio-panel absolute bottom-full left-1/2 mb-3 w-64 -translate-x-1/2 rounded-xl px-4 py-3 text-center text-xs text-text-secondary"
              >
                <span className="text-text-primary">Psst — flip to Design mode</span> to see how this
                site was designed, then tweak it live.
              </motion.div>
            )}
          </AnimatePresence>

          <div
            role="toolbar"
            aria-label="View mode"
            className="studio-panel flex items-center gap-1 rounded-full p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
          >
            {(
              [
                { value: "design", label: "Design", Icon: PenTool },
                { value: "build", label: "Build", Icon: Code2 },
              ] as const
            ).map(({ value, label, Icon }) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                onClick={() => {
                  setHint(false);
                  setMode(value);
                }}
                className={cn(
                  "relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors",
                  mode === value ? "text-white" : "text-text-secondary hover:text-text-primary"
                )}
              >
                {mode === value && (
                  <motion.span
                    layoutId="studio-mode-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-primary to-purple-glow"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <Icon className="relative h-3.5 w-3.5" />
                <span className="relative">{label}</span>
              </button>
            ))}
            <span className="mx-1 h-5 w-px bg-white/10" />
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command menu"
              className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs text-text-secondary transition-colors hover:text-text-primary"
            >
              <Command className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">K</span>
            </button>
          </div>
        </div>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        frames={frames}
        mode={mode}
        onToggleMode={toggleMode}
        onAccent={(i) => setTokens((t) => ({ ...t, accent: i }))}
        onCopyEmail={() => copy(profile.email, "email")}
      />

      <AnimatePresence>
        {copied === "email" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            role="status"
            className="studio-panel fixed bottom-24 left-1/2 z-[80] -translate-x-1/2 rounded-full px-4 py-2 text-xs text-text-primary"
          >
            Email copied — {profile.email}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

type Item = { id: string; group: string; label: string; hint?: string; Icon: typeof Search; run: () => void };

function CommandPalette({
  open,
  onClose,
  frames,
  mode,
  onToggleMode,
  onAccent,
  onCopyEmail,
}: {
  open: boolean;
  onClose: () => void;
  frames: Frame[];
  mode: Mode;
  onToggleMode: () => void;
  onAccent: (i: number) => void;
  onCopyEmail: () => void;
}) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const items = useMemo<Item[]>(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    return [
      {
        id: "resume",
        group: "For recruiters",
        label: "Download resume (PDF)",
        Icon: Download,
        run: () => {
          const a = document.createElement("a");
          a.href = `${base}/resume.pdf`;
          a.download = "Diya_Chauhan_Resume.pdf";
          a.click();
        },
      },
      { id: "email", group: "For recruiters", label: "Copy email address", hint: profile.email, Icon: Mail, run: onCopyEmail },
      {
        id: "linkedin",
        group: "For recruiters",
        label: "Open LinkedIn",
        Icon: Link2,
        run: () => window.open(profile.socials.linkedin, "_blank", "noopener,noreferrer"),
      },
      {
        id: "mode",
        group: "View",
        label: mode === "design" ? "Switch to Build mode" : "Switch to Design mode",
        hint: "D",
        Icon: mode === "design" ? Code2 : PenTool,
        run: onToggleMode,
      },
      ...ACCENTS.map((a, i) => ({
        id: `accent-${a.name}`,
        group: "View",
        label: `Accent: ${a.name}`,
        Icon: SlidersHorizontal,
        run: () => onAccent(i),
      })),
      ...frames.map((f) => ({
        id: `go-${f.id}`,
        group: "Go to",
        label: f.name,
        Icon: Layers,
        run: () => scrollToId(f.id),
      })),
    ];
  }, [frames, mode, onToggleMode, onAccent, onCopyEmail]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => `${i.group} ${i.label}`.toLowerCase().includes(q)) : items;
  }, [items, query]);

  function close() {
    setQuery("");
    setIndex(0);
    onClose();
  }

  function choose(item: Item | undefined) {
    if (!item) return;
    close();
    setTimeout(item.run, 60);
  }

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="studio-panel w-full max-w-lg overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search className="h-4 w-4 text-text-secondary" />
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setIndex((i) => Math.min(filtered.length - 1, i + 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setIndex((i) => Math.max(0, i - 1));
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    close();
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    choose(filtered[index]);
                  }
                }}
                placeholder="Jump to a section, grab the resume…"
                aria-label="Search commands"
                className="h-14 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
              />
              <kbd className="rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">
                esc
              </kbd>
            </div>
            <ul role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-text-secondary">Nothing found.</li>
              )}
              {filtered.map((item, i) => {
                const header = item.group !== lastGroup ? item.group : null;
                lastGroup = item.group;
                return (
                  <li key={item.id}>
                    {header && (
                      <p className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-widest text-text-secondary">
                        {header}
                      </p>
                    )}
                    <button
                      type="button"
                      role="option"
                      aria-selected={i === index}
                      onMouseEnter={() => setIndex(i)}
                      onClick={() => choose(item)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                        i === index ? "bg-accent-primary/20 text-text-primary" : "text-text-secondary"
                      )}
                    >
                      <item.Icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {item.hint && <span className="font-mono text-[11px] text-text-secondary">{item.hint}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
