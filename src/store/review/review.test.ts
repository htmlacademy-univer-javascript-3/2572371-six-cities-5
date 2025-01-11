import { review, IReviewState } from './review';
import { setReviewSending, setReviewSendingError } from './action';

describe('review reducer', () => {
  const initialState: IReviewState = {
    isReviewSending: false,
    reviewSendingError: null,
  };

  it('should handle initial state', () => {
    expect(review.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setReviewSending', () => {
    const actual = review.reducer(initialState, setReviewSending(true));
    expect(actual.isReviewSending).toEqual(true);
  });

  it('should handle setReviewSendingError', () => {
    const actual = review.reducer(initialState, setReviewSendingError('Error message'));
    expect(actual.reviewSendingError).toEqual('Error message');
  });
});
