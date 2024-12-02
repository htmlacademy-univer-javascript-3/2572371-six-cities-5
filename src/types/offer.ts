import City from './city.ts';

type Offer = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  location: City;
  date: string;
  isFavorite: boolean;
  isPremium: boolean;
  type: OfferType;
  longitude: number;
  latitude: number;
  rating: number;
}

type OfferType = 'Apartment' | 'Room';

export default Offer;
