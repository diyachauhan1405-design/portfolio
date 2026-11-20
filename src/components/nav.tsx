"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "Case study", href: "#case-study" },
  { label: "Journey", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <a
          href="#top"
          className="rounded-full bg-bg/80 px-3 py-1.5 font-display text-xl font-semibold tracking-tight backdrop-blur"
        >
          Diya Chauhan<span className="text-accent-primary">.</span>
        </a>

        <nav
          aria-label="Main"
          className="studio-box hidden items-center gap-1 rounded-full border border-border bg-card/90 p-1.5 shadow-[0_10px_30px_-18px_rgba(70,45,20,0.6)] backdrop-blur md:flex"
        >
          {links.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-white" : "text-text-secondary hover:text-text-primary"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            );
          })}
          <span className="mx-1 h-5 w-px bg-border" />
          <a
            href="resume.pdf"
            download="Diya_Chauhan_Resume.pdf"
            className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-text-primary hover:bg-note-yellow"
          >
            Resume <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="paper mx-auto mt-3 max-w-6xl bg-note-yellow p-3 md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-3 font-display text-lg font-medium hover:bg-black/5"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="resume.pdf"
                  download="Diya_Chauhan_Resume.pdf"
                  className="mt-1 flex items-center justify-center gap-1 rounded-full bg-ink py-3 text-sm font-semibold text-white"
                >
                  Download resume <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
