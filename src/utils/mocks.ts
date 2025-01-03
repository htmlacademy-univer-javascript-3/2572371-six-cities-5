import {IState} from '../store/reducer.ts';
import {CityNames} from '../constants/cities.ts';
import SortOption from '../types/sort-option.ts';

export function makeFakeStore(store: Partial<IState> = {}) : IState {
  return {
    reviewSendingError: store.reviewSendingError || null,
    loading: store.loading || false,
    currentCity: store.currentCity || CityNames[0],
    offers: store.offers || [{
      id: '1',
      title: 'Offer 1',
      type: 'Apartment',
      price: 100,
      city: {name: 'City', location: {latitude: 0, longitude: 0, zoom: 10}},
      location: {latitude: 0, longitude: 0, zoom: 10},
      isFavorite: false,
      isPremium: false,
      rating: 4,
      previewImage: 'image.jpg',
    },
    {
      id: '2',
      title: 'Offer 2',
      type: 'Apartment',
      price: 200,
      city: {name: 'City', location: {latitude: 0, longitude: 0, zoom: 10}},
      location: {latitude: 0, longitude: 0, zoom: 10},
      isFavorite: false,
      isPremium: false,
      rating: 5,
      previewImage: 'image.jpg',
    }],
    sortOption: store.sortOption || SortOption.Popular,
    authorizationStatus: store.authorizationStatus || true,
    login: store.login || 'login@login',
    selectedOffer: store.selectedOffer || {
      id: '1',
      title: 'Offer 1',
      type: 'Apartment',
      price: 100,
      city: {name: 'City', location: {latitude: 0, longitude: 0, zoom: 10}},
      location: {latitude: 0, longitude: 0, zoom: 10},
      isFavorite: false,
      isPremium: false,
      rating: 4,
      images: ['image.jpg'],
      bedrooms: 2,
      maxAdults: 2,
      goods: ['good1', 'good2'],
      host: {
        avatarUrl: 'avatar.jpg',
        isPro: true,
        name: 'name',
      },
      description: 'description'
    },
    selectedOfferNearby: store.selectedOfferNearby || null,
    selectedOffersReviews: store.selectedOffersReviews || null,
    favoritesCount: store.favoritesCount || 0,
    favoritesList: store.favoritesList || null,
    isReviewSending: store.isReviewSending || false
  };
}
