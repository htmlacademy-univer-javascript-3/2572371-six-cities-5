import Card from '../Card/Card.tsx';
import Offer from '../../Mocks/offers.ts';
import { useState } from 'react';

type OffersListProps = {
  Offers: Offer[];
}

function OffersList({Offers}: OffersListProps) {
  const [, updateActiveOfferId] = useState<number | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        Offers.map((offer) => (
          <Card
            key={offer.id}
            ImagePath={offer.image}
            Price={offer.price}
            Bookmarked={offer.isFavorite}
            Description={offer.description}
            Type={'Apartment'}
            Premium={offer.isPremium}
            onMouseOver={() => updateActiveOfferId(offer.id)}
          />
        ))
      }
    </div>);
}

export default OffersList;
