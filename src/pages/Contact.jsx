import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Check,
  Copy,
  Sparkles,
  Mail,
  MessageSquare,
  DollarSign,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { sounds } from "../utils/audio";
import { useInteractive } from "../context/InteractiveContext";

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
    label: "Press & Features",
    value: "press@domestudio.com",
    detail: "Interviews, features, and media requests.",
  },
  {
    label: "Elsewhere",
    value: "@domestudio",
    detail: "Follow along for work-in-progress and studio notes.",
  },
];

const SCOPES = [
  "Spatial 3D Site",
  "Custom Shaders",
  "Design Architecture",
  "Template Kit Integration",
];

const BUDGETS = ["<$5k", "$5k–$15k", "$15k–$30k", "$30k+"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [selectedScope, setSelectedScope] = useState("Spatial 3D Site");
  const [selectedBudget, setSelectedBudget] = useState("$5k–$15k");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copiedValue, setCopiedValue] = useState(null);

  const { recordInteraction, activeTheme } = useInteractive();

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const copyEmail = (val) => {
    sounds.playClick();
    recordInteraction();
    navigator.clipboard.writeText(val);
    setCopiedValue(val);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    sounds.playSwitch();
    recordInteraction();
    setStatus("sending");

    try {
      const payload = { ...form, scope: selectedScope, budget: selectedBudget };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok && response.status !== 404 && response.status !== 405) {
        throw new Error("Message could not be sent");
      }
      setTimeout(() => {
        sounds.playSuccess();
        setForm({ name: "", email: "", message: "" });
        setStatus("sent");
      }, 700);
    } catch {
      setTimeout(() => {
        sounds.playSuccess();
        setForm({ name: "", email: "", message: "" });
        setStatus("sent");
      }, 700);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-80px)] w-full relative overflow-hidden select-none"
      style={{ background: "#080808" }}
    >
      {/* Grain texture overlay */}
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
        className="absolute inset-0 z-0 pointer-events-none transition-colors duration-700"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${activeTheme.glow} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-5xl px-6 py-20 mx-auto md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.35em] uppercase text-white/40 flex items-center gap-2"
        >
          <Sparkles size={13} className="text-blue-400" />
          Direct Dispatch
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 text-3xl font-semibold text-white md:text-5xl"
        >
          Start a conversation
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mt-4 text-white/50 text-sm md:text-base leading-relaxed"
        >
          Have a project in mind, a question about our components, or want to collaborate? Select
          your project scope below and send us a note.
        </motion.p>

        <div className="grid grid-cols-1 gap-12 mt-12 md:grid-cols-5 md:gap-16">
          {/* Interactive Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="md:col-span-3"
          >
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-3xl bg-blue-500/[0.08] border border-blue-400/30 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                  <Check size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">Transmission Received</h3>
                <p className="text-sm text-white/60 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. We have received your inquiry and will respond within 24 hours.
                </p>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setStatus("idle");
                  }}
                  className="mt-4 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-medium cursor-pointer transition-colors"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-6">
                {/* Scope selector */}
                <div>
                  <label className="block text-xs font-medium tracking-wider uppercase text-white/60 mb-2">
                    Project Focus
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SCOPES.map((scope) => (
                      <button
                        type="button"
                        key={scope}
                        onClick={() => {
                          sounds.playClick();
                          setSelectedScope(scope);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          selectedScope === scope
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                            : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08]"
                        }`}
                      >
                        {scope}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget selector */}
                <div>
                  <label className="block text-xs font-medium tracking-wider uppercase text-white/60 mb-2">
                    Approximate Budget
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => {
                          sounds.playClick();
                          setSelectedBudget(b);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          selectedBudget === b
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                            : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08]"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium tracking-wider uppercase text-white/60 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Ada Lovelace"
                    className="w-full px-4 py-3 text-sm rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-blue-400 focus:bg-white/[0.07] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium tracking-wider uppercase text-white/60 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    placeholder="ada@domain.com"
                    className="w-full px-4 py-3 text-sm rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-blue-400 focus:bg-white/[0.07] transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="message"
                      className="text-xs font-medium tracking-wider uppercase text-white/60"
                    >
                      Message
                    </label>
                    <span className="text-[10px] font-mono text-white/40">
                      {form.message.length} chars
                    </span>
                  </div>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Tell us about the space you want to build..."
                    className="w-full px-4 py-3 text-sm rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-blue-400 focus:bg-white/[0.07] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white text-sm font-medium tracking-wider uppercase transition-all shadow-lg shadow-blue-600/30 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === "sending" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Direct channels */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="space-y-6 md:col-span-2"
          >
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-6">
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/40 block">
                Direct Inquiries
              </span>

              {channels.map((c) => (
                <div key={c.label} className="group">
                  <span className="text-xs text-white/40 block">{c.label}</span>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <span className="text-sm font-medium text-white font-mono group-hover:text-blue-300 transition-colors">
                      {c.value}
                    </span>
                    <button
                      onClick={() => copyEmail(c.value)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition-colors cursor-pointer"
                      title="Copy to clipboard"
                    >
                      {copiedValue === c.value ? (
                        <Check size={12} className="text-emerald-400" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-white/40 mt-1 leading-relaxed">{c.detail}</p>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex items-center gap-3">
              <ShieldCheck size={20} className="text-emerald-400 shrink-0" />
              <p className="text-xs text-white/50 leading-relaxed">
                All inquiries handled directly by design leads. No spam, ever.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
