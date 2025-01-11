import { offer, IOfferState } from './offer';
import { setNearby, setOffer, setReviews } from './action';
import { FullOffer } from '../../types/full-offer';
import Offer from '../../types/offer';
import UserReview from '../../types/user-review';

describe('offer reducer', () => {
  const initialState: IOfferState = {
    selectedOffer: null,
    selectedOfferNearby: null,
    selectedOffersReviews: null,
  };

  it('should handle initial state', () => {
    expect(offer.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setOffer', () => {
    const mockOffer: FullOffer = {
      id: '1',
      title: 'Test Offer',
      isFavorite: true,
      price: 100,
      rating: 4,
      type: 'Room',
      city: {
        name: 'City',
        location: {latitude: 1, longitude: 1, zoom: 1}
      },
      location: {latitude: 1, longitude: 1, zoom: 1},
      isPremium: true,
      maxAdults: 2,
      bedrooms: 2,
      goods: ['Good 1', 'Good 2'],
      host: {
        name: 'John Doe',
        isPro: true,
        avatarUrl: 'https://example.com/avatar.jpg',
      },
      description: 'Test description',
      images: ['img1.jpg', 'img2.jpg'],
    };
    const actual = offer.reducer(initialState, setOffer(mockOffer));
    expect(actual.selectedOffer).toEqual(mockOffer);
  });

  it('should handle setReviews', () => {
    const mockReviews: UserReview[] = [
      {
        id: '1',
        user: {
          name: 'John Doe',
          avatarUrl: 'https://example.com/avatar1.jpg',
          isPro: true,
        },
        rating: 4,
        comment: 'Great place!',
        date: '2023-10-01',
      },
    ];
    const actual = offer.reducer(initialState, setReviews(mockReviews));
    expect(actual.selectedOffersReviews).toEqual(mockReviews);
  });

  it('should handle setNearby', () => {
    const mockNearbyOffers: Offer[] = [
      {
        id: '1',
        title: 'Favorite Offer 1',
        isFavorite: true,
        price: 100,
        rating: 4,
        type: 'Room',
        previewImage: 'img/favorite1.jpg',
        city: {
          name: 'City',
          location: {latitude: 1, longitude: 1, zoom: 1}
        },
        location: {latitude: 1, longitude: 1, zoom: 1},
        isPremium: true,
      },
    ];
    const actual = offer.reducer(initialState, setNearby(mockNearbyOffers));
    expect(actual.selectedOfferNearby).toEqual(mockNearbyOffers);
  });
});
