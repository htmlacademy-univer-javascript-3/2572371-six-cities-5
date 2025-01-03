import {createReducer} from '@reduxjs/toolkit';
import {
  decrementFavorites,
  incrementFavorites,
  setActiveCity,
  setAuthorizationStatus, setFavoritesList,
  setLogin, setNearby, setOffer,
  setOfferListLoading,
  setOffersList, setReviews, setReviewSending, setReviewSendingError,
  setSortOption, upsertOfferFavorite
} from './action.ts';
import Offer from '../types/offer.ts';
import SortOption from '../types/sort-option.ts';
import {FullOffer} from '../types/fullOffer.ts';
import UserReview from '../types/user-review.ts';
import {cities} from '../constants/cities.ts';
import City from '../types/city.ts';

export interface IState {
  currentCity: City;
  offers: Offer[] | null;
  sortOption: SortOption;
  loading: boolean;
  authorizationStatus: boolean;
  login: string | null;
  selectedOffer: FullOffer | null;
  selectedOfferNearby: Offer[] | null;
  selectedOffersReviews: UserReview[] | null;
  favoritesCount: number;
  favoritesList: Offer[] | null;
  isReviewSending: boolean;
  reviewSendingError: string | null;
}

const initialState: IState = {
  loading: false,
  currentCity: cities[0],
  offers: null,
  sortOption: SortOption.Popular,
  authorizationStatus: false,
  login: null,
  selectedOffer: null,
  selectedOfferNearby: null,
  selectedOffersReviews: null,
  favoritesCount: 0,
  favoritesList: null,
  isReviewSending: false,
  reviewSendingError: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setOffersList, (state, action) => {
      const {offers} = action.payload;
      state.offers = offers;
      state.favoritesCount = offers.filter((it) => it.isFavorite).length;
    })
    .addCase(setSortOption, (state, action) => {
      const {sortOption} = action.payload;
      state.sortOption = sortOption;
    })
    .addCase(setOfferListLoading, (state, action) => {
      state.loading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setLogin, (state, action) => {
      state.login = action.payload;
    })
    .addCase(setOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.selectedOffersReviews = action.payload;
    })
    .addCase(setNearby, (state, action) => {
      state.selectedOfferNearby = action.payload;
    })
    .addCase(upsertOfferFavorite, (state, action) => {
      const offer = action.payload;
      const offers = state.offers;
      if (offers) {
        const index = offers.findIndex((it) => it.id === offer.id);
        offers[index].isPremium = offer.isPremium;
      }
    })
    .addCase(incrementFavorites, (state) => {
      state.favoritesCount += 1;
    })
    .addCase(decrementFavorites, (state) => {
      state.favoritesCount -= 1;
    })
    .addCase(setFavoritesList, (state, action) => {
      state.favoritesList = action.payload;
    })
    .addCase(setReviewSending, (state, action) => {
      state.isReviewSending = action.payload;
    })
    .addCase(setReviewSendingError, (state, action) => {
      state.reviewSendingError = action.payload;
    });
});

