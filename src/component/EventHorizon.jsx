import React, { useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

/**
 * A gravitational event horizon the user drags down to collapse into the gallery.
 * All ambient motion (ring rotation, orbiting motes, pulsing) runs on CSS
 * keyframe animations — compositor-accelerated, zero per-frame JS cost.
 * Only the drag gesture itself is driven by framer-motion.
 *
 * Props:
 *  - onPull(distance): normalized ~0-3+, same contract as before
 *  - threshold: px drag distance considered a full "collapse"
 */
const EventHorizon = ({ onPull, threshold = 160 }) => {
  const y = useMotionValue(0);
  const [dragging, setDragging] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const scale = useTransform(y, [0, threshold * 1.4], [1, 0.15]);
  const stretch = useTransform(y, [0, threshold], [1, 1.35]);
  const glowOpacity = useTransform(y, [0, threshold], [0.5, 1]);
  const flashOpacity = useTransform(y, [threshold * 0.7, threshold * 1.3], [0, 0.85]);
  const ringPull = useTransform(y, [0, threshold * 1.4], [0, 60]);

  const handleDrag = (_, info) => {
    const distance = Math.max(0, info.offset.y);
    if (onPull) onPull((distance / threshold) * 3);
  };

  const handleDragStart = () => setDragging(true);

  const handleDragEnd = (_, info) => {
    setDragging(false);
    const distance = Math.max(0, info.offset.y);
    if (distance > threshold) {
      setCollapsed(true);
      animate(y, distance + 400, { duration: 0.4, ease: [0.6, 0, 1, 1] });
    } else {
      animate(y, 0, { type: "spring", stiffness: 280, damping: 22 });
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* SVG goo filter so motes visually merge into the core as they get close */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="eh-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Full-bleed flash on collapse */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          opacity: flashOpacity,
          background:
            "radial-gradient(circle at 50% 55%, rgba(210,200,255,0.95), transparent 65%)",
        }}
      />

      {/* Ambient outer glow — CSS-only pulse, no JS */}
      <motion.div
        className="absolute rounded-full pointer-events-none eh-pulse"
        style={{
          width: 340,
          height: 340,
          opacity: glowOpacity,
          y: ringPull,
          background:
            "radial-gradient(circle, rgba(99,90,255,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Goo group: orbiting motes + core, merged via filter */}
      <div
        className="absolute"
        style={{ filter: "url(#eh-goo)", width: 260, height: 260 }}
      >
        {/* Orbiting motes — pure CSS animation, GPU composited */}
        <div className="eh-orbit eh-orbit-1">
          <div className="eh-mote" />
        </div>
        <div className="eh-orbit eh-orbit-2">
          <div className="eh-mote" />
        </div>
        <div className="eh-orbit eh-orbit-3">
          <div className="eh-mote" />
        </div>
        <div className="eh-orbit eh-orbit-4">
          <div className="eh-mote" />
        </div>
        <div className="eh-orbit eh-orbit-5">
          <div className="eh-mote" />
        </div>
        <div className="eh-orbit eh-orbit-6">
          <div className="eh-mote" />
        </div>

        {/* Rotating accretion ring */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center eh-ring-spin"
          style={{ scale: stretch }}
        >
          <div className="eh-ring" />
        </motion.div>

        {/* Draggable core */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: threshold * 2 }}
          dragElastic={0.28}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{ y, scale }}
          className="absolute inset-0 m-auto w-16 h-16 rounded-full cursor-grab active:cursor-grabbing eh-core"
          whileTap={{ scale: 1.08 }}
        />
      </div>

      <style>{`
        .eh-core {
          background: radial-gradient(circle at 35% 30%, #ffffff 0%, #a78bfa 35%, #4c1d95 75%, #0a0612 100%);
          box-shadow: 0 0 50px rgba(139,92,246,0.55), 0 0 100px rgba(139,92,246,0.25);
        }

        .eh-ring {
          width: 220px;
          height: 220px;
          border-radius: 9999px;
          border: 2px solid transparent;
          border-top-color: rgba(196,181,253,0.55);
          border-right-color: rgba(139,92,246,0.35);
          box-shadow: 0 0 24px rgba(139,92,246,0.25) inset;
        }

        .eh-ring-spin {
          animation: eh-spin 9s linear infinite;
          will-change: transform;
        }

        .eh-pulse {
          animation: eh-breathe 3.2s ease-in-out infinite;
          will-change: opacity, transform;
        }

        .eh-orbit {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 4px;
          height: 4px;
          will-change: transform;
        }
        .eh-mote {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 9999px;
          background: radial-gradient(circle, #e9e4ff 0%, #a78bfa 70%, transparent 100%);
          box-shadow: 0 0 8px rgba(167,139,250,0.8);
        }

        /* Each orbit ring: rotate the container (GPU), offset the mote outward with translate */
        .eh-orbit-1 { animation: eh-orbit-spin 6s linear infinite; }
        .eh-orbit-1 .eh-mote { transform: translate(70px, 0); }

        .eh-orbit-2 { animation: eh-orbit-spin 8s linear infinite reverse; }
        .eh-orbit-2 .eh-mote { transform: translate(95px, 0); }

        .eh-orbit-3 { animation: eh-orbit-spin 5s linear infinite; animation-delay: -2s; }
        .eh-orbit-3 .eh-mote { transform: translate(60px, 0); }

        .eh-orbit-4 { animation: eh-orbit-spin 10s linear infinite reverse; }
        .eh-orbit-4 .eh-mote { transform: translate(110px, 0); }

        .eh-orbit-5 { animation: eh-orbit-spin 7s linear infinite; animation-delay: -4s; }
        .eh-orbit-5 .eh-mote { transform: translate(82px, 0); }

        .eh-orbit-6 { animation: eh-orbit-spin 9s linear infinite reverse; animation-delay: -1s; }
        .eh-orbit-6 .eh-mote { transform: translate(102px, 0); }

        @keyframes eh-orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes eh-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes eh-breathe {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.65; transform: scale(1.08); }
        }

        @media (prefers-reduced-motion: reduce) {
          .eh-ring-spin, .eh-pulse, .eh-orbit-1, .eh-orbit-2, .eh-orbit-3, .eh-orbit-4, .eh-orbit-5, .eh-orbit-6 {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default EventHorizon;