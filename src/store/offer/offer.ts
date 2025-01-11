import {FullOffer} from '../../types/full-offer.ts';
import Offer from '../../types/offer.ts';
import UserReview from '../../types/user-review.ts';
import {setNearby, setOffer, setReviews} from './action.ts';
import {createSlice} from '@reduxjs/toolkit';

export interface IOfferState {
  selectedOffer: FullOffer | null;
  selectedOfferNearby: Offer[] | null;
  selectedOffersReviews: UserReview[] | null;
}

const initialState: IOfferState = {
  selectedOffer: null,
  selectedOfferNearby: null,
  selectedOffersReviews: null,
};

export const offer = createSlice({
  initialState: initialState,
  name: 'offer',
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setOffer, (state, action) => {
        state.selectedOffer = action.payload;
      })
      .addCase(setReviews, (state, action) => {
        state.selectedOffersReviews = action.payload;
      })
      .addCase(setNearby, (state, action) => {
        state.selectedOfferNearby = action.payload;
      });
  }
});
