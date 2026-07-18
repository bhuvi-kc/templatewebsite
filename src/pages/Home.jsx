import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GravityOrb from "../component/GravityOrb";
import DomeGallery from "../component/DomeGallery";
import FluidTrail from "../component/FluidTrail";
import FluidGlass from "../component/FluidGlass"
import SingularityPortal from "../component/SingularityPortal";
import EventHorizon from "../component/EventHorizon";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const triggered = React.useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const handlePull = (distance) => {
    if (showHint) setShowHint(false);

    if (distance > 2 && !triggered.current) {
      triggered.current = true;
      setOpen(true);
    }
  };

  useEffect(() => {
    const handler = () => {
      triggered.current = false;
      setOpen(false);
      setShowHint(false);
      setTimeout(() => setShowHint(true), 2000);
    };
    window.addEventListener("dome:gohome", handler);
    return () => window.removeEventListener("dome:gohome", handler);
  }, []);

  return (
    <div
      className="h-[calc(100vh-80px)] w-full overflow-hidden relative"
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
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 1 }}
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Fluid trail — sits behind the orb, tracks cursor everywhere */}
      {/* <AnimatePresence>
        {!open && (
          <motion.div
            className="absolute inset-0 z-0"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FluidTrail
              color="#7F00FF"
              mouseRadius={5}
              trailDuration={8}
              fade="outside"
            />
          </motion.div>
        )}
      </AnimatePresence> */}

     <AnimatePresence>
  {!open && (
    <motion.div
      className="absolute inset-x-0 top-0 bottom-0 z-10"
      exit={{
        opacity: 0,
        scale: 0.85,
        filter: "blur(8px)",
      }}
      transition={{
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <EventHorizon onPull={handlePull} threshold={160} />
    </motion.div>
  )}
</AnimatePresence>

      {/* Pull hint */}
      <AnimatePresence>
        {showHint && !open && (
          <motion.div
            className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-2 z-10 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/30 text-xs tracking-[0.25em] uppercase">
              pull down to open
            </p>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2v10M4 9l4 4 4-4"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0 }}
            animate={{ clipPath: "circle(150% at 50% 50%)", opacity: 1 }}
            transition={{
              clipPath: { duration: 1, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.4 },
            }}
          >
            <DomeGallery
              fit={0.8}
              minRadius={600}
              maxVerticalRotationDeg={0}
              segments={34}
              dragDampening={2}
              autoRotate
              autoRotateSpeed={0.03}
              grayscale
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;