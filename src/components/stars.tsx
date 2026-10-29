import { Star } from "lucide-react";

export function Stars({ rating, size = 18 }: { rating: number; size?: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25 && rating - full < 0.75;
  const roundedHalf = rating - full >= 0.75;
  const filled = roundedHalf ? full + 1 : full;

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const isFull = i < filled && !(hasHalf && i === full);
        const isHalf = hasHalf && i === full;
        return (
          <span key={i} className="relative inline-flex" style={{ width: size, height: size }}>
            <Star
              className="absolute inset-0 text-black/15"
              style={{ width: size, height: size }}
              fill="currentColor"
              strokeWidth={0}
            />
            {(isFull || isHalf) && (
              <span
                className="absolute inset-0 overflow-hidden text-star"
                style={{ width: isHalf ? "50%" : "100%" }}
              >
                <Star
                  style={{ width: size, height: size }}
                  fill="currentColor"
                  strokeWidth={0}
                />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
