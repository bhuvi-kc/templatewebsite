import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Layers,
  CircleDot,
  Waves,
  Zap,
  Sliders,
  RotateCcw,
  Compass,
} from "lucide-react";
import Spline from "@splinetool/react-spline";
import Orb from "../component/Orb";
import LiquidChrome from "../component/LiquidChrome";
import LaserFlow from "../component/LaserFlow";
import { sounds } from "../utils/audio";
import { useInteractive } from "../context/InteractiveContext";

const HERO_MODES = [
  { id: "spline", name: "Spline 3D", icon: Layers, desc: "Spatial 3D Model" },
  { id: "orb", name: "Quantum Orb", icon: CircleDot, desc: "OGL Dynamic Shader Orb" },
  { id: "chrome", name: "Liquid Chrome", icon: Waves, desc: "Kinetic Metallic Fluid" },
  { id: "laser", name: "Laser Flow", icon: Zap, desc: "Volumetric Beam Field" },
];

const Home = () => {
  const [activeMode, setActiveMode] = useState("spline");
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const { recordInteraction, activeTheme } = useInteractive();

  // Interactive Scene Parameters
  const [orbHue, setOrbHue] = useState(210);
  const [orbIntensity, setOrbIntensity] = useState(0.35);
  const [chromeSpeed, setChromeSpeed] = useState(0.2);
  const [chromeAmplitude, setChromeAmplitude] = useState(0.5);

  useEffect(() => {
    const handleGoHome = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("dome:gohome", handleGoHome);
    return () => window.removeEventListener("dome:gohome", handleGoHome);
  }, []);

  const handleModeChange = (modeId) => {
    sounds.playSwitch();
    recordInteraction();
    setActiveMode(modeId);
  };

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
        className="absolute inset-0 z-0 pointer-events-none transition-colors duration-700"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 55%, ${activeTheme.glow} 0%, rgba(59,130,246,0.04) 45%, transparent 75%)`,
        }}
      />

      {/* ========================================================= */}
      {/* 3D / SHADER INTERACTIVE SCENE LAYERS                     */}
      {/* ========================================================= */}

      {/* Mode 1: Spline 3D Scene */}
      {activeMode === "spline" && (
        <>
          {!splineLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
              <div className="w-8 h-8 rounded-full border-2 border-blue-500/30 border-t-blue-400 animate-spin" />
              <span className="mt-3 text-[11px] uppercase tracking-[0.3em] text-white/30">
                Initializing Spatial Scene...
              </span>
            </div>
          )}
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
        </>
      )}

      {/* Mode 2: Quantum Orb (OGL WebGL Shader) */}
      {activeMode === "orb" && (
        <motion.div
          key="orb-scene"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-10 flex items-center justify-center cursor-grab active:cursor-grabbing"
          onClick={() => recordInteraction()}
        >
          <div className="w-full h-full max-w-4xl max-h-[750px]">
            <Orb
              hue={orbHue}
              hoverIntensity={orbIntensity}
              rotateOnHover={true}
              forceHoverState={false}
              backgroundColor="#080808"
            />
          </div>
        </motion.div>
      )}

      {/* Mode 3: Liquid Chrome Shader */}
      {activeMode === "chrome" && (
        <motion.div
          key="chrome-scene"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-10 cursor-crosshair"
          onClick={() => recordInteraction()}
        >
          <LiquidChrome
            baseColor={[0.12, 0.15, 0.28]}
            speed={chromeSpeed}
            amplitude={chromeAmplitude}
            frequencyX={3}
            frequencyY={2}
            interactive={true}
          />
        </motion.div>
      )}

      {/* Mode 4: Laser Flow Shader */}
      {activeMode === "laser" && (
        <motion.div
          key="laser-scene"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-10"
          onClick={() => recordInteraction()}
        >
          <LaserFlow
            color={activeTheme.color}
            wispDensity={1.2}
            flowSpeed={0.4}
            horizontalBeamOffset={0.0}
            verticalBeamOffset={-0.1}
          />
        </motion.div>
      )}

      {/* ========================================================= */}
      {/* INTERACTIVE UI CONTROLS & HUD OVERLAYS                    */}
      {/* ========================================================= */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-10">
        {/* Top Bar with Mode Switcher & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          {/* Active scene badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#080808]/80 backdrop-blur-md text-[11px] tracking-[0.2em] uppercase text-white/70 shadow-lg shadow-black/40"
          >
            <Sparkles size={12} className="text-blue-400 animate-pulse" />
            <span>Interactive 3D Engine:</span>
            <span className="font-semibold text-white">
              {HERO_MODES.find((m) => m.id === activeMode)?.name}
            </span>
          </motion.div>

          {/* Interactive Scene Mode Pills */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-1.5 p-1 rounded-full bg-[#0e0e14]/80 backdrop-blur-xl border border-white/10 shadow-lg"
          >
            {HERO_MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => handleModeChange(mode.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-100"
                      : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                  }`}
                  title={mode.desc}
                  aria-label={`Switch to ${mode.name}`}
                >
                  <Icon size={13} />
                  <span className="hidden sm:inline">{mode.name}</span>
                </button>
              );
            })}

            {/* Quick parameter drawer toggle */}
            <button
              onClick={() => {
                sounds.playClick();
                setShowControls(!showControls);
              }}
              className={`p-1.5 rounded-full border transition-all cursor-pointer ml-1 ${
                showControls
                  ? "bg-white/15 border-white/30 text-white"
                  : "bg-transparent border-transparent text-white/40 hover:text-white"
              }`}
              title="Toggle interactive parameter controls"
              aria-label="Toggle interactive controls"
            >
              <Sliders size={13} />
            </button>
          </motion.div>
        </div>

        {/* Floating Parameter Controls Drawer */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto self-start mt-3 p-4 rounded-2xl bg-[#0d0d14]/90 backdrop-blur-xl border border-white/10 text-white w-72 shadow-2xl space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Live Shader Tweaks
                </span>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setOrbHue(210);
                    setOrbIntensity(0.35);
                    setChromeSpeed(0.2);
                    setChromeAmplitude(0.5);
                  }}
                  className="text-white/40 hover:text-white transition-colors cursor-pointer"
                  title="Reset parameters"
                >
                  <RotateCcw size={12} />
                </button>
              </div>

              {activeMode === "orb" && (
                <>
                  <div>
                    <div className="flex justify-between text-[11px] text-white/60 mb-1">
                      <span>Orb Hue Shift</span>
                      <span className="font-mono text-blue-400">{orbHue}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={orbHue}
                      onChange={(e) => setOrbHue(Number(e.target.value))}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-white/60 mb-1">
                      <span>Hover Energy</span>
                      <span className="font-mono text-blue-400">
                        {Math.round(orbIntensity * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={orbIntensity}
                      onChange={(e) => setOrbIntensity(Number(e.target.value))}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </>
              )}

              {activeMode === "chrome" && (
                <>
                  <div>
                    <div className="flex justify-between text-[11px] text-white/60 mb-1">
                      <span>Fluidity Speed</span>
                      <span className="font-mono text-blue-400">{chromeSpeed.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="0.8"
                      step="0.05"
                      value={chromeSpeed}
                      onChange={(e) => setChromeSpeed(Number(e.target.value))}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-white/60 mb-1">
                      <span>Wave Ripple Amplitude</span>
                      <span className="font-mono text-blue-400">{chromeAmplitude.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.2"
                      step="0.1"
                      value={chromeAmplitude}
                      onChange={(e) => setChromeAmplitude(Number(e.target.value))}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </>
              )}

              {(activeMode === "spline" || activeMode === "laser") && (
                <div className="text-[11px] text-white/50 leading-relaxed py-1">
                  Interact directly with the viewport: click, drag, and move your cursor to explore
                  real-time physics and light reflections.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Hero Narrative & Quick CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pointer-events-auto"
        >
          <div className="max-w-md bg-[#080808]/70 backdrop-blur-md p-4 md:p-5 rounded-2xl border border-white/10 shadow-2xl">
            <h1 className="text-2xl md:text-3xl font-light tracking-wide text-white">
              Spatial Interfaces &amp; Design
            </h1>
            <p className="mt-2 text-xs md:text-sm text-white/60 leading-relaxed">
              Drag, rotate, and manipulate real-time shaders and physics. Use the mode pills above to
              explore live procedural graphics.
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-white/40 tracking-wider">
              <Compass size={12} className="text-blue-400" />
              <span>Interactive Viewport Active</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/gallery"
              onClick={() => sounds.playClick()}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs md:text-sm font-medium tracking-wider uppercase transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore 3D Gallery</span>
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/template-kit"
              onClick={() => sounds.playClick()}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 text-white/80 hover:text-white text-xs md:text-sm font-medium tracking-wider uppercase backdrop-blur-md transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Interactive Kit
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
