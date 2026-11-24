"use client";

import { Minus, Plus } from "lucide-react";
import { MAX_QTY } from "@/lib/cart";
import { cn } from "@/lib/utils";

export default function QuantitySelector({
  value,
  onChange,
  size = "md",
  min = 1,
}: {
  value: number;
  onChange: (n: number) => void;
  size?: "sm" | "md";
  min?: number;
}) {
  const btn = cn(
    "grid place-items-center rounded-full text-navy transition-colors hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent",
    size === "sm" ? "h-8 w-8" : "h-10 w-10",
  );
  return (
    <div className={cn("inline-flex items-center rounded-full border border-line bg-mint p-1", size === "sm" ? "gap-1" : "gap-2")}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <Minus className="h-4 w-4" />
      </button>
      <span className={cn("text-center font-semibold text-navy tabular-nums", size === "sm" ? "w-6 text-sm" : "w-8")} aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY} aria-label="Increase quantity">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
