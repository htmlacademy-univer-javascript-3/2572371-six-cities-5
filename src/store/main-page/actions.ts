import {createAction} from '@reduxjs/toolkit';
import Offer from '../../types/offer.ts';
import City from '../../types/city.ts';
import SortOption from '../../types/sort-option.ts';

export const setOffersList = createAction<{offers: Offer[]}>('main/setOffers');
export const setActiveCity = createAction<City>('main/setActiveCity');
export const setSortOption = createAction<{sortOption: SortOption}>('main/setSortOption');
export const setOfferListLoading = createAction<boolean>('main/offerListLoading');
