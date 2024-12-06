import {createAsyncThunk, Dispatch} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import Offer from '../types/offer.ts';
import {setOfferListLoading, setOffersList} from '../store/action.ts';


const APIRoute = {
  Offers: '/offers',
};

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: Dispatch;
  extra: AxiosInstance;
}>(
  'offerList/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOfferListLoading(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOfferListLoading(false));
    dispatch(setOffersList({offers: data}));
  },
);
