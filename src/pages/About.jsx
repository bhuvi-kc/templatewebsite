import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Compass, Eye, ShieldCheck, Activity, RotateCw, Layers } from "lucide-react";
import { sounds } from "../utils/audio";
import { useInteractive } from "../context/InteractiveContext";

const RING_CONFIG = [
  { size: 420, rotateX: 75, rotateY: 0, duration: 26, opacity: 0.5 },
  { size: 420, rotateX: 75, rotateY: 60, duration: 34, opacity: 0.35 },
  { size: 420, rotateX: 75, rotateY: 120, duration: 40, opacity: 0.28 },
  { size: 340, rotateX: 20, rotateY: 30, duration: 22, opacity: 0.4 },
  { size: 260, rotateX: 10, rotateY: 90, duration: 18, opacity: 0.3 },
];

const InteractiveDomeSphere = ({ speedMultiplier = 1 }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 15 });

  const rotX = useTransform(springY, [-300, 300], [25, -25]);
  const rotY = useTransform(springX, [-300, 300], [-35, 35]);

  const handlePointerMove = (e) => {
    const { clientX, clientY } = e;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX.set(clientX - cx);
    mouseY.set(clientY - cy);
  };

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      style={{
        perspective: "1400px",
        rotateX: rotX,
        rotateY: rotY,
      }}
    >
      {/* Soft core glow behind the rings */}
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
              duration: ring.duration / speedMultiplier,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Orbiting nodes */}
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
              duration: (20 + i * 4) / speedMultiplier,
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
    </motion.div>
  );
};

const pillars = [
  {
    title: "Craft",
    icon: Sparkles,
    detail:
      "Every interaction is considered down to the easing curve. We'd rather ship less and have it feel right than pad a page with motion that doesn't earn its place.",
  },
  {
    title: "Depth",
    icon: Compass,
    detail:
      "Flat interfaces are easy to build and easy to forget. We reach for layered light, grain, and 3D space to give screens a sense of physical presence.",
  },
  {
    title: "Clarity",
    icon: Eye,
    detail:
      "Underneath the atmosphere is a plain, legible structure. Navigation, hierarchy, and copy are kept honest so the experience never gets in its own way.",
  },
  {
    title: "Restraint",
    icon: ShieldCheck,
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
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const { recordInteraction, interactionCount, activeTheme } = useInteractive();

  const handlePulse = () => {
    sounds.playSwitch();
    recordInteraction();
    setSpeedMultiplier(3.5);
    setTimeout(() => setSpeedMultiplier(1), 2500);
  };

  return (
    <div
      className="w-full relative overflow-hidden select-none"
      style={{ background: "#000000" }}
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

      {/* Hero with interactive DomeSphere */}
      <section className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center">
        <InteractiveDomeSphere speedMultiplier={speedMultiplier} />

        <div className="relative z-10 max-w-5xl px-6 py-24 mx-auto md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#080808]/70 backdrop-blur-md text-[11px] tracking-[0.25em] uppercase text-white/60 mb-3"
          >
            <span>Kinetic Studio Profile</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 text-4xl font-semibold text-white md:text-6xl tracking-tight"
          >
            A studio built around
            <br className="hidden md:block" /> one idea at a time
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-xl mx-auto mt-6 text-white/60 leading-relaxed text-sm md:text-base"
          >
            DOMÉ is a studio for spatial web interfaces — built with the same care for light,
            depth, and kinetics as physical architecture.
          </motion.p>

          {/* Interactive Dome trigger */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={handlePulse}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/30 text-white text-xs tracking-wider uppercase backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <RotateCw size={13} className={speedMultiplier > 1 ? "animate-spin" : ""} />
              <span>{speedMultiplier > 1 ? "Hyper-Speed Active" : "Trigger Orbital Acceleration"}</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Live Telemetry Strip */}
      <section className="relative z-10 max-w-5xl px-6 mx-auto md:px-10 -mt-10 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
          <div className="text-center p-2">
            <span className="text-[10px] tracking-widest uppercase text-white/40 block">Renderer</span>
            <span className="text-base font-semibold text-white font-mono mt-0.5 block">60 FPS GPU</span>
          </div>
          <div className="text-center p-2">
            <span className="text-[10px] tracking-widest uppercase text-white/40 block">Parallax Dome</span>
            <span className="text-base font-semibold text-blue-400 font-mono mt-0.5 block">Active 3D</span>
          </div>
          <div className="text-center p-2">
            <span className="text-[10px] tracking-widest uppercase text-white/40 block">Aura Hue</span>
            <span className="text-base font-semibold text-white font-mono mt-0.5 block" style={{ color: activeTheme.color }}>
              {activeTheme.name}
            </span>
          </div>
          <div className="text-center p-2">
            <span className="text-[10px] tracking-widest uppercase text-white/40 block">Total Gestures</span>
            <span className="text-base font-semibold text-emerald-400 font-mono mt-0.5 block">
              {interactionCount} Events
            </span>
          </div>
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
            The Philosophy
          </p>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-white/60">
            Most sites are laid out like documents — stacked, flat, read top to bottom. We started
            DOMÉ to build the opposite: pages that behave like tactile spaces you walk into, where
            depth, fluid light, and responsive physics do as much storytelling as the words themselves.
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
          How we build
        </motion.p>

        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                onMouseEnter={() => sounds.playHover()}
                className="p-6 transition-all border rounded-2xl border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-blue-400/40 hover:-translate-y-1 shadow-lg group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={18} />
                </div>
                <h3 className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {p.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer note */}
      <section className="relative z-10 max-w-5xl px-6 pb-24 mx-auto md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-white/40">
            Curious what's under the hood? See the{" "}
            <Link to="/resources" className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-4">
              Resources
            </Link>{" "}
            page for the full stack.
          </p>

          <Link
            to="/contact"
            className="text-xs uppercase tracking-widest text-white/60 hover:text-white px-4 py-2 rounded-full border border-white/15 hover:border-white/30 transition-colors"
          >
            Initiate Conversation &rarr;
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
