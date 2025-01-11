import {createAction} from '@reduxjs/toolkit';
import Offer from '../../types/offer.ts';

export const setFavoritesList = createAction<Offer[]>('favorites/list');
