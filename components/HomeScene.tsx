"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Bubbles } from "./Effects";

/**
 * Illustrated "modern home" composition with DRCL products on a shelf.
 * Swap for lifestyle photography when available.
 */
export default function HomeScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shelfY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const plantY = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const windowY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <div ref={ref} className="relative aspect-[5/5.4] w-full overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#EEF5F1_0%,#E6F0EA_62%,#D9E6DE_62%,#E3ECE6_100%)] shadow-lift">
      {/* Window */}
      <motion.div style={{ y: windowY }} className="absolute top-[8%] left-[10%] h-[46%] w-[38%]">
        <div className="relative h-full w-full overflow-hidden rounded-t-full border-[6px] border-white bg-[linear-gradient(180deg,#BFE3FA_0%,#E4F4FD_70%,#F7FBF6_100%)] shadow-soft">
          <div className="absolute top-[22%] right-[18%] h-10 w-10 rounded-full bg-amber-200/80 blur-[1px]" />
          <div className="absolute inset-y-0 left-1/2 w-[5px] -translate-x-1/2 bg-white" />
          <div className="absolute inset-x-0 top-[55%] h-[5px] bg-white" />
          <svg viewBox="0 0 200 60" className="absolute bottom-0 w-full" aria-hidden>
            <path d="M0 40 Q40 10 80 34 T160 28 T200 30 V60 H0Z" fill="#A8D8B9" />
            <path d="M0 50 Q60 30 120 46 T200 44 V60 H0Z" fill="#7CC49A" />
          </svg>
        </div>
        <div className="mx-[-8%] h-3 rounded-full bg-white shadow-soft" />
      </motion.div>

      {/* Plant */}
      <motion.div style={{ y: plantY }} className="absolute bottom-[26%] left-[6%] w-[26%]">
        <svg viewBox="0 0 120 170" aria-hidden className="w-full">
          <motion.g
            style={{ originX: "60px", originY: "110px" }}
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M60 110 C40 80 20 70 8 40 C30 46 50 62 60 110Z" fill="#32B768" />
            <path d="M60 110 C70 70 90 52 112 34 C108 64 88 86 60 110Z" fill="#26995A" />
            <path d="M60 110 C55 70 58 40 66 8 C78 40 74 76 60 110Z" fill="#4CC57F" />
            <path d="M60 110 C46 96 30 96 14 90 C32 82 50 88 60 110Z" fill="#26995A" />
          </motion.g>
          <path d="M30 108 H90 L82 166 H38 Z" fill="#102A43" />
          <rect x="26" y="104" width="68" height="10" rx="4" fill="#163553" />
        </svg>
      </motion.div>

      {/* Shelf with products */}
      <motion.div style={{ y: shelfY }} className="absolute top-[20%] right-[4%] w-[54%]">
        <div className="flex items-end justify-center gap-[4%] px-[4%]">
          {[
            { src: "/images/products/bathroom-cleaner.svg", w: "w-[28%]", d: 0 },
            { src: "/images/products/premium-floor-cleaner.svg", w: "w-[36%]", d: 0.4 },
            { src: "/images/products/glass-cleaner.svg", w: "w-[28%]", d: 0.8 },
          ].map((b) => (
            <motion.div
              key={b.src}
              className={b.w}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, delay: b.d, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src={b.src} alt="" width={400} height={560} className="h-auto w-full" />
            </motion.div>
          ))}
        </div>
        <div className="h-3 rounded-full bg-white shadow-soft" />
        <div className="mx-auto h-2 w-[80%] rounded-b-xl bg-navy/10" />
      </motion.div>

      {/* Floor products */}
      <div className="absolute right-[6%] bottom-[5%] flex w-[52%] items-end justify-end gap-[8%]">
        <div className="w-[42%]">
          <Image src="/images/products/strong-toilet-cleaner.svg" alt="" width={400} height={560} className="h-auto w-full" />
        </div>
        <div className="w-[52%]">
          <Image src="/images/products/refill-pouch.svg" alt="" width={400} height={560} className="h-auto w-full" />
        </div>
      </div>

      <Bubbles count={8} seed={3} />
      <span className="sr-only">Illustration of DRCL cleaning products on a shelf in a bright, modern home.</span>
    </div>
  );
}
