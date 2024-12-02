import {createAction} from '@reduxjs/toolkit';
import Offer from '../types/offer.ts';
import City from '../types/city.ts';

export const setOffersList = createAction<{offers: Offer[]}>('offerList/matchOffers');
export const setActiveCity = createAction<{city: City}>('navigation/setActiveCity');
