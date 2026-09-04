import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import Spline from "@splinetool/react-spline";

const Home = () => {
  const [splineLoaded, setSplineLoaded] = useState(false);

  useEffect(() => {
    const handleGoHome = () => {
      // scroll to top or trigger subtle reset if needed
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("dome:gohome", handleGoHome);
    return () => window.removeEventListener("dome:gohome", handleGoHome);
  }, []);

  return (
    <div
      className="h-[calc(100vh-80px)] w-full overflow-hidden relative select-none"
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

      {/* Radial glow for rich atmosphere */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(99,102,241,0.12) 0%, rgba(59,130,246,0.04) 45%, transparent 75%)",
        }}
      />

      {/* Loading state indicator while 3D scene compiles */}
      {!splineLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <div className="w-8 h-8 rounded-full border-2 border-blue-500/30 border-t-blue-400 animate-spin" />
          <span className="mt-3 text-[11px] uppercase tracking-[0.3em] text-white/30">
            Initializing Scene
          </span>
        </div>
      )}

      {/* Interactive Spline 3D Scene */}
      <motion.div
        className="absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: splineLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <Spline
          scene="https://prod.spline.design/AvASsGF3AgNhRjuM/scene.splinecode"
          onLoad={() => setSplineLoaded(true)}
        />
      </motion.div>

      {/* Ambient Floating Studio Brand & Hero Tagline Overlay (pointer-events-none on parent, buttons clickable) */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-12">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#080808]/70 backdrop-blur-md text-[11px] tracking-[0.2em] uppercase text-white/70 shadow-lg shadow-black/40"
        >
          <Sparkles size={12} className="text-blue-400" />
          <span>Interactive 3D Space</span>
        </motion.div>

        {/* Bottom Hero Narrative & Quick CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
        >
          <div className="max-w-md bg-[#080808]/60 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-4 md:p-0 rounded-2xl border border-white/5 md:border-none">
            <h1 className="text-2xl md:text-3xl font-light tracking-wide text-white">
              Spatial Interfaces &amp; Design
            </h1>
            <p className="mt-2 text-xs md:text-sm text-white/50 leading-relaxed">
              Drag, rotate, and interact with the scene. Designed for tactile spatial experiences.
            </p>
          </div>

          <div className="flex items-center gap-3 pointer-events-auto">
            <Link
              to="/gallery"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs md:text-sm font-medium tracking-wider uppercase transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Gallery</span>
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/template-kit"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-white/30 text-white/80 hover:text-white text-xs md:text-sm font-medium tracking-wider uppercase backdrop-blur-md transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Kit &amp; Docs
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
