import {Fragment, useCallback, useState} from 'react';
import {sendReview} from '../../api/client.ts';
import {useAppDispatch} from '../../store';
import {useSelector} from 'react-redux';
import {IState} from '../../store/reducer.ts';
import {setReviewSending} from '../../store/action.ts';

type CommentFormState = {
  rating: number;
  review: string;
}

function CommentForm() {
  const [commentFormState, setCommentFormState] = useState<CommentFormState>({
    rating: 0,
    review: '',
  });

  const dispatch = useAppDispatch();
  const currentOffer = useSelector((state: IState) => state.selectedOffer);

  const handleSubmit = useCallback(
    () => {
      setReviewSending(true);

      dispatch(sendReview({id: currentOffer!.id, comment: commentFormState.review, rating: commentFormState.rating}))
        .unwrap()
        .then(() => {
          setCommentFormState({review: '', rating: 0});
        })
        .finally(() => setReviewSending(false));
    },
    [commentFormState.rating, commentFormState.review, currentOffer, dispatch]
  );

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <span style={{width: `${commentFormState.rating * 20}%`}}></span>
        {Array.from({length: commentFormState.rating}, (_, i) => (
          <Fragment key={i}>
            <input className="form__rating-input visually-hidden" name="rating" value={i + 1} id={`${i + 1}-stars`}
              onInput={() => setCommentFormState({...commentFormState, rating: i + 1})} type="radio"
            />
            <label htmlFor={`${i + 1}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}

        {Array.from({length: 5 - commentFormState.rating}, (_, i) => (
          <Fragment key={commentFormState.rating + i}>
            <input className="form__rating-input visually-hidden" name="rating" value={commentFormState.rating + i + 1}
              id={`${commentFormState.rating + i + 1}-stars`}
              onInput={() => setCommentFormState({...commentFormState, rating: commentFormState.rating + i + 1})} type="radio"
            />
            <label htmlFor={`${commentFormState.rating + i + 1}-stars`} className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onInput={(evt) => setCommentFormState({...commentFormState, review: (evt.target as HTMLTextAreaElement).value})}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={false}
          onClick={handleSubmit}
        >Submit
        </button>
      </div>
    </form>);
}

export default CommentForm;

