import { main, IMainPageState } from './main';
import { setActiveCity, setOfferListLoading, setOffersList, setSortOption } from './actions';
import City from '../../types/city';
import Offer from '../../types/offer';
import SortOption from '../../types/sort-option';
import { cities } from '../../constants/cities';

describe('main reducer', () => {
  const initialState: IMainPageState = {
    loading: false,
    currentCity: cities[0],
    offers: null,
    sortOption: SortOption.Popular,
  };

  it('should handle initial state', () => {
    expect(main.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setActiveCity', () => {
    const newCity: City = cities[1];
    const actual = main.reducer(initialState, setActiveCity(newCity));
    expect(actual.currentCity).toEqual(newCity);
  });

  it('should handle setOffersList', () => {
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
    const actual = main.reducer(initialState, setOffersList({ offers: mockOffers }));
    expect(actual.offers).toEqual(mockOffers);
  });

  it('should handle setSortOption', () => {
    const newSortOption: SortOption = SortOption.PriceHighToLow;
    const actual = main.reducer(initialState, setSortOption({ sortOption: newSortOption }));
    expect(actual.sortOption).toEqual(newSortOption);
  });

  it('should handle setOfferListLoading', () => {
    const actual = main.reducer(initialState, setOfferListLoading(true));
    expect(actual.loading).toEqual(true);
  });
});
