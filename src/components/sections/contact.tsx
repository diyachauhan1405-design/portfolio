"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Send } from "lucide-react";
import { profile } from "@/data/content";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const field =
    "w-full border-0 border-b-2 border-black/25 bg-transparent px-1 py-2 text-[15px] outline-none placeholder:text-black/45 focus:border-ink";

  return (
    <section id="contact" data-frame="Contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="paper inline-block -rotate-3 bg-note-orange px-3 py-1 text-sm font-semibold">say hi 👋</p>
          <h2 className="mt-6 font-display text-6xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            Design it.
            <br />
            <span className="italic text-accent-primary">Ship</span> it.
          </h2>
          <p className="mt-6 max-w-md text-lg text-text-secondary">
            Open to UI/UX and frontend roles — immediate joiner, based in Ahmedabad.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex items-center gap-2 border-b-2 border-ink pb-1 font-display text-2xl font-medium hover:text-accent-primary sm:text-3xl"
          >
            {profile.email} <ArrowUpRight className="h-6 w-6" />
          </a>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-ink px-4 py-2 hover:bg-note-sky"
            >
              LinkedIn ↗
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-ink px-4 py-2 hover:bg-note-mint"
            >
              GitHub ↗
            </a>
            <a
              href="resume.pdf"
              download="Diya_Chauhan_Resume.pdf"
              className="rounded-full border-2 border-ink px-4 py-2 hover:bg-note-pink"
            >
              Resume ↓
            </a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: 2 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 130, damping: 16 }}
          data-spec="Form note · lined paper · underline inputs"
          className="paper tape lined relative bg-note-yellow p-7 pt-9"
          aria-label="Leave Diya a note"
        >
          <p className="font-display text-2xl font-semibold">leave me a note</p>
          <div className="mt-5 flex flex-col gap-4">
            <label className="sr-only" htmlFor="c-name">Your name</label>
            <input
              id="c-name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="your name"
              className={field}
            />
            <label className="sr-only" htmlFor="c-email">Your email</label>
            <input
              id="c-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="your email"
              className={field}
            />
            <label className="sr-only" htmlFor="c-msg">Message</label>
            <textarea
              id="c-msg"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="hey diya, we're hiring for…"
              className={`${field} resize-none`}
            />
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-rotate-2"
          >
            {sent ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> Opening your mail app…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Send note
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
