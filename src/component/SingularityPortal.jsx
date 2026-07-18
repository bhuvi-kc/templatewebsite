import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const PARTICLE_COUNT = 45;
const lerp = (a, b, t) => a + (b - a) * t;

const SingularityPortal = ({ onPull, threshold = 160 }) => {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);
  const lastTimeRef = useRef(0);

  const mouseTarget = useRef({ x: 0, y: 0, active: false });
  const dragTarget = useRef({ y: 0, active: false });

  const mouseSmooth = useRef({ x: 0, y: 0 });
  const dragSmooth = useRef({ y: 0 });
  const pullSmooth = useRef(0);

  const gradientCacheRef = useRef({ key: null, gradient: null });
  const sizeRef = useRef({ w: 0, h: 0, cx: 0, cy: 0 });

  const y = useMotionValue(0);
  const [tearProgress, setTearProgress] = useState(0);
  const released = useRef(false);

  const coreScale = useTransform(y, [0, threshold * 1.5], [1, 0.3]);
  const coreOpacity = useTransform(y, [0, threshold * 1.4], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    const resize = () => {
      const rect = wrapRef.current.getBoundingClientRect();
      sizeRef.current = {
        w: rect.width,
        h: rect.height,
        cx: rect.width / 2,
        cy: rect.height / 2,
      };
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gradientCacheRef.current.key = null;
    };
    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
      const ring = i % 3;
      const radius = 50 + ring * 26 + Math.random() * 14;
      const angle = Math.random() * Math.PI * 2;
      return {
        angle,
        baseRadius: radius,
        speed: (0.004 + Math.random() * 0.006) * (ring % 2 === 0 ? 1 : -1),
        size: 1 + Math.random() * 2.2,
        hueShift: Math.random(),
        wobble: Math.random() * Math.PI * 2,
        px: sizeRef.current.cx,
        py: sizeRef.current.cy,
      };
    });

    const getCoreGradient = (coreCx, coreCy, coreR, pullStrength) => {
      const bucket = Math.round(coreR);
      const pBucket = Math.round(pullStrength * 20);
      const key = `${bucket}-${pBucket}-${Math.round(coreCx)}-${Math.round(coreCy)}`;
      if (gradientCacheRef.current.key === key) {
        return gradientCacheRef.current.gradient;
      }
      const grad = ctx.createRadialGradient(coreCx, coreCy, 0, coreCx, coreCy, coreR * 3.2);
      grad.addColorStop(0, `rgba(190,180,255,${0.9 - pullStrength * 0.5})`);
      grad.addColorStop(0.3, `rgba(120,90,255,${0.5 - pullStrength * 0.3})`);
      grad.addColorStop(1, "rgba(80,50,200,0)");
      gradientCacheRef.current = { key, gradient: grad };
      return grad;
    };

    const MIN_FRAME_MS = 1000 / 50;
    let acc = 0;

    const draw = (now) => {
      rafRef.current = requestAnimationFrame(draw);

      const rawDt = lastTimeRef.current ? now - lastTimeRef.current : 16;
      lastTimeRef.current = now;
      acc += rawDt;
      if (acc < MIN_FRAME_MS) return;
      const dt = Math.min(48, acc);
      acc = 0;
      const dtScale = dt / 16.67;

      const { w, h, cx, cy } = sizeRef.current;

      ctx.fillStyle = "rgba(8,8,8,0.35)";
      ctx.fillRect(0, 0, w, h);

      const mt = mouseTarget.current;
      const dt_ = dragTarget.current;
      const smoothing = 1 - Math.pow(0.001, dtScale);

      mouseSmooth.current.x = lerp(mouseSmooth.current.x, mt.x, smoothing);
      mouseSmooth.current.y = lerp(mouseSmooth.current.y, mt.y, smoothing);
      dragSmooth.current.y = lerp(dragSmooth.current.y, dt_.active ? dt_.y : 0, smoothing);

      const pullStrengthTarget = Math.min(1, Math.max(0, dragSmooth.current.y) / (threshold * 1.5));
      pullSmooth.current = lerp(pullSmooth.current, pullStrengthTarget, smoothing);
      const pullStrength = pullSmooth.current;

      const coreCx = cx;
      const coreCy = cy + dragSmooth.current.y * 0.9;
      const coreR = 34 * (1 - pullStrength * 0.6) + Math.sin(now * 0.003) * 2;

      ctx.fillStyle = getCoreGradient(coreCx, coreCy, coreR, pullStrength);
      ctx.beginPath();
      ctx.arc(coreCx, coreCy, coreR * 3.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${0.85 - pullStrength * 0.4})`;
      ctx.arc(coreCx, coreCy, coreR * 0.4, 0, Math.PI * 2);
      ctx.fill();

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.speed * (1 + pullStrength * 2) * dtScale;
        const wobble = Math.sin(now * 0.0016 + p.wobble) * 4;
        const r = p.baseRadius + wobble;

        let tx = cx + Math.cos(p.angle) * r;
        let ty = cy + Math.sin(p.angle) * r * 0.55;

        if (mt.active && pullStrength < 0.05) {
          const dx = mouseSmooth.current.x - tx;
          const dy = mouseSmooth.current.y - ty;
          const dist = Math.hypot(dx, dy) || 1;
          const force = Math.min(18, 400 / dist);
          tx += (dx / dist) * force * 0.15;
          ty += (dy / dist) * force * 0.15;
        }

        if (dt_.active) {
          const dx = coreCx - tx;
          const dy = coreCy - ty;
          tx += dx * pullStrength * 0.25;
          ty += dy * pullStrength * 0.25;
        }

        p.px = lerp(p.px, tx, 0.18 * dtScale);
        p.py = lerp(p.py, ty, 0.18 * dtScale);

        const alpha = 0.35 + Math.sin(now * 0.002 + p.wobble) * 0.15;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${200 + p.hueShift * 40},${190 + p.hueShift * 30},255,${alpha})`;
        ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current;
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [threshold]);

  const handlePointerMove = useCallback((e) => {
    const rect = wrapRef.current.getBoundingClientRect();
    mouseTarget.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  }, []);

  const handlePointerLeave = useCallback(() => {
    mouseTarget.current.active = false;
  }, []);

  const handleDrag = (_, info) => {
    const distance = Math.max(0, info.offset.y);
    dragTarget.current = { y: distance, active: true };
    setTearProgress(Math.min(1, distance / (threshold * 1.5)));
    if (onPull) onPull((distance / threshold) * 3);
  };

  const handleDragStart = () => {
    dragTarget.current.active = true;
  };

  const handleDragEnd = (_, info) => {
    const distance = Math.max(0, info.offset.y);
    if (distance > threshold) {
      released.current = true;
      animate(y, distance + 500, { duration: 0.45, ease: [0.4, 0, 1, 1] });
    } else {
      animate(y, 0, { type: "spring", stiffness: 260, damping: 18 });
      dragTarget.current.active = false;
      setTearProgress(0);
      released.current = false;
    }
  };

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: threshold * 2 }}
        dragElastic={0.25}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{ y, scale: coreScale, opacity: coreOpacity }}
        className="absolute left-1/2 top-1/2 w-32 h-32 -ml-16 -mt-16 rounded-full cursor-grab active:cursor-grabbing"
        whileTap={{ scale: 1.05 }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 55%, rgba(190,170,255,0.9), transparent 60%)",
        }}
        animate={{ opacity: tearProgress > 0.85 ? [0, 0.6, 0] : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default SingularityPortal;