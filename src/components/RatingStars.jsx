import { Star } from 'lucide-react';

export default function RatingStars({ rating, reviews, compact = false }) {
  return (
    <span className={`rating ${compact ? 'rating--compact' : ''}`} aria-label={`Rated ${rating} out of 5${reviews ? ` from ${reviews} reviews` : ''}`}>
      <span className="rating__stars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((index) => (
          <Star key={index} size={compact ? 12 : 15} className={index <= Math.round(rating) ? 'rating__star rating__star--filled' : 'rating__star'} />
        ))}
      </span>
      <span className="rating__value">{rating.toFixed(1)}</span>
      {reviews !== undefined && <span className="rating__count">({reviews})</span>}
    </span>
  );
}