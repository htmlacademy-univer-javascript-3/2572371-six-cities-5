type Offer = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  location: string;
  date: string;
  isFavorite: boolean;
  isPremium: boolean;
  type: OfferType;
  longitude: number;
  latitude: number;
}

type OfferType = 'Apartment' | 'Room';

export default Offer;
