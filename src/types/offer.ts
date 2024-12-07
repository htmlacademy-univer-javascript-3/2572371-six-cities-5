import City from './city.ts';
import {Location} from './location.ts';

type Offer = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}
type OfferType = 'Apartment' | 'Room';

export default Offer;
