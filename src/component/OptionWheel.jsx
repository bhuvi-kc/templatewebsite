import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function OptionWheel({
  items = [],
  defaultSelected = 0,
  onChange,
  className = "",
}) {
  const [selected, setSelected] = useState(defaultSelected);

  const select = (index) => {
    if (index < 0 || index >= items.length) return;

    setSelected(index);
    onChange?.(index, items[index]);
  };

  const handleWheel = (e) => {
    e.preventDefault();

    if (e.deltaY > 0) {
      select(Math.min(selected + 1, items.length - 1));
    } else {
      select(Math.max(selected - 1, 0));
    }
  };

  return (
    <div
      onWheel={handleWheel}
      className={`relative h-full overflow-hidden ${className}`}
    >
      <AnimatePresence initial={false}>
        {items.map((item, index) => {
          const offset = index - selected;

          if (Math.abs(offset) > 4) return null;

          return (
            <motion.div
              key={item}
              initial={false}
              animate={{
                y: offset * 55,
                x: Math.abs(offset) * 12,
                opacity: 1 - Math.abs(offset) * 0.22,
                scale: offset === 0 ? 1 : 0.92,
                rotate: offset * 4,
                filter: `blur(${Math.abs(offset) * 1.5}px)`,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 24,
              }}
              className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 cursor-pointer select-none"
              onClick={() => select(index)}
            >
              <span
                className={`transition-all ${
                  offset === 0
                    ? "text-white text-2xl font-semibold"
                    : "text-white/40 text-lg"
                }`}
              >
                {item}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}