"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagneticButton from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = links.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    function onResize() { if (window.innerWidth >= 768) setMenuOpen(false); }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 2.1, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex flex-col items-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-5 py-3 transition-all duration-500",
          scrolled || menuOpen ? "glass-strong shadow-[0_8px_40px_rgba(0,0,0,0.35)]" : "bg-transparent"
        )}
      >
        <a href="#top" className="font-heading text-lg font-semibold tracking-tight">
          DC<span className="text-accent-secondary">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                    isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full border border-white/10 bg-white/8"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <MagneticButton
            as="a"
            href="#contact"
            className="glass hidden items-center rounded-full px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent-secondary/50 sm:inline-flex"
          >
            Let&apos;s Talk
          </MagneticButton>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="glass flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:text-text-primary md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-4 w-4" />
                </motion.span>
              ) : (
                <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="glass-strong mt-2 w-full max-w-5xl rounded-2xl p-3 shadow-[0_16px_60px_rgba(0,0,0,0.5)]"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-white/8 text-text-primary"
                          : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li className="mt-1 border-t border-border pt-2">
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-accent-primary to-purple-glow py-3 text-sm font-semibold text-white"
                >
                  Let&apos;s Talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
