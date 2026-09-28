import { createContext, useContext, useState, useEffect } from "react";
import { sounds } from "../utils/audio";

const InteractiveContext = createContext(null);

export const FLUID_THEMES = [
  { id: "cyan", name: "Electric Cyan", color: "#00f0ff", glow: "rgba(0,240,255,0.4)" },
  { id: "violet", name: "Neon Violet", color: "#a855f7", glow: "rgba(168,85,247,0.4)" },
  { id: "emerald", name: "Emerald Matrix", color: "#10b981", glow: "rgba(16,185,129,0.4)" },
  { id: "amber", name: "Solar Amber", color: "#f59e0b", glow: "rgba(245,158,11,0.4)" },
  { id: "silver", name: "Quicksilver", color: "#e2e8f0", glow: "rgba(226,232,240,0.4)" },
];

export function InteractiveProvider({ children }) {
  const [fluidEnabled, setFluidEnabled] = useState(() => {
    return localStorage.getItem("dome_fluid_enabled") !== "false";
  });
  const [currentThemeIndex, setCurrentThemeIndex] = useState(() => {
    const saved = localStorage.getItem("dome_fluid_theme");
    const idx = FLUID_THEMES.findIndex((t) => t.id === saved);
    return idx >= 0 ? idx : 0;
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem("dome_sound_enabled") === "true";
  });
  const [interactionCount, setInteractionCount] = useState(0);

  const activeTheme = FLUID_THEMES[currentThemeIndex];

  useEffect(() => {
    sounds.muted = !soundEnabled;
    localStorage.setItem("dome_sound_enabled", String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem("dome_fluid_enabled", String(fluidEnabled));
  }, [fluidEnabled]);

  useEffect(() => {
    localStorage.setItem("dome_fluid_theme", activeTheme.id);
  }, [activeTheme]);

  const toggleFluid = () => {
    sounds.playSwitch();
    setFluidEnabled((prev) => !prev);
  };

  const cycleTheme = () => {
    sounds.playClick();
    setCurrentThemeIndex((prev) => (prev + 1) % FLUID_THEMES.length);
  };

  const setThemeById = (id) => {
    sounds.playClick();
    const idx = FLUID_THEMES.findIndex((t) => t.id === id);
    if (idx >= 0) setCurrentThemeIndex(idx);
  };

  const toggleSound = () => {
    sounds.playSwitch();
    setSoundEnabled((prev) => !prev);
  };

  const recordInteraction = () => {
    setInteractionCount((prev) => prev + 1);
  };

  return (
    <InteractiveContext.Provider
      value={{
        fluidEnabled,
        toggleFluid,
        activeTheme,
        currentThemeIndex,
        cycleTheme,
        setThemeById,
        soundEnabled,
        toggleSound,
        interactionCount,
        recordInteraction,
        themes: FLUID_THEMES,
      }}
    >
      {children}
    </InteractiveContext.Provider>
  );
}

export function useInteractive() {
  const ctx = useContext(InteractiveContext);
  if (!ctx) {
    throw new Error("useInteractive must be used within an InteractiveProvider");
  }
  return ctx;
}
