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

export const offersMocks: Offer[] = [
  {
    id: 1,
    title: 'Beautiful & luxurious apartment at great location',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    price: 120,
    image: 'img/apartment-01.jpg',
    location: 'Amsterdam',
    date: '2021-06-01T00:00:00.000Z',
    isFavorite: false,
    isPremium: true,
    type: 'Apartment',
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
  },
  {
    id: 2,
    title: 'Wood and stone place',
    description: 'Wood and stone place',
    price: 80,
    image: 'img/room.jpg',
    location: 'Paris',
    date: '2021-06-01T00:00:00.000Z',
    isFavorite: true,
    isPremium: false,
    type: 'Room',
    latitude: 52.3609553943508,
    longitude: 4.85309666406198
  },
  {
    id: 3,
    title: 'Canal View Prinsengracht',
    description: 'Canal View Prinsengracht',
    price: 132,
    image: 'img/apartment-02.jpg',
    location: 'Amsterdam',
    date: '2021-06-01T00:00:00.000Z',
    isFavorite: false,
    isPremium: false,
    type: 'Apartment',
    latitude: 52.3909553943508,
    longitude: 4.929309666406198
  },
  {
    id: 4,
    title: 'Nice, cozy, warm big bed apartment',
    description: 'Nice, cozy, warm big bed apartment',
    price: 180,
    image: 'img/apartment-03.jpg',
    location: 'Paris',
    date: '2021-06-01T00:00:00.000Z',
    isFavorite: false,
    isPremium: false,
    type: 'Apartment',
    latitude: 52.3809553943508,
    longitude: 4.939309666406198
  },
];

export default Offer;
