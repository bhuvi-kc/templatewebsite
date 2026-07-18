import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

/**
 * Interactive orb the user drags downward to "unlock" the gallery.
 * Mimics a pulled pendant: elastic stretch, glow buildup, snap-release.
 *
 * Props:
 *  - onPull(distance): called continuously while dragging (normalized ~0-3+)
 *  - threshold: drag distance (px) that counts as a successful "pull"
 */
const GravityOrb = ({ onPull, threshold = 160 }) => {
  const y = useMotionValue(0);
  const [dragging, setDragging] = useState(false);
  const released = useRef(false);

  const glow = useTransform(y, [0, threshold], [0.15, 1]);
  const stretch = useTransform(y, [0, threshold * 1.5], [1, 1.6]);
  const ringOpacity = useTransform(y, [0, threshold], [0, 1]);

  const handleDrag = (_, info) => {
    const distance = Math.max(0, info.offset.y);
    if (onPull) onPull((distance / threshold) * 3);
    if (distance > threshold && !released.current) {
      released.current = true;
    }
  };

  const handleDragEnd = (_, info) => {
    setDragging(false);
    const distance = Math.max(0, info.offset.y);
    if (distance > threshold) {
      animate(y, distance + 400, {
        duration: 0.5,
        ease: [0.4, 0, 1, 1],
      });
    } else {
      animate(y, 0, { type: "spring", stiffness: 300, damping: 20 });
      released.current = false;
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Tether line */}
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        width="4"
        height="50%"
        style={{ overflow: "visible" }}
      >
        <motion.line
          x1="2"
          y1="0"
          x2="2"
          y2="100%"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          style={{ scaleY: stretch, transformOrigin: "top" }}
        />
      </svg>

      {/* Pulsing ring that fills as you pull */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 220,
          height: 220,
          opacity: ringOpacity,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
          y,
        }}
      />

      {/* The orb itself */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: threshold * 2 }}
        dragElastic={0.3}
        onDragStart={() => setDragging(true)}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{ y, scale: stretch }}
        className="relative w-24 h-24 rounded-full cursor-grab active:cursor-grabbing"
        whileTap={{ scale: 1.05 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #6366f1 0%, #1e1b4b 60%, #080808 100%)",
            boxShadow: "0 0 40px rgba(99,102,241,0.4)",
            opacity: glow,
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-white/10"
          animate={{ scale: dragging ? [1, 1.08, 1] : 1 }}
          transition={{ duration: 1.2, repeat: dragging ? Infinity : 0 }}
        />
      </motion.div>
    </div>
  );
};

export default GravityOrb;