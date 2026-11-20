"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  ExternalLink,
  FileText,
  Frame,
  Hand,
  Hash,
  Loader2,
  Mail,
  MessageCircle,
  MousePointer2,
  PenTool,
  Play,
  Plus,
  Search,
  Square,
  Type,
} from "lucide-react";
import { designFiles, profile, type DesignFile } from "@/data/content";
import { cn } from "@/lib/utils";

const BLUE = "#0d99ff";

function embedSrc(url: string) {
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
}

/* Selected file lives in the URL hash so each file is linkable: /designs#flybit */
function useHash() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("hashchange", cb);
      return () => window.removeEventListener("hashchange", cb);
    },
    () => window.location.hash.slice(1),
    () => ""
  );
}

function select(id: string) {
  history.replaceState(null, "", `#${id}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

const TOOLS = [
  { Icon: MousePointer2, label: "Move", key: "V" },
  { Icon: Frame, label: "Frame", key: "F" },
  { Icon: Square, label: "Rectangle", key: "R" },
  { Icon: PenTool, label: "Pen", key: "P" },
  { Icon: Type, label: "Text", key: "T" },
  { Icon: Hand, label: "Hand tool", key: "H" },
];

export default function DesignEditor() {
  const hash = useHash();
  const [page, setPage] = useState<string>("All files");
  const [tab, setTab] = useState<"design" | "prototype">("design");
  const [tool, setTool] = useState("Move");
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const pages = useMemo(() => ["All files", ...Array.from(new Set(designFiles.map((f) => f.page)))], []);
  const layers = page === "All files" ? designFiles : designFiles.filter((f) => f.page === page);
  const file: DesignFile = designFiles.find((f) => f.id === hash) ?? designFiles[0];

  // ↑ / ↓ moves between files, like stepping through layers.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.target as HTMLElement).closest("input, textarea, select")) return;
      const i = designFiles.findIndex((f) => f.id === file.id);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        select(designFiles[Math.min(designFiles.length - 1, i + 1)].id);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        select(designFiles[Math.max(0, i - 1)].id);
      } else {
        const t = TOOLS.find((x) => x.key.toLowerCase() === e.key.toLowerCase());
        if (t && !e.metaKey && !e.ctrlKey) setTool(t.label);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [file.id]);

  const requestMail = `mailto:${profile.email}?subject=${encodeURIComponent(`Figma access: ${file.project}`)}`;
  const shareHref = file.figmaUrl || requestMail;

  return (
    <div data-lenis-prevent
      className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-[#f5f5f5] font-body text-[12px] text-[#1e1e1e] lg:flex-row lg:overflow-hidden">
      {/* ───── Left panel: file, pages, layers ───── */}
      <aside
        data-lenis-prevent
        className="flex shrink-0 flex-col border-b border-[#e6e6e6] bg-white lg:w-[240px] lg:border-b-0 lg:border-r"
      >
        <div className="flex items-center gap-2 px-3 py-3">
          <Link
            href="/"
            title="Back to portfolio"
            className="flex h-8 items-center gap-1 rounded-md px-1.5 hover:bg-[#f0f0f0]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1e1e1e] font-display text-[11px] font-bold text-white">
              DC
            </span>
            <ChevronDown className="h-3 w-3 text-[#8c8c8c]" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold">Diya&apos;s design files</p>
            <p className="truncate text-[11px] text-[#8c8c8c]">Portfolio · {designFiles.length} files</p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-b border-[#e6e6e6] px-4 pb-2 text-[12px] font-semibold">
          <span>File</span>
          <span className="text-[#8c8c8c]">Assets</span>
          <Search className="ml-auto h-3.5 w-3.5 text-[#8c8c8c]" />
        </div>

        {/* Mobile: compact file picker */}
        <div className="flex gap-2 overflow-x-auto px-3 py-2 lg:hidden">
          {designFiles.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => select(f.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px]",
                f.id === file.id ? "bg-[#e5f4ff] font-semibold" : "bg-[#f5f5f5]"
              )}
            >
              <Hash className="h-3 w-3 text-[#8c8c8c]" />
              {f.project}
            </button>
          ))}
        </div>

        <div className="hidden flex-1 flex-col overflow-y-auto lg:flex">
          <div className="border-b border-[#e6e6e6] px-2 py-2">
            <div className="flex items-center justify-between px-2 py-1 text-[11px] font-semibold">
              Pages <Plus className="h-3.5 w-3.5 text-[#8c8c8c]" />
            </div>
            <ul>
              {pages.map((p) => (
                <li key={p}>
                  <button
                    type="button"
                    onClick={() => setPage(p)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left",
                      p === page ? "bg-[#f0f0f0] font-semibold" : "hover:bg-[#f5f5f5]"
                    )}
                  >
                    <FileText className="h-3.5 w-3.5 text-[#8c8c8c]" />
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-2 py-2">
            <p className="px-2 py-1 text-[11px] font-semibold">Layers</p>
            <ul role="listbox" aria-label="Design files">
              {layers.map((f) => {
                const active = f.id === file.id;
                return (
                  <li key={f.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => select(f.id)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left",
                        active ? "bg-[#e5f4ff] font-semibold" : "hover:bg-[#f5f5f5]"
                      )}
                    >
                      <Hash className="h-3.5 w-3.5" style={{ color: active ? BLUE : "#8c8c8c" }} />
                      <span className="truncate">{f.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-auto border-t border-[#e6e6e6] p-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] font-medium hover:bg-[#f5f5f5]"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to portfolio
            </Link>
            <p className="px-2 pt-1 text-[11px] text-[#8c8c8c]">↑ ↓ to switch files</p>
          </div>
        </div>
      </aside>

      {/* ───── Canvas ───── */}
      <main
        className="relative flex min-h-[62vh] flex-1 flex-col overflow-hidden lg:min-h-0"
        style={{
          backgroundImage: "radial-gradient(#d9d9d9 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          cursor: tool === "Hand tool" ? "grab" : "default",
        }}
      >
        <div className="flex flex-1 flex-col p-4 pb-20 sm:p-8 sm:pb-24">
          {/* Frame name label, like Figma */}
          <p className="mb-1.5 flex items-center gap-1 text-[11px] font-medium" style={{ color: BLUE }}>
            <Hash className="h-3 w-3" /> {file.name}
          </p>

          {/* Selected frame with selection box + handles */}
          <div className="relative flex-1" style={{ outline: `1.5px solid ${BLUE}` }}>
            {[
              "-left-[4px] -top-[4px]",
              "-right-[4px] -top-[4px]",
              "-left-[4px] -bottom-[4px]",
              "-right-[4px] -bottom-[4px]",
            ].map((pos) => (
              <span
                key={pos}
                className={cn("absolute z-10 h-[8px] w-[8px] border bg-white", pos)}
                style={{ borderColor: BLUE }}
              />
            ))}

            <div className="absolute inset-0 overflow-hidden bg-white shadow-[0_2px_14px_rgba(0,0,0,0.08)]">
              {file.figmaUrl ? (
                <>
                  {!loaded[file.id] && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#8c8c8c]">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      Opening Figma file…
                    </div>
                  )}
                  <iframe
                    key={file.id}
                    title={`${file.name} — Figma file`}
                    src={embedSrc(file.figmaUrl)}
                    allowFullScreen
                    onLoad={() => setLoaded((l) => ({ ...l, [file.id]: true }))}
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </>
              ) : (
                <EmptyFrame file={file} requestMail={requestMail} />
              )}
            </div>

            <span
              className="absolute -bottom-7 left-1/2 -translate-x-1/2 rounded px-1.5 py-0.5 text-[10px] font-semibold text-white"
              style={{ background: BLUE }}
            >
              {file.figmaUrl ? "Live Figma file" : "Preview"}
            </span>
          </div>
        </div>

        {/* Floating toolbar (UI3 style) */}
        <div
          role="toolbar"
          aria-label="Tools"
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-xl border border-[#e6e6e6] bg-white p-1 shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
        >
          {TOOLS.map(({ Icon, label, key }) => (
            <button
              key={label}
              type="button"
              title={`${label} (${key})`}
              aria-label={label}
              aria-pressed={tool === label}
              onClick={() => setTool(label)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                tool === label ? "text-white" : "hover:bg-[#f0f0f0]"
              )}
              style={tool === label ? { background: BLUE } : undefined}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
          <span className="mx-1 h-5 w-px bg-[#e6e6e6]" />
          <a
            href={requestMail}
            title="Leave a comment (email)"
            aria-label="Leave a comment by email"
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#f0f0f0]"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </main>

      {/* ───── Right panel: properties ───── */}
      <aside
        data-lenis-prevent
        className="flex shrink-0 flex-col overflow-y-auto border-t border-[#e6e6e6] bg-white lg:w-[260px] lg:border-l lg:border-t-0"
      >
        <div className="flex items-center gap-2 border-b border-[#e6e6e6] px-3 py-2.5">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-[#1e1e1e]"
            style={{ background: "#ffd54a" }}
            title={profile.name}
          >
            DC
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <a
              href={file.prototypeUrl || undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!file.prototypeUrl}
              title={file.prototypeUrl ? "Present prototype" : "No prototype for this file"}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-md",
                file.prototypeUrl ? "hover:bg-[#f0f0f0]" : "pointer-events-none opacity-30"
              )}
            >
              <Play className="h-3.5 w-3.5" />
            </a>
            <a
              href={shareHref}
              target={file.figmaUrl ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="rounded-md px-3 py-1.5 text-[12px] font-semibold text-white"
              style={{ background: BLUE }}
            >
              {file.figmaUrl ? "Open in Figma" : "Request access"}
            </a>
          </div>
        </div>

        <div className="flex gap-4 border-b border-[#e6e6e6] px-4 py-2 text-[12px] font-semibold">
          {(["design", "prototype"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn("capitalize", tab === t ? "text-[#1e1e1e]" : "text-[#8c8c8c]")}
            >
              {t}
            </button>
          ))}
          <span className="ml-auto font-normal text-[#8c8c8c]">100%</span>
        </div>

        {tab === "design" ? (
          <div className="divide-y divide-[#e6e6e6]">
            <Section title="Frame">
              <p className="font-semibold">{file.name}</p>
            </Section>
            <Section title="Project">
              <Row label="Client" value={file.project} />
              <Row label="Type" value={file.type} />
              <Row label="Role" value={file.role} />
              {file.year && <Row label="Year" value={file.year} />}
            </Section>
            <Section title="Fill">
              <div className="flex items-center gap-2 rounded-md bg-[#f5f5f5] px-2 py-1.5">
                <span className="h-4 w-4 rounded-sm border border-black/10" style={{ background: file.swatch }} />
                <span className="font-mono uppercase">{file.swatch.replace("#", "")}</span>
                <span className="ml-auto text-[#8c8c8c]">100%</span>
              </div>
            </Section>
            <Section title="Description">
              <p className="leading-relaxed text-[#4d4d4d]">{file.summary}</p>
            </Section>
            <Section title="Highlights">
              <ul className="flex flex-col gap-1.5">
                {file.highlights.map((h) => (
                  <li key={h} className="flex gap-2 leading-snug">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: BLUE }} />
                    {h}
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="Tools">
              <ul className="flex flex-wrap gap-1.5">
                {file.tools.map((t) => (
                  <li key={t} className="rounded bg-[#f5f5f5] px-2 py-1">
                    {t}
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="Export">
              <div className="flex flex-col gap-1.5">
                {file.figmaUrl && (
                  <a href={file.figmaUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-md border border-[#e6e6e6] px-2 py-1.5 hover:bg-[#f5f5f5]">
                    Open in Figma <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {file.liveUrl && (
                  <a href={file.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-md border border-[#e6e6e6] px-2 py-1.5 hover:bg-[#f5f5f5]">
                    View live site <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <a href="resume.pdf" download="Diya_Chauhan_Resume.pdf" className="flex items-center justify-between rounded-md border border-[#e6e6e6] px-2 py-1.5 hover:bg-[#f5f5f5]">
                  Resume.pdf <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </Section>
          </div>
        ) : (
          <div className="flex flex-col gap-3 p-4 leading-relaxed text-[#4d4d4d]">
            {file.prototypeUrl ? (
              <>
                <p>An interactive prototype is available for this file.</p>
                <a
                  href={file.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-md py-2 font-semibold text-white"
                  style={{ background: BLUE }}
                >
                  <Play className="h-3.5 w-3.5" /> Present prototype
                </a>
              </>
            ) : (
              <>
                <p>A clickable prototype for this project is available on request.</p>
                <a
                  href={requestMail}
                  className="flex items-center justify-center gap-2 rounded-md border border-[#e6e6e6] py-2 font-semibold hover:bg-[#f5f5f5]"
                >
                  <Mail className="h-3.5 w-3.5" /> Ask for the prototype
                </a>
              </>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="px-4 py-3">
      <h2 className="mb-2 text-[11px] font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 py-0.5">
      <span className="w-12 shrink-0 text-[#8c8c8c]">{label}</span>
      <span className="min-w-0">{value}</span>
    </div>
  );
}

/* Shown when a file has no public Figma link yet: an on-brand cover frame. */
function EmptyFrame({ file, requestMail }: { file: DesignFile; requestMail: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-8 text-center" style={{ background: file.swatch }}>
      <p className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold">{file.type}</p>
      <h1 className="max-w-xl font-display text-4xl font-semibold leading-tight sm:text-5xl">{file.project}</h1>
      <p className="max-w-md text-[14px] leading-relaxed text-black/70">{file.summary}</p>
      <div className="flex flex-wrap justify-center gap-2 text-[13px] font-semibold">
        <a href={requestMail} className="inline-flex items-center gap-2 rounded-full bg-[#1e1e1e] px-4 py-2 text-white">
          <Mail className="h-4 w-4" /> Request the Figma file
        </a>
        {file.liveUrl && (
          <a
            href={file.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#1e1e1e] px-4 py-2"
          >
            View live site <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
