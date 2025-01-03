import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchOffersAction,
  fetchFavoritesOffersAction,
  addToFavorites,
  removeFromFavorites,
  fetchNearby,
  fetchReviews,
  sendReview,
  fetchOffer,
  checkAuth,
  loginAction,
  APIRoute
} from './client';
import {
  setNearby,
  setOffer,
  setReviews,
  setAuthorizationStatus,
  setLogin,
  setOfferListLoading,
  setOffersList,
  setFavoritesList
} from '../store/action';
import {IState} from '../store/reducer';
import Offer from '../types/offer';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {FullOffer} from '../types/fullOffer';
import {Action} from '@reduxjs/toolkit';
import {createAPI} from './api.ts';
import {AppThunkDispatch} from '../utils/with-store.tsx';


const axios = createAPI();
const middlewares = [thunk.withExtraArgument(axios)];
const mockStore = configureMockStore<IState, Action<string>, AppThunkDispatch>(middlewares);
const mock = new MockAdapter(axios);
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

describe('Thunks', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({});
    mock.reset();
  });

  it('fetchOffersAction should dispatch setOfferListLoading and setOffersList', async () => {
    const offers: Offer[] = [{
      id: '1',
      title: 'Offer 1',
      type: 'Apartment',
      price: 100,
      city: {name: 'City', location: {latitude: 0, longitude: 0, zoom: 10}},
      location: {latitude: 0, longitude: 0, zoom: 10},
      isFavorite: false,
      isPremium: false,
      rating: 4,
      previewImage: 'image.jpg'
    }];
    mock.onGet(APIRoute.Offers).reply(200, offers);

    await store.dispatch(fetchOffersAction());

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toContainEqual(
      setOfferListLoading(true).type
    );
    expect(actions).toContainEqual(setOfferListLoading(false).type);
    expect(actions).toContainEqual(setOffersList.type);
  });

  it('fetchFavoritesOffersAction should dispatch setFavoritesList', async () => {
    const favorites: Offer[] = [{
      id: '1',
      title: 'Favorite 1',
      type: 'Apartment',
      price: 100,
      city: {name: 'City', location: {latitude: 0, longitude: 0, zoom: 10}},
      location: {latitude: 0, longitude: 0, zoom: 10},
      isFavorite: true,
      isPremium: false,
      rating: 4,
      previewImage: 'image.jpg'
    }];
    mock.onGet(APIRoute.Favorites).reply(200, favorites);

    await store.dispatch(fetchFavoritesOffersAction());

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([
      fetchFavoritesOffersAction.pending.type,
      setFavoritesList(favorites).type,
      fetchFavoritesOffersAction.fulfilled.type
    ]);
  });

  it('addToFavorites should call fetchOffersAction', async () => {
    const id = '1';
    mock.onPost(`${APIRoute.Favorites}/${id}/1`).reply(200);

    await store.dispatch(addToFavorites(id));

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toContainEqual(fetchOffersAction.pending.type);
  });

  it('removeFromFavorites should call fetchOffersAction', async () => {
    const id = '1';
    mock.onPost(`${APIRoute.Favorites}/${id}/0`).reply(200);

    await store.dispatch(removeFromFavorites(id));

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toContainEqual(fetchOffersAction.pending.type);
  });

  it('fetchNearby should dispatch setNearby', async () => {
    const id = '1';
    const nearbyOffers: Offer[] = [{
      id: '2',
      title: 'Nearby Offer',
      type: 'Apartment',
      price: 100,
      city: {name: 'City', location: {latitude: 0, longitude: 0, zoom: 10}},
      location: {latitude: 0, longitude: 0, zoom: 10},
      isFavorite: false,
      isPremium: false,
      rating: 4,
      previewImage: 'image.jpg'
    }];
    mock.onGet(`${APIRoute.Offers}/${id}/nearby`).reply(200, nearbyOffers);

    await store.dispatch(fetchNearby(id));

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toContainEqual(
      setNearby(nearbyOffers).type
    );
  });

  it('fetchReviews should dispatch setReviews', async () => {
    const id = '1';
    const reviews = [{
      id: '1',
      comment: 'Review 1',
      rating: 5,
      date: '2021-01-01',
      user: {id: '1', name: 'User', isPro: false, avatarUrl: 'url'}
    }];
    mock.onGet(`${APIRoute.Comments}/${id}`).reply(200, reviews);

    await store.dispatch(fetchReviews(id));

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toContainEqual(
      setReviews(reviews).type
    );
  });

  it('sendReview should call fetchReviews', async () => {
    const id = '1';
    const review = {id, comment: 'Great!', rating: 5};
    mock.onPost(`${APIRoute.Comments}/${id}`).reply(200);

    await store.dispatch(sendReview(review));

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toContainEqual(fetchReviews.pending.type);
  });

  it('fetchOffer should dispatch setOffer', async () => {
    const id = '1';
    const offer: FullOffer = {
      id,
      title: 'Offer 1',
      type: 'Apartment',
      price: 100,
      city: {name: 'City', location: {latitude: 0, longitude: 0, zoom: 10}},
      location: {latitude: 0, longitude: 0, zoom: 10},
      isFavorite: false,
      isPremium: false,
      rating: 4,
      description: 'string',
      bedrooms: 1,
      goods: ['string'],
      host: {name: 'User', isPro: false, avatarUrl: 'url'},
      images: ['string'],
      maxAdults: 1
    };
    mock.onGet(`${APIRoute.Offers}/${id}`).reply(200, offer);

    await store.dispatch(fetchOffer(id));

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toContainEqual(
      setOffer(offer).type
    );
  });

  it('checkAuth should dispatch setAuthorizationStatus and setLogin on success', async () => {
    const loginResponse = {email: 'test@example.com', token: 'token'};
    mock.onGet(APIRoute.Login).reply(200, loginResponse);

    await store.dispatch(checkAuth());

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toContainEqual(
      setLogin(loginResponse.email).type
    );
    expect(actions).toContainEqual(
      setAuthorizationStatus(true).type
    );
  });

  it('loginAction should dispatch setAuthorizationStatus, setLogin, and setToken on success', async () => {
    const credentials = {email: 'test@example.com', password: 'password'};
    const loginResponse = {email: 'test@example.com', token: 'token'};
    mock.onPost(APIRoute.Login).reply(200, loginResponse);

    await store.dispatch(loginAction(credentials));

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toContainEqual(
      setAuthorizationStatus(true).type
    );
    expect(actions).toContainEqual(
      setLogin(loginResponse.email).type
    );
  });
});
