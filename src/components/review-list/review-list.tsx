import {UserReview} from '../../mocks/mocks.ts';
import Review from '../review/review.tsx';

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
