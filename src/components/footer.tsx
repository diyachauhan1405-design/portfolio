import { profile } from "@/data/content";

const links = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "Case study", href: "#case-study" },
  { label: "Journey", href: "#experience" },
  { label: "LinkedIn ↗", href: profile.socials.linkedin },
  { label: "Resume ↓", href: "resume.pdf" },
];

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 pb-28 sm:px-6">
      <div className="flex flex-col gap-6 border-t border-ink/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-text-secondary">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(l.href.endsWith(".pdf") ? { download: "Diya_Chauhan_Resume.pdf" } : {})}
                className="hover:text-text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#top" className="text-sm font-medium text-text-secondary hover:text-text-primary">
          Back to top ↑
        </a>
      </div>
      <p className="mt-6 text-sm text-text-secondary">
        {profile.name} © {new Date().getFullYear()} · Designed in Figma, built in Next.js — by me. Press{" "}
        <kbd className="rounded border border-border bg-card px-1.5 font-mono text-xs">D</kbd> to see how.
      </p>
    </footer>
  );
}
