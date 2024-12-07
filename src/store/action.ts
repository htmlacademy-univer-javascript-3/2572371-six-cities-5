import {createAction} from '@reduxjs/toolkit';
import Offer from '../types/offer.ts';
import SortOption from '../types/sort-option.ts';
import {FullOffer} from '../types/fullOffer.ts';
import UserReview from '../types/user-review.ts';

export const setOffersList = createAction<{offers: Offer[]}>('offerList/matchOffers');
export const setActiveCity = createAction<string>('navigation/setActiveCity');
export const setSortOption = createAction<{sortOption: SortOption}>('navigation/setSortOption');
export const setOfferListLoading = createAction<boolean>('offerList/offerListLoading');
export const setAuthorizationStatus = createAction<boolean>('auth/status');
export const setLogin = createAction<string>('auth/login');
export const setToken = createAction<string>('auth/token');
export const setOffer = createAction<FullOffer>('offerList/offer');
export const setReviews = createAction<UserReview[]>('offerList/reviews');
export const setNearby = createAction<Offer[]>('offerList/nearby');
