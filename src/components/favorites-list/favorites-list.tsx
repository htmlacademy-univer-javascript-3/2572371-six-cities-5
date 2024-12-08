import FavoritesCard from '../favorites-card/favorites-card.tsx';
import Offer from '../../types/offer.ts';

function groupByLocation(offers: Offer[]): { [key: string]: Offer[] } {
  return offers.reduce((acc, offer) => {
    const country = offer.city.name;
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(offer);
    return acc;
  }, {} as { [key: string]: Offer[] });
}

function FavoritesList({offers}: { offers: Offer[] }) {
  const groupedOffers = groupByLocation(offers);
  return (
    <div>
      <ul className="favorites__list">
        {Object.keys(groupedOffers).map((location) => (
          <li key={location} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{location}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {groupedOffers[location].map((offer) => (
                <FavoritesCard
                  Id={offer.id}
                  key={offer.id}
                  Premium={offer.isPremium}
                  Description={offer.title}
                  Type={offer.type}
                  ImagePath={offer.previewImage}
                  Price={offer.price}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesList;

