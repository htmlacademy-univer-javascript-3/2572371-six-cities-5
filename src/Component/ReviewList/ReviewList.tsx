import {UserReview} from '../../Mocks/Mocks.ts';
import Review from '../Review/Review.tsx';

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
