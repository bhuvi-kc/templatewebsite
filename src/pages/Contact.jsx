import React, { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] },
  }),
};

const channels = [
  {
    label: "General",
    value: "hello@domestudio.com",
    detail: "Project inquiries, collaborations, or just to say hi.",
  },
  {
    label: "Press",
    value: "press@domestudio.com",
    detail: "Interviews, features, and media requests.",
  },
  {
    label: "Elsewhere",
    value: "@domestudio",
    detail: "Follow along for work-in-progress and studio notes.",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 900);
  };

  return (
    <div
      className="min-h-[calc(100vh-80px)] w-full relative overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* Grain texture overlay — matches Home / Resources / About */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl px-6 py-24 mx-auto md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.35em] uppercase text-white/40"
        >
          Contact
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 text-3xl font-semibold text-white md:text-5xl"
        >
          Let's talk about your space
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mt-4 text-white/50"
        >
          Whether it's a full build or a single signature moment, tell us
          what you're working on and we'll get back to you within a couple
          of days.
        </motion.p>

        <div className="grid grid-cols-1 gap-10 mt-16 md:grid-cols-5">
          {/* Form */}
          <motion.form
            onSubmit={submit}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="p-6 border md:col-span-3 rounded-2xl border-white/10 bg-white/[0.02]"
          >
            <div className="space-y-5">
              <div>
                <label className="text-[11px] tracking-wide uppercase text-white/30">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className="w-full mt-2 px-4 py-3 text-sm text-white bg-white/[0.03] border border-white/10 rounded-xl outline-none placeholder:text-white/25 focus:border-blue-400/40 transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] tracking-wide uppercase text-white/30">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                  className="w-full mt-2 px-4 py-3 text-sm text-white bg-white/[0.03] border border-white/10 rounded-xl outline-none placeholder:text-white/25 focus:border-blue-400/40 transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] tracking-wide uppercase text-white/30">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  placeholder="What are you building?"
                  rows={5}
                  className="w-full mt-2 px-4 py-3 text-sm text-white bg-white/[0.03] border border-white/10 rounded-xl outline-none placeholder:text-white/25 focus:border-blue-400/40 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status !== "idle"}
                className="w-full py-3 mt-2 text-sm font-medium text-white transition-colors rounded-xl bg-blue-500/80 hover:bg-blue-500 disabled:opacity-60"
              >
                {status === "idle" && "Send message"}
                {status === "sending" && "Sending…"}
                {status === "sent" && "Sent — thank you"}
              </button>
            </div>
          </motion.form>

          {/* Channels */}
          <div className="flex flex-col gap-4 md:col-span-2">
            {channels.map((c, i) => (
              <motion.div
                key={c.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="p-6 transition-colors border rounded-2xl border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
              >
                <p className="text-xs tracking-[0.3em] uppercase text-white/40">
                  {c.label}
                </p>
                <p className="mt-2 text-lg font-medium text-white">
                  {c.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {c.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}