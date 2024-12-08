import Review from '../review/review.tsx';
import UserReview from '../../types/user-review.ts';
import {memo} from 'react';

type ReviewListProps = {
  reviews: UserReview[];
}

function ReviewListBase({reviews}: ReviewListProps) {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
}

export const ReviewList = memo(ReviewListBase);
