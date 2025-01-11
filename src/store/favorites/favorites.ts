import {createSlice} from '@reduxjs/toolkit';
import Offer from '../../types/offer.ts';
import {setFavoritesList} from './action.ts';

export interface IFavoritesState {
  favoritesList: Offer[] | null;
}

const initialState: IFavoritesState = {
  favoritesList: null,
};

export const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setFavoritesList, (state, action) => {
        state.favoritesList = action.payload;
      });
  }
});
