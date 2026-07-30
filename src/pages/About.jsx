import React from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  DomeSphere — a lightweight, dependency-free 3D emblem.             */
/*  A rotating "armillary dome" built purely from CSS 3D transforms    */
/*  + framer-motion, echoing the brand name and the DOMÉ Gallery       */
/*  elsewhere on the site — without pulling in three.js or a new       */
/*  Spline scene.                                                      */
/* ------------------------------------------------------------------ */
const RING_CONFIG = [
  { size: 420, rotateX: 75, rotateY: 0, duration: 26, opacity: 0.5 },
  { size: 420, rotateX: 75, rotateY: 60, duration: 34, opacity: 0.35 },
  { size: 420, rotateX: 75, rotateY: 120, duration: 40, opacity: 0.28 },
  { size: 340, rotateX: 20, rotateY: 30, duration: 22, opacity: 0.4 },
  { size: 260, rotateX: 10, rotateY: 90, duration: 18, opacity: 0.3 },
];

const DomeSphere = () => {
  return (
    <div
      className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      style={{ perspective: "1400px" }}
    >
      {/* soft core glow behind the rings */}
      <div
        className="absolute w-[380px] h-[380px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.28) 0%, rgba(37,99,235,0.08) 45%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div
        className="relative"
        style={{ transformStyle: "preserve-3d", width: 0, height: 0 }}
      >
        {RING_CONFIG.map((ring, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: ring.size,
              height: ring.size,
              top: -ring.size / 2,
              left: -ring.size / 2,
              borderColor: `rgba(96,165,250,${ring.opacity})`,
              borderWidth: 1,
              transformStyle: "preserve-3d",
              boxShadow: `0 0 24px rgba(37,99,235,${ring.opacity * 0.35})`,
            }}
            initial={{
              rotateX: ring.rotateX,
              rotateY: ring.rotateY,
              rotateZ: 0,
            }}
            animate={{ rotateZ: 360 }}
            transition={{
              duration: ring.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* small orbiting nodes to sell the "dome" reading */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute rounded-full"
            style={{
              width: 6,
              height: 6,
              top: -3,
              left: -3,
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 0 10px rgba(59,130,246,0.9)",
              transformStyle: "preserve-3d",
            }}
            initial={{ rotateY: i * 120, rotateX: 75 }}
            animate={{ rotateY: [i * 120, i * 120 + 360] }}
            transition={{
              duration: 20 + i * 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div style={{ transform: "translateZ(210px)" }}>
              <div className="w-full h-full rounded-full bg-white/90" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Page content                                                       */
/* ------------------------------------------------------------------ */

const pillars = [
  {
    title: "Craft",
    detail:
      "Every interaction is considered down to the easing curve. We'd rather ship less and have it feel right than pad a page with motion that doesn't earn its place.",
  },
  {
    title: "Depth",
    detail:
      "Flat interfaces are easy to build and easy to forget. We reach for layered light, grain, and 3D space to give screens a sense of physical presence.",
  },
  {
    title: "Clarity",
    detail:
      "Underneath the atmosphere is a plain, legible structure. Navigation, hierarchy, and copy are kept honest so the experience never gets in its own way.",
  },
  {
    title: "Restraint",
    detail:
      "One idea, executed well, beats five competing for attention. Every page here is built around a single signature moment and quiet supporting detail.",
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

export default function About() {
  return (
    <div
      className="w-full relative overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Grain texture overlay — matches Home / Resources */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Hero */}
      <section className="relative min-h-[calc(100vh-80px)] w-full flex items-center">
        <DomeSphere />

        <div className="relative z-10 max-w-5xl px-6 py-24 mx-auto md:px-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.35em] uppercase text-white/40"
          >
            About
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 text-4xl font-semibold text-white md:text-6xl"
          >
            A studio built around
            <br className="hidden md:block" /> one idea at a time
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-xl mx-auto mt-6 text-white/50"
          >
            DOMÉ is a small studio for interfaces that feel like spaces —
            built with the same care for light, depth, and motion as the
            physical rooms they're named after.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="relative z-10 max-w-3xl px-6 mx-auto md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="pb-16 border-b border-white/10"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-white/40">
            The idea
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/60">
            Most sites are laid out like documents — stacked, flat, read
            top to bottom. We started DOMÉ to build the opposite: pages
            that behave like rooms you walk into, where depth, light, and
            a little bit of motion do as much storytelling as the copy.
            The name comes from the dome — a structure defined by the
            space it encloses, not just the material it's made of.
          </p>
        </motion.div>
      </section>

      {/* Pillars */}
      <section className="relative z-10 max-w-5xl px-6 py-20 mx-auto md:px-10">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-xs tracking-[0.3em] uppercase text-white/40"
        >
          How we work
        </motion.p>

        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="p-6 transition-colors border rounded-2xl border-blue-400/10 bg-white/[0.02] hover:bg-blue-500/[0.05] hover:border-blue-400/30"
            >
              <h3 className="text-lg font-medium text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                {p.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <section className="relative z-10 max-w-5xl px-6 pb-24 mx-auto md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pt-8 border-t border-white/10"
        >
          <p className="text-sm text-white/40">
            Curious what's under the hood? See the{" "}
            <span className="text-blue-400">Resources</span> page for the
            full stack.
          </p>
        </motion.div>
      </section>
    </div>
  );
}