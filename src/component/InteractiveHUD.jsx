import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Droplets, Volume2, VolumeX, Palette, Sliders, ChevronUp, ChevronDown } from "lucide-react";
import { useInteractive } from "../context/InteractiveContext";
import { sounds } from "../utils/audio";

export default function InteractiveHUD() {
  const {
    fluidEnabled,
    toggleFluid,
    activeTheme,
    cycleTheme,
    setThemeById,
    soundEnabled,
    toggleSound,
    themes,
  } = useInteractive();

  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto select-none font-sans">
      <div className="flex flex-col items-end gap-2">
        {/* Expanded Panel */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="p-4 rounded-2xl bg-[#0e0e12]/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white w-64 mb-1"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70 flex items-center gap-1.5">
                  <Sliders size={13} className="text-blue-400" />
                  Sensory Controls
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">
                  LIVE
                </span>
              </div>

              {/* Fluid Trail Toggle */}
              <div className="flex items-center justify-between mt-3 text-xs">
                <span className="text-white/80 flex items-center gap-2">
                  <Droplets size={14} style={{ color: activeTheme.color }} />
                  Fluid Cursor Trail
                </span>
                <button
                  onClick={toggleFluid}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                    fluidEnabled ? "bg-blue-600" : "bg-white/20"
                  }`}
                  aria-label="Toggle fluid trail"
                >
                  <motion.div
                    layout
                    className="w-4 h-4 rounded-full bg-white shadow-md"
                    style={{ float: fluidEnabled ? "right" : "left" }}
                  />
                </button>
              </div>

              {/* Theme Color Selector */}
              <div className="mt-3.5 pt-3 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-white/50 tracking-wider uppercase flex items-center gap-1">
                    <Palette size={11} /> Fluid Aura
                  </span>
                  <span className="text-[11px] font-mono text-white/70">{activeTheme.name}</span>
                </div>
                <div className="flex items-center justify-between gap-1.5 pt-1">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setThemeById(t.id)}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                        t.id === activeTheme.id
                          ? "border-white scale-110 shadow-lg"
                          : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                      }`}
                      style={{
                        backgroundColor: t.color,
                        boxShadow: t.id === activeTheme.id ? `0 0 14px ${t.glow}` : "none",
                      }}
                      title={t.name}
                      aria-label={`Select ${t.name}`}
                    />
                  ))}
                </div>
              </div>

              {/* Sound Synthesizer */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-xs">
                <span className="text-white/80 flex items-center gap-2">
                  {soundEnabled ? <Volume2 size={14} className="text-emerald-400" /> : <VolumeX size={14} className="text-white/40" />}
                  Haptic Audio FX
                </span>
                <button
                  onClick={toggleSound}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                    soundEnabled ? "bg-emerald-600" : "bg-white/20"
                  }`}
                  aria-label="Toggle sound effects"
                >
                  <motion.div
                    layout
                    className="w-4 h-4 rounded-full bg-white shadow-md"
                    style={{ float: soundEnabled ? "right" : "left" }}
                  />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Trigger Pill */}
        <div className="flex items-center gap-2 bg-[#0d0d12]/80 hover:bg-[#0d0d12]/95 backdrop-blur-xl border border-white/10 hover:border-white/20 p-1.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all">
          <button
            onClick={() => {
              sounds.playClick();
              cycleTheme();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer relative group"
            style={{ backgroundColor: activeTheme.color }}
            title="Cycle theme aura (Click to cycle)"
            aria-label="Cycle theme aura"
          >
            <Sparkles size={14} className="text-black drop-shadow" />
            <span className="absolute -top-8 right-0 bg-black/80 px-2 py-1 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {activeTheme.name}
            </span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              toggleSound();
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
              soundEnabled
                ? "bg-white/10 border-white/30 text-white"
                : "bg-transparent border-white/5 text-white/40 hover:text-white"
            }`}
            title={soundEnabled ? "Audio On" : "Audio Muted"}
            aria-label="Toggle audio"
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setExpanded(!expanded);
            }}
            className="flex items-center gap-1.5 px-3 py-1 text-xs text-white/80 hover:text-white rounded-full bg-white/[0.04] hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label="Open interaction settings"
          >
            <span className="text-[11px] uppercase tracking-wider font-medium">FX Hub</span>
            {expanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}
