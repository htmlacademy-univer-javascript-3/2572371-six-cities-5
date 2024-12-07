import {createReducer} from '@reduxjs/toolkit';
import {
  setActiveCity,
  setAuthorizationStatus,
  setLogin,
  setOfferListLoading,
  setOffersList,
  setSortOption, setToken
} from './action.ts';
import Offer from '../types/offer.ts';
import City from '../types/city.ts';
import {cities} from '../mocks/mocks.ts';
import SortOption from '../types/sort-option.ts';

interface IState {
  currentCity: City;
  offers: Offer[] | null;
  sortOption: SortOption;
  loading: boolean;
  authorizationStatus: boolean;
  login: string | null;
  token: string | null;
}

const initialState: IState = {
  loading: false,
  currentCity: cities[0],
  offers: null,
  sortOption: SortOption.Popular,
  authorizationStatus: false,
  login: null,
  token: null,
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
    .addCase(setToken, (state, action) => {
      state.token = action.payload;
    });
});
