import {createAsyncThunk, Dispatch} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import Offer from '../types/offer.ts';
import {
  setNearby,
  setOffer,
  setReviews,
  setAuthorizationStatus,
  setLogin,
  setOfferListLoading,
  setOffersList,
  setToken
} from '../store/action.ts';
import {FullOffer} from '../types/fullOffer.ts';
import UserReview from '../types/user-review.ts';


const APIRoute = {
  Offers: '/offers',
  Login: '/login',
  Comments: '/comments'
};

export const fetchNearby = createAsyncThunk<void, string, {
  dispatch: Dispatch;
  extra: AxiosInstance;
}>(
  'offerList/fetchNearby',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(setNearby(data));
  },
);

export const fetchReviews = createAsyncThunk<void, string, {
  dispatch: Dispatch;
  extra: AxiosInstance;
}>(
  'offerList/fetchReviews',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<UserReview[]>(`${APIRoute.Comments}/${id}`);
    dispatch(setReviews(data));
  },
);

export const fetchOffer = createAsyncThunk<void, string, {
  dispatch: Dispatch;
  extra: AxiosInstance;
}>(
  'offerList/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<FullOffer>(`${APIRoute.Offers}/${id}`);
    dispatch(setOffer(data));
  },
);

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
    name: string;
    avatarUrl: string;
    isPro: boolean;
    email: string;
    token: string;
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
    } catch (err) { /* empty */
    }
  },
);
