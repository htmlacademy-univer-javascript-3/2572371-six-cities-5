import {createAction} from '@reduxjs/toolkit';
import {FullOffer} from '../../types/fullOffer.ts';
import UserReview from '../../types/user-review.ts';
import Offer from '../../types/offer.ts';

export const setOffer = createAction<FullOffer | null>('offer/offer');
export const setReviews = createAction<UserReview[]>('offer/reviews');
export const setNearby = createAction<Offer[]>('offer/nearby');
