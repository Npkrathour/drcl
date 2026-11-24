import { Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * Shows a star rating only when the product has genuine review data.
 * Otherwise it says so plainly rather than displaying made-up numbers.
 */
export default function Rating({ rating, className }: { rating?: Product["rating"]; className?: string }) {
  if (!rating || rating.count === 0) {
    return (
      <div className={cn("flex items-center gap-1.5 text-xs text-muted", className)}>
        <span className="flex" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="h-3.5 w-3.5 text-navy/15" />
          ))}
        </span>
        <span>No reviews yet</span>
      </div>
    );
  }
  return (
    <div className={cn("flex items-center gap-1.5 text-xs text-muted", className)} aria-label={`Rated ${rating.average} out of 5 from ${rating.count} reviews`}>
      <span className="flex" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={cn("h-3.5 w-3.5", i < Math.round(rating.average) ? "fill-amber-400 text-amber-400" : "text-navy/15")} />
        ))}
      </span>
      <span className="font-medium text-charcoal">{rating.average.toFixed(1)}</span>
      <span>({rating.count})</span>
    </div>
  );
}
