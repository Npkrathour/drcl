"use client";

import { motion } from "framer-motion";
import { seeded, cn } from "@/lib/utils";

interface BubbleSpec {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

function makeBubbles(count: number, seed: number): BubbleSpec[] {
  const rand = seeded(seed);
  return Array.from({ length: count }, () => ({
    left: rand() * 100,
    size: 8 + rand() * 34,
    duration: 9 + rand() * 9,
    delay: rand() * -18,
    drift: (rand() - 0.5) * 60,
  }));
}

/** Soap bubbles rising slowly through their container. */
export function Bubbles({ count = 14, seed = 7, className }: { count?: number; seed?: number; className?: string }) {
  const bubbles = makeBubbles(count, seed);
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {bubbles.map((b, i) => (
        <motion.span
          key={i}
          className={cn("absolute bottom-[-60px] rounded-full", i % 3 === 0 && "hidden sm:block")}
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            background:
              "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.95) 0 12%, rgba(255,255,255,0.25) 22%, rgba(120,200,255,0.12) 60%, rgba(50,183,104,0.18) 100%)",
            boxShadow: "inset -2px -3px 6px rgba(16,42,67,0.08), inset 2px 2px 4px rgba(255,255,255,0.7)",
            border: "1px solid rgba(255,255,255,0.65)",
          }}
          animate={{ y: [0, -900], x: [0, b.drift, 0], opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "linear", times: [0, 0.5, 1] }}
        />
      ))}
    </div>
  );
}

/** Four-point sparkles that twinkle in place. */
export function Sparkles({
  points,
  color = "#ffffff",
}: {
  points: { top: string; left: string; size: number; delay: number }[];
  color?: string;
}) {
  return (
    <>
      {points.map((p, i) => (
        <motion.svg
          key={i}
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
          animate={{ scale: [0, 1, 0], rotate: [0, 90], opacity: [0, 1, 0] }}
          transition={{ duration: 2.4, delay: p.delay, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
        >
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill={color} />
        </motion.svg>
      ))}
    </>
  );
}

/** Small water droplets that burst outward and fall, on a loop. */
export function WaterSplash({ className, delay = 0 }: { className?: string; delay?: number }) {
  const drops = [
    { x: -46, y: -38, s: 9 },
    { x: -26, y: -58, s: 7 },
    { x: 0, y: -66, s: 10 },
    { x: 24, y: -54, s: 7 },
    { x: 44, y: -34, s: 9 },
  ];
  return (
    <div aria-hidden className={cn("pointer-events-none absolute h-0 w-0", className)}>
      <motion.span
        className="absolute -left-14 -top-2 h-4 w-28 rounded-[50%] border-2 border-sky-300/70"
        animate={{ scaleX: [0.2, 1.3], scaleY: [0.2, 1], opacity: [0.8, 0] }}
        transition={{ duration: 1.6, delay, repeat: Infinity, repeatDelay: 2.4, ease: "easeOut" }}
      />
      {drops.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: d.s,
            height: d.s * 1.25,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            background: "linear-gradient(160deg, #ffffff 0%, #a7dcff 45%, #4ba3e3 100%)",
            boxShadow: "0 2px 6px rgba(75,163,227,0.35)",
          }}
          animate={{ x: [0, d.x, d.x * 1.3], y: [0, d.y, 6], opacity: [0, 1, 0], scale: [0.4, 1, 0.6] }}
          transition={{ duration: 1.6, delay: delay + i * 0.04, repeat: Infinity, repeatDelay: 2.4, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/** A soft blurred colour blob used for depth in backgrounds. */
export function Blob({ className }: { className?: string }) {
  return <div aria-hidden className={cn("pointer-events-none absolute rounded-full blur-3xl", className)} />;
}
