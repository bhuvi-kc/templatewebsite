import React from "react";
import { motion } from "framer-motion";

const stack = [
  {
    category: "Core Framework",
    items: [
      {
        name: "React",
        role: "UI Library",
        detail:
          "Every screen on this site — Home, Navbar, Gallery, Resources — is built as a composable React component tree. State (menu open/closed, scroll position, active route) is handled with hooks like useState and useEffect.",
      },
      {
        name: "Vite",
        role: "Build Tool",
        detail:
          "Powers the dev server and production bundling. Gives us near-instant hot module reload while building the UI, and a fast, optimized build for deployment.",
      },
    ],
  },
  {
    category: "Styling",
    items: [
      {
        name: "Tailwind CSS",
        role: "Utility-first CSS",
        detail:
          "All layout, spacing, color, and responsive breakpoints across the site are written with Tailwind utility classes directly in JSX — no separate CSS files to maintain. Custom values (like the #080808 background) are applied with arbitrary value syntax.",
      },
    ],
  },
  {
    category: "Animation",
    items: [
      {
        name: "Framer Motion",
        role: "Animation Library",
        detail:
          "Drives every transition on the site: the sidebar menu sliding open/closed, fade-and-slide entrances on Home and Resources, and the AnimatePresence-based exit animations used across pages.",
      },
    ],
  },
  {
    category: "3D & Visuals",
    items: [
      {
        name: "Spline",
        role: "3D Scene Embed",
        detail:
          "The homepage hero is a live, interactive 3D scene rendered via @splinetool/react-spline, layered under a grain texture and a soft indigo radial glow for depth.",
      },
    ],
  },
  {
    category: "Icons",
    items: [
      {
        name: "lucide-react",
        role: "Icon Set",
        detail:
          "Supplies the Menu and X icons used in the navbar's open/close controls, keeping icon weight and style consistent with the rest of the UI.",
      },
    ],
  },
  {
    category: "Routing",
    items: [
      {
        name: "react-router-dom",
        role: "Client-side Routing",
        detail:
          "Handles navigation between Home, About, DOMÉ Gallery, Template Kit, Resources, and Contact without full page reloads, using useNavigate inside the submenu.",
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Resources() {
  return (
    <div
      className="min-h-[calc(100vh-80px)] w-full relative overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* Grain texture overlay — matches Home */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Radial glow — matches Home's indigo tone */}
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
          Resources
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 text-3xl font-semibold text-white md:text-5xl"
        >
          What we build with
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mt-4 text-white/50"
        >
          A breakdown of the tools, libraries, and frameworks that power this
          site — from the framework it's built on to the animation and 3D
          layers you see on screen.
        </motion.p>

        <div className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-2">
          {stack.map((group, gi) => (
            <motion.div
              key={group.category}
              custom={gi}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="p-6 transition-colors border rounded-2xl border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
            >
              <p className="text-xs tracking-[0.3em] uppercase text-white/40">
                {group.category}
              </p>

              <div className="mt-4 space-y-6">
                {group.items.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-lg font-medium text-white">
                        {item.name}
                      </h3>
                      <span className="text-[11px] tracking-wide uppercase text-white/30 whitespace-nowrap">
                        {item.role}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="pt-8 mt-16 border-t border-white/10"
        >
          <p className="text-sm text-white/40">
            Built with React + Vite, styled with Tailwind CSS, animated with
            Framer Motion.
          </p>
        </motion.div>
      </div>
    </div>
  );
}