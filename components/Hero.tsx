"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ShoppingBag, Droplets, Package, Truck, Leaf } from "lucide-react";
import { ButtonLink } from "./ui/Button";
import { Bubbles, Sparkles, WaterSplash, Blob } from "./Effects";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const headline = ["Experience", "the", "Power", "of", "a", "Cleaner", "Tomorrow."];

const sparklePoints = [
  { top: "12%", left: "18%", size: 18, delay: 0.2 },
  { top: "24%", left: "82%", size: 22, delay: 1.1 },
  { top: "62%", left: "8%", size: 14, delay: 0.7 },
  { top: "8%", left: "58%", size: 12, delay: 1.8 },
  { top: "70%", left: "88%", size: 16, delay: 2.4 },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const stageY = useTransform(progress, [0, 1], [0, 140]);
  const backY = useTransform(progress, [0, 1], [0, 220]);
  const frontY = useTransform(progress, [0, 1], [0, -60]);
  const textY = useTransform(progress, [0, 1], [0, 80]);
  const textOpacity = useTransform(progress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative -mt-[4.5rem] overflow-hidden pt-[4.5rem] sm:-mt-20 sm:pt-20">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,#EFF8F3_0%,#E6F5EE_40%,#F4FAFB_75%,#FFFFFF_100%)]" />
      <motion.div aria-hidden style={{ y: backY }} className="absolute inset-0">
        <Blob className="top-[-10%] right-[-8%] h-[320px] w-[320px] bg-fresh/25 sm:h-[520px] sm:w-[520px]" />
        <Blob className="top-[30%] right-[20%] hidden h-[300px] w-[300px] bg-aqua/15 md:block" />
        <Blob className="bottom-[5%] left-[-12%] h-[300px] w-[300px] bg-sky/20 sm:h-[420px] sm:w-[420px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(16,42,67,0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </motion.div>
      <Bubbles count={16} seed={11} />

      <div className="container-x relative grid items-center gap-6 pt-8 pb-4 sm:gap-10 sm:pt-12 md:grid-cols-[1.05fr_1fr] md:gap-4 lg:min-h-[calc(100svh-5rem)] lg:gap-6 lg:py-16">
        {/* Copy */}
        <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 max-w-xl">
          <motion.span
            className="eyebrow bg-white/80 shadow-soft backdrop-blur"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Droplets className="h-3.5 w-3.5" /> {site.tagline}
          </motion.span>

          <h1 className="heading-xl mt-6 md:text-[2.6rem] lg:text-[3.3rem] xl:text-6xl">
            {headline.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  className={`inline-block ${word === "Cleaner" ? "text-gradient pr-1" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.07, ease }}
                >
                  {word}
                </motion.span>
                {i < headline.length - 1 && " "}
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:mt-6 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
          >
            Discover powerful, reliable cleaning solutions designed to make every corner of your home shine.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 min-[420px]:flex-row sm:mt-9"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease }}
          >
            <ButtonLink href="/#categories" variant="secondary" size="lg" className="w-full min-[420px]:w-auto">
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/products" size="lg" className="w-full min-[420px]:w-auto">
              <ShoppingBag className="h-4 w-4" />
              Shop Now
            </ButtonLink>
          </motion.div>

          <motion.ul
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-charcoal/80 sm:mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05 }}
          >
            <li className="flex items-center gap-2">
              <Package className="h-4 w-4 text-fresh" /> 500ml · 1L · 5L packs
            </li>
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-fresh" /> Free shipping over {formatPrice(site.freeShippingThreshold)}
            </li>
          </motion.ul>
        </motion.div>

        {/* Product stage */}
        <motion.div style={{ y: stageY }} className="relative mx-auto aspect-square w-full max-w-[400px] sm:max-w-[480px] md:max-w-[560px]">
          <motion.div
            aria-hidden
            className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff_0%,#E3F5EA_40%,#C9EADF_75%,#B8E2DA_100%)] shadow-[inset_0_-20px_60px_rgba(25,167,160,0.22),0_30px_80px_-30px_rgba(25,167,160,0.45)]"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-[2%] rounded-full border border-dashed border-fresh/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <Sparkles points={sparklePoints} color="#32B768" />

          {/* Back bottle: glass cleaner */}
          <motion.div
            className="absolute top-[12%] left-[47%] w-[27%]"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease }}
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [3, 5, 3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="opacity-90 blur-[0.3px]"
            >
              <Image src="/images/products/glass-cleaner.svg" alt="DRCL Glass Cleaner" width={400} height={560} priority className="h-auto w-full drop-shadow-xl" />
            </motion.div>
          </motion.div>

          {/* Main bottle: floor cleaner */}
          <motion.div
            className="absolute top-[14%] left-[8%] w-[46%]"
            initial={{ opacity: 0, y: 80, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease }}
          >
            <motion.div
              animate={{ y: [0, -18, 0], x: [0, 6, 0], rotate: [-4, -1.5, -4] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/products/premium-floor-cleaner.svg"
                alt="DRCL Premium Floor Cleaner bottle"
                width={400}
                height={560}
                priority
                className="h-auto w-full drop-shadow-[0_30px_30px_rgba(16,42,67,0.25)]"
              />
            </motion.div>
          </motion.div>

          {/* Front bottle: toilet cleaner */}
          <motion.div
            style={{ y: frontY }}
            className="absolute top-[26%] left-[50%] w-[41%]"
          >
            <motion.div
              initial={{ opacity: 0, y: 90, rotate: 10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.45, ease }}
            >
              <motion.div
                animate={{ y: [0, -14, 0], x: [0, -6, 0], rotate: [5, 2, 5] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <Image
                  src="/images/products/strong-toilet-cleaner.svg"
                  alt="DRCL Strong Toilet Cleaner bottle"
                  width={400}
                  height={560}
                  priority
                  className="h-auto w-full drop-shadow-[0_30px_30px_rgba(16,42,67,0.25)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <WaterSplash className="bottom-[16%] left-[33%]" delay={1.2} />
          <WaterSplash className="bottom-[10%] left-[70%]" delay={2.6} />

          {/* Floating info chips */}
          <motion.div
            className="absolute top-[10%] left-[0%] hidden items-center gap-2 rounded-2xl bg-white/90 px-3.5 py-2.5 shadow-lift backdrop-blur sm:flex"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
            transition={{ opacity: { delay: 1.2 }, x: { delay: 1.2 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-fresh-100 text-fresh"><Leaf className="h-4 w-4" /></span>
            <span className="text-xs leading-tight">
              <span className="block font-semibold text-navy">Fresh Citrus</span>
              <span className="text-muted">Floor Cleaner</span>
            </span>
          </motion.div>
          <motion.div
            className="absolute right-[0%] bottom-[14%] hidden items-center gap-2 rounded-2xl bg-white/90 px-3.5 py-2.5 shadow-lift backdrop-blur sm:flex"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
            transition={{ opacity: { delay: 1.4 }, x: { delay: 1.4 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-sky-100 text-sky-600">
              <Droplets className="h-4 w-4" />
            </span>
            <span className="text-xs leading-tight">
              <span className="block font-semibold text-navy">Under-rim nozzle</span>
              <span className="text-muted">Toilet Cleaner</span>
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="relative block h-10 w-full text-white sm:h-16">
        <path fill="currentColor" d="M0 40 C240 80 480 0 720 30 C960 60 1200 10 1440 40 L1440 80 L0 80 Z" />
      </svg>
    </section>
  );
}
