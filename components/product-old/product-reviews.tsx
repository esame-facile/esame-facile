"use client";

import { StarRating } from "@/components/ui";
import { Review } from "@/types";
import { formatDate } from "@/lib/utils";

interface ProductReviewsProps {
  reviews: Review[];
  productId: string;
  reviewCount?: number;
}

export function ProductReviews({ reviews, reviewCount }: ProductReviewsProps) {
  const displayCount = reviewCount || reviews.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-body-lg font-bold">
          Recensioni ({displayCount})
        </h2>
      </div>

      {reviews.length === 0 && (
        <p className="text-body-sm text-neutral-400 text-center py-6">
          Nessuna recensione disponibile.
        </p>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-4 rounded-brand bg-neutral-50 border border-neutral-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-body-sm font-medium text-neutral-800">
                  {review.display_name}
                </span>
                <StarRating rating={review.rating} size={12} />
              </div>
              <span className="text-caption text-neutral-400">
                {formatDate(review.created_at)}
              </span>
            </div>
            {review.comment && (
              <p className="text-body-sm text-neutral-500">{review.comment}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
