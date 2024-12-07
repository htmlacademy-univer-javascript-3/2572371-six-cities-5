import {createAsyncThunk, Dispatch} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import Offer from '../types/offer.ts';
import {setAuthorizationStatus, setLogin, setOfferListLoading, setOffersList, setToken} from '../store/action.ts';


const APIRoute = {
  Offers: '/offers',
  Login: '/login',
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

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: Dispatch;
  extra: AxiosInstance;
}>(
  'auth/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<LoginResponse>(APIRoute.Login);
      dispatch(setLogin(data.email));
      dispatch(setToken(data.token));
      dispatch(setAuthorizationStatus(true));
    } catch (err) {
      const error = err as { response?: { status?: number } };
      if (error.response && error.response.status === 401) {
        dispatch(setAuthorizationStatus(false));
      }
    }
  },
);

export type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResponse =
{
  name: string
  avatarUrl: string
  isPro: boolean
  email: string
  token: string
}


export const loginAction = createAsyncThunk<void, LoginCredentials, {
  dispatch: Dispatch;
  extra: AxiosInstance;
}>(
  'auth/login',
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<LoginResponse>(APIRoute.Login, {email, password});
      dispatch(setAuthorizationStatus(true));
      dispatch(setLogin(data.email));
      dispatch(setToken(data.token));
    } catch (err) { /* empty */ }
  },
);
