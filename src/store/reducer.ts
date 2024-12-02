import {createReducer} from '@reduxjs/toolkit';
import {setActiveCity, setOffersList} from './action.ts';
import Offer from '../types/offer.ts';
import City from '../types/city.ts';
import {cities, offersMocks} from '../mocks/mocks.ts';

interface IState {
  currentCity: City;
  offers: Offer[];
}

const initialState: IState = {
  currentCity: cities[0],
  offers: offersMocks,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      const {city} = action.payload;
      state.currentCity = city;
    })
    .addCase(setOffersList, (state, action) => {
      const {offers} = action.payload;
      state.offers = offers;
    });
});
