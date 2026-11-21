import { ArrowUpRight, Lock } from "lucide-react";

type Props = {
  name: string;
  href: string;
  external: boolean;
  screenshot?: string;
  host?: string;
  tagline?: string;
  cover?: { metric: string; metricLabel: string; color: string };
};

/**
 * Card thumbnail.
 * - With a screenshot: a mini browser showing the real site; hovering (or
 *   focusing) the card scrolls the full page from top to footer.
 * - Without one: a bold cover with the project name and a metric sticker.
 */
export default function ProjectThumb({ name, href, external, screenshot, host, tagline, cover }: Props) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  if (screenshot) {
    return (
      <a
        href={href}
        {...linkProps}
        aria-label={`Visit ${name} (${host})`}
        data-spec="Thumbnail · browser frame · full-page scroll on hover"
        className="group/thumb block overflow-hidden rounded-md border border-black/15 bg-card shadow-[0_1px_0_rgba(0,0,0,0.05)]"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-black/10 bg-[#f1efe8] px-2.5 py-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-1.5 flex min-w-0 flex-1 items-center gap-1 rounded bg-white px-2 py-0.5 text-[10px] text-black/60">
            <Lock className="h-2.5 w-2.5 shrink-0" />
            <span className="truncate">{host}</span>
          </span>
          <ArrowUpRight className="h-3 w-3 shrink-0 text-black/50 transition-colors group-hover/thumb:text-black" />
        </div>

        {/* Viewport: the screenshot scrolls inside on hover */}
        <div className="thumb-viewport relative aspect-[4/3] overflow-hidden bg-[#111]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${base}${screenshot}`}
            alt={`Full-page screenshot of ${host}`}
            loading="lazy"
            className="thumb-scroll absolute inset-x-0 top-0 w-full"
          />
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white opacity-100 transition-opacity group-hover:opacity-0 group-focus-within:opacity-0 [@media(hover:none)]:hidden">
            hover to scroll ↓
          </span>
        </div>
      </a>
    );
  }

  // No public site: an illustrated "generative AI app" cover (prompt bar +
  // generated tiles) with the headline metric as a sticker.
  const tiles = ["#ff9ec7", "#8fd3ff", "#ffd54a", "#8ee6b5"];
  return (
    <a
      href={href}
      {...linkProps}
      aria-label={`${name}: ${tagline ?? "read the case study"}`}
      data-spec="Thumbnail · illustrated AI app cover + metric sticker"
      className="relative block aspect-[4/3] overflow-hidden rounded-md border border-black/15 bg-ink p-3.5"
    >
      {/* prompt bar */}
      <div className="flex items-center gap-2 rounded-lg bg-white/10 px-2.5 py-2 text-[11px] text-white/80">
        <span className="text-note-yellow">✦</span>
        <span className="truncate">a paper-cut city at golden hour</span>
        <span className="ml-auto shrink-0 rounded-md bg-white px-1.5 py-0.5 text-[10px] font-semibold text-ink">
          Generate
        </span>
      </div>
      {/* generated results — tiles fill in one by one on hover */}
      <div className="mt-2.5 grid grid-cols-4 gap-1.5">
        {tiles.map((c, i) => (
          <span
            key={c}
            className={`aspect-square rounded-md transition-all duration-500 ${
              i < 2 ? "" : "scale-90 opacity-30 group-hover:scale-100 group-hover:opacity-100"
            }`}
            style={{ background: c, transitionDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
      <div className="mt-2.5 flex gap-1.5">
        <span className="h-1.5 w-2/5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1/5 rounded-full bg-white/10" />
      </div>
      {cover && (
        <span className="sticker absolute bottom-3 right-3 flex h-16 w-16 rotate-[10deg] flex-col items-center justify-center text-center transition-transform group-hover:rotate-0">
          <span className="font-display text-lg font-semibold leading-none">{cover.metric}</span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wide text-black/60">{cover.metricLabel}</span>
        </span>
      )}
      <span className="absolute bottom-3.5 left-3.5 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/70">
        read the case study →
      </span>
    </a>
  );
}
