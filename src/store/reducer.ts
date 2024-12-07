import {createReducer} from '@reduxjs/toolkit';
import {
  setActiveCity,
  setAuthorizationStatus,
  setLogin, setNearby, setOffer,
  setOfferListLoading,
  setOffersList, setReviews,
  setSortOption, setToken
} from './action.ts';
import Offer from '../types/offer.ts';
import SortOption from '../types/sort-option.ts';
import {FullOffer} from '../types/fullOffer.ts';
import UserReview from '../types/user-review.ts';
import {CityNames} from '../constants/cities.ts';

interface IState {
  currentCity: string;
  offers: Offer[] | null;
  sortOption: SortOption;
  loading: boolean;
  authorizationStatus: boolean;
  login: string | null;
  selectedOffer: FullOffer | null;
  selectedOfferNearby: Offer[] | null;
  selectedOffersReviews: UserReview[] | null;
  token: string | null;
}

const initialState: IState = {
  loading: false,
  currentCity: CityNames[0],
  offers: null,
  sortOption: SortOption.Popular,
  authorizationStatus: false,
  login: null,
  selectedOffer: null,
  selectedOfferNearby: null,
  selectedOffersReviews: null,
  token: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setOffersList, (state, action) => {
      const {offers} = action.payload;
      state.offers = offers;
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
    .addCase(setToken, (state, action) => {
      state.token = action.payload;
    });
});
