import Card from '../card/card.tsx';
import { useState } from 'react';
import Offer from '../../types/offer.ts';

type OffersListProps = {
  Offers: Offer[];
  ClassName?: string;
}

function OffersList({Offers, ClassName}: OffersListProps) {
  const [, updateActiveOfferId] = useState<number | null>(null);

  return (
    <div className={ClassName || 'cities__places-list places__list tabs__content'}>
      {
        Offers.map((offer) => (
          <Card
            Id={offer.id}
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
