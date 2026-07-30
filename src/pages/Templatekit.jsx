import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] },
  }),
};

const kits = [
  {
    name: "Foundation",
    price: "$49",
    tagline: "The single-signature-moment starter",
    features: [
      "Navbar + submenu wheel component",
      "Home hero with 3D scene slot",
      "Grain + radial glow layer",
      "Tailwind design tokens",
    ],
  },
  {
    name: "Studio",
    price: "$129",
    tagline: "Everything to ship a full site",
    features: [
      "Everything in Foundation",
      "About, Resources, Contact pages",
      "Framer Motion page transitions",
      "Responsive nav + footer patterns",
    ],
    featured: true,
  },
  {
    name: "Gallery",
    price: "$219",
    tagline: "For portfolio and gallery-style builds",
    features: [
      "Everything in Studio",
      "DOMÉ Gallery dome component",
      "Case-study page template",
      "Priority email support",
    ],
  },
];

const included = [
  {
    title: "Components",
    detail:
      "Navbar with animated sidebar, option wheel navigation, footer, and card layouts — all built as composable React components with hooks-based state.",
  },
  {
    title: "Motion presets",
    detail:
      "The fadeUp, hero-entrance, and sidebar-slide animations used throughout this site, ready to drop into new sections with framer-motion.",
  },
  {
    title: "Design tokens",
    detail:
      "The #080808 / #000000 background pairing, indigo-to-blue accent scale, grain texture SVG, and type scale used across every page.",
  },
  {
    title: "Starter routes",
    detail:
      "A react-router-dom setup mirroring this site's routes — Home, About, Gallery, Resources, Contact — so you can start from a working shell.",
  },
];

export default function TemplateKit() {
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
          Template Kit
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 text-3xl font-semibold text-white md:text-5xl"
        >
          Build your own room
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mt-4 text-white/50"
        >
          The same components, motion presets, and design tokens that power
          this site, packaged so you can start from a working shell instead
          of a blank canvas.
        </motion.p>

        {/* Pricing tiers */}
        <div className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-3">
          {kits.map((kit, i) => (
            <motion.div
              key={kit.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className={`flex flex-col p-6 rounded-2xl border transition-colors ${
                kit.featured
                  ? "border-blue-400/40 bg-blue-500/[0.06]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              {kit.featured && (
                <span className="self-start px-3 py-1 mb-4 text-[10px] tracking-widest uppercase rounded-full text-blue-300 bg-blue-500/10 border border-blue-400/30">
                  Most popular
                </span>
              )}

              <h3 className="text-lg font-medium text-white">{kit.name}</h3>
              <p className="mt-1 text-sm text-white/50">{kit.tagline}</p>

              <p className="mt-6 text-3xl font-semibold text-white">
                {kit.price}
                <span className="ml-1 text-sm font-normal text-white/40">
                  one-time
                </span>
              </p>

              <ul className="mt-6 space-y-3">
                {kit.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm leading-relaxed text-white/60"
                  >
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-blue-400/70 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 py-3 text-sm font-medium rounded-xl transition-colors ${
                  kit.featured
                    ? "bg-blue-500/80 hover:bg-blue-500 text-white"
                    : "bg-white/[0.05] hover:bg-white/10 text-white"
                }`}
              >
                Get {kit.name}
              </button>
            </motion.div>
          ))}
        </div>

        {/* What's included */}
        <div className="mt-24">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-xs tracking-[0.3em] uppercase text-white/40"
          >
            What's included
          </motion.p>

          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
            {included.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="p-6 transition-colors border rounded-2xl border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
              >
                <h3 className="text-lg font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pt-8 mt-16 border-t border-white/10"
        >
          <p className="text-sm text-white/40">
            Questions before you buy? Reach out on the{" "}
            <span className="text-blue-400">Contact</span> page.
          </p>
        </motion.div>
      </div>
    </div>
  );
}