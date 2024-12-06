import {createAction} from '@reduxjs/toolkit';
import Offer from '../types/offer.ts';
import City from '../types/city.ts';
import SortOption from '../types/sort-option.ts';

export const setOffersList = createAction<{offers: Offer[]}>('offerList/matchOffers');
export const setActiveCity = createAction<{city: City}>('navigation/setActiveCity');
export const setSortOption = createAction<{sortOption: SortOption}>('navigation/setSortOption');
export const setOfferListLoading = createAction<boolean>('offerList/offerListLoading');
