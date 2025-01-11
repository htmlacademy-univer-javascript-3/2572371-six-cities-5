import {cities} from '../constants/cities.ts';
import SortOption from '../types/sort-option.ts';
import {State} from '../store';

export function makeFakeStore(store: Partial<State> = {}): State {
  return {
    review: {
      reviewSendingError: store.review?.reviewSendingError || null,
      isReviewSending: store.review?.isReviewSending || false
    },
    main: {
      loading: store.main?.loading || false,
      currentCity: store.main?.currentCity || cities[0],
      offers: store.main?.offers || [{
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
      sortOption: store.main?.sortOption || SortOption.Popular,
    },
    auth: {
      authorizationStatus: store.auth?.authorizationStatus || true,
      login: store.auth?.login || 'login@login',
      authorizationError: store.auth?.authorizationError || null
    },
    offer: {
      selectedOffer: store.offer?.selectedOffer || {
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
      selectedOfferNearby: store.offer?.selectedOfferNearby || null,
      selectedOffersReviews: store.offer?.selectedOffersReviews || null,
    },
    favorites: {
      favoritesList: store.favorites?.favoritesList || null,
    },
  };
}
