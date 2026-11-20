"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const tones = {
  yellow: "bg-note-yellow",
  pink: "bg-note-pink",
  mint: "bg-note-mint",
  sky: "bg-note-sky",
  lilac: "bg-note-lilac",
  orange: "bg-note-orange",
} as const;

export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "yellow",
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  tone?: keyof typeof tones;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <motion.span
        initial={{ opacity: 0, rotate: 0, y: 8 }}
        whileInView={{ opacity: 1, rotate: -3, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className={cn("paper inline-block px-3 py-1 text-sm font-semibold", tones[tone])}
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
        data-spec="H2 · Fraunces Semibold · 56/58 · tracking −2%"
        className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-[3.5rem]"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl text-base text-text-secondary sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
