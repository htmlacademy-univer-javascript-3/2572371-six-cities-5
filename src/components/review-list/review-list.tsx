import Review from '../review/review.tsx';
import UserReview from '../../types/user-review.ts';

type ReviewListProps = {
  reviews: UserReview[];
}

function ReviewList({reviews}: ReviewListProps) {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default ReviewList;
