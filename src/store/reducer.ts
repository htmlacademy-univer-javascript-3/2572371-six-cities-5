import {offer} from './offer/offer.ts';
import {combineReducers} from '@reduxjs/toolkit';
import {auth} from './authorization/auth.ts';
import {favorites} from './favorites/favorites.ts';
import {main} from './main-page/main.ts';
import {review} from './review/review.ts';

export const reducer = combineReducers({
  ['auth']: auth.reducer,
  ['favorites']: favorites.reducer,
  ['main']: main.reducer,
  ['offer']: offer.reducer,
  ['review']: review.reducer
});
