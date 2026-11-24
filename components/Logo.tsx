import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={cn("h-10 w-10", className)}>
      <rect width="64" height="64" rx="16" fill="#102A43" />
      <path d="M32 10c8 10 16 19 16 28a16 16 0 0 1-32 0c0-9 8-18 16-28z" fill="#32B768" />
      <path d="M25 39a7 7 0 0 0 7 7" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M46 12l1.6 3.4L51 17l-3.4 1.6L46 22l-1.6-3.4L41 17l3.4-1.6z" fill="#fff" />
    </svg>
  );
}

export default function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="DRCL home" className={cn("group inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-10 w-10 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.6rem] font-bold tracking-[0.12em]",
            light ? "text-white" : "text-navy",
          )}
        >
          DRCL
        </span>
        <span
          className={cn(
            "mt-1 text-[0.58rem] font-medium tracking-[0.22em] whitespace-nowrap uppercase",
            light ? "text-white/60" : "text-muted",
          )}
        >
          A Cleaner Space
        </span>
      </span>
    </Link>
  );
}
