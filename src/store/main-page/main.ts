import City from '../../types/city.ts';
import Offer from '../../types/offer.ts';
import SortOption from '../../types/sort-option.ts';
import {cities} from '../../constants/cities.ts';
import {setActiveCity, setOfferListLoading, setOffersList, setSortOption} from './actions.ts';
import {createSlice} from '@reduxjs/toolkit';

export interface IMainPageState {
  currentCity: City;
  offers: Offer[] | null;
  sortOption: SortOption;
  loading: boolean;
}

export const mainPageState : IMainPageState = {
  loading: false,
  currentCity: cities[0],
  offers: null,
  sortOption: SortOption.Popular,
};


export const main = createSlice({
  initialState: mainPageState,
  name: 'main',
  reducers: {},
  extraReducers(builder) {
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
      });
  }
});

