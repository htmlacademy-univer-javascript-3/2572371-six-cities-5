import {Fragment, useCallback, useState} from 'react';
import {sendReview} from '../../api/client.ts';
import {useAppDispatch} from '../../store';
import useAppSelector from '../../hooks/use-app-selector.ts';
import {setReviewSending, setReviewSendingError} from '../../store/review/action.ts';

type CommentFormState = {
  rating: number;
  review: string;
}

function StarInput({rating, setRating, disabled, checked}: {rating: number; setRating: (rating: number) => void; disabled: boolean; checked: boolean}) {
  return (
    <Fragment>
      <input disabled={disabled} className="form__rating-input visually-hidden" name="rating" value={rating} id={`${rating}-stars`}
        onChange={(e) => {
          e.preventDefault();
          setRating(rating);
        }} type="radio" checked={checked}
      />
      <label htmlFor={`${rating}-stars`} className="reviews__rating-label form__rating-label" title={`${rating}`}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </Fragment>
  );
}

function CommentForm() {
  const [commentFormState, setCommentFormState] = useState<CommentFormState>({
    rating: 0,
    review: '',
  });

  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector((state) => state.offer.selectedOffer);
  const sending = useAppSelector((state) => state.review.isReviewSending);
  const commentSendingError = useAppSelector((state) => state.review.reviewSendingError);

  const handleSubmit = useCallback(
    () => {
      dispatch(setReviewSending(true));

      dispatch(sendReview({id: currentOffer!.id, comment: commentFormState.review, rating: commentFormState.rating}))
        .unwrap()
        .then(() => {
          setCommentFormState({review: '', rating: 0});
          dispatch(setReviewSendingError(null));
        })
        .catch(() => dispatch(setReviewSendingError('Error')))
        .finally(() => dispatch(setReviewSending(false)));
    },
    [commentFormState.rating, commentFormState.review, currentOffer, dispatch]
  );

  return (
    <div className="reviews__form form" >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {commentFormState.rating === 0 ? (<span style={{width: `${commentFormState.rating * 20}%`}}></span>) : null}
        {Array.from({length: 5}, (_, i) => i).map((i) => (
          <StarInput key = {i}
            rating={5 - i}
            setRating={(rating) => setCommentFormState({...commentFormState, rating})}
            disabled={sending}
            checked={commentFormState.rating === 5 - i}
          />))}
      </div>
      <textarea className="reviews__textarea form__textarea"
        disabled={sending}
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onInput={(evt) => setCommentFormState({...commentFormState, review: (evt.target as HTMLTextAreaElement).value})}
        value={commentFormState.review}
      >
      </textarea>
      {commentSendingError && (<div style={{color: '#D64C5B'}}>{commentSendingError}</div>)}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={commentFormState.rating === 0
          || commentFormState.review.length < 50
          || commentFormState.review.length > 300
          || sending}
        onClick={handleSubmit}
        >Submit
        </button>
      </div>
    </div>);
}

export default CommentForm;

