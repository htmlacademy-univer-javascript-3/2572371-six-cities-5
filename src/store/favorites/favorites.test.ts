import { favorites, IFavoritesState } from './favorites';
import { setFavoritesList } from './action';
import Offer from '../../types/offer';

describe('favorites reducer', () => {
  const initialState: IFavoritesState = {
    favoritesList: null,
  };

  it('should handle initial state', () => {
    expect(favorites.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setFavoritesList', () => {
    const mockOffers: Offer[] = [
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
    const actual = favorites.reducer(initialState, setFavoritesList(mockOffers));
    expect(actual.favoritesList).toEqual(mockOffers);
  });
});
