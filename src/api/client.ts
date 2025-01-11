import {createAsyncThunk, Dispatch} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import Offer from '../types/offer.ts';
import {FullOffer} from '../types/fullOffer.ts';
import UserReview from '../types/user-review.ts';
import {AppDispatch} from '../store';
import {saveToken} from './token.ts';
import {setOfferListLoading, setOffersList} from '../store/main-page/actions.ts';
import {setFavoritesList} from '../store/favorites/action.ts';
import {setNearby, setOffer, setReviews} from '../store/offer/action.ts';
import {setAuthorizationStatus, setLogin} from '../store/authorization/action.ts';


export const APIRoute = {
  Offers: '/offers',
  Login: '/login',
  Comments: '/comments',
  Favorites: '/favorite',
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

export const fetchFavoritesOffersAction = createAsyncThunk<void, undefined, {
  dispatch: Dispatch;
  extra: AxiosInstance;
}>(
  'favorites/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorites);
    dispatch(setFavoritesList(data));
  },
);


export const addToFavorites = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'offerList/addToFavorites',
  async (id, {dispatch, extra: api}) => {
    await api.post<FullOffer>(`${APIRoute.Favorites}/${id}/1`);
    dispatch(fetchOffersAction());
    dispatch(fetchFavoritesOffersAction());
  },
);

export const removeFromFavorites = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'offerList/addToFavorites',
  async (id, {dispatch, extra: api}) => {
    await api.post<FullOffer>(`${APIRoute.Favorites}/${id}/0`);
    dispatch(fetchOffersAction());
    dispatch(fetchFavoritesOffersAction());
  },
);

export const fetchNearby = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'offerList/fetchNearby',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(setNearby(data));
  },
);

export const fetchReviews = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'offerList/fetchReviews',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<UserReview[]>(`${APIRoute.Comments}/${id}`);
    dispatch(setReviews(data));
  },
);

export const sendReview = createAsyncThunk<void, { id: string; comment: string; rating: number }, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'offerList/sendReview',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    await api.post(`${APIRoute.Comments}/${id}`, {comment, rating});
    dispatch(fetchReviews(id));
  },
);

export const fetchOffer = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'offerList/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<FullOffer>(`${APIRoute.Offers}/${id}`);
    dispatch(setOffer(data));
  },
);

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'auth/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<LoginResponse>(APIRoute.Login);
      dispatch(setLogin(data.email));
      saveToken(data.token);
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
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'auth/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<LoginResponse>(APIRoute.Login, {email, password});
    dispatch(setAuthorizationStatus(true));
    dispatch(setLogin(data.email));
    saveToken(data.token);
  },
);
