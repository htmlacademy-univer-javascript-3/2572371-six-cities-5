import Offer from './offer.ts';

enum SortOption {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export const sortOptions = {
  [SortOption.Popular]: () => 0,
  [SortOption.PriceLowToHigh]: (a: Offer, b: Offer) => a.price - b.price,
  [SortOption.PriceHighToLow]: (a: Offer, b: Offer) => b.price - a.price,
  [SortOption.TopRatedFirst]: (a: Offer, b: Offer) => b.rating - a.rating,
};


export default SortOption;
