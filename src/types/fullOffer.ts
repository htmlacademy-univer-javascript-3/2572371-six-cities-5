import City from './city.ts';
import {User} from './user.ts';

export type FullOffer =
  {
    id: string;
    title: string;
    type: string;
    price: number;
    city: City;
    location: Location;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    description: string;
    bedrooms: number;
    goods: [string];
    host: User;
    images: [string];
    maxAdults: number;
  };
