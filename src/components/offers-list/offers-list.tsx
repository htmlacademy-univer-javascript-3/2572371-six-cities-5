import {Card} from '../card/card.tsx';
import Offer from '../../types/offer.ts';
import {memo, useCallback} from 'react';

type OffersListProps = {
  Offers: Offer[];
  ClassName?: string;
  SetActiveOffer: (offerId: string) => void;
}

function OffersListBase({Offers, ClassName, SetActiveOffer}: OffersListProps) {
  const activeOffer = useCallback((offerId: string) => {
    SetActiveOffer(offerId);
  }, [SetActiveOffer]);
  return (
    <div className={ClassName || 'cities__places-list places__list tabs__content'}>
      {
        Offers.map((offer) => (
          <Card
            Id={offer.id}
            key={offer.id}
            ImagePath={offer.previewImage}
            Price={offer.price}
            Bookmarked={offer.isFavorite}
            Description={offer.title}
            Type={'Apartment'}
            Premium={offer.isPremium}
            selectOffer={activeOffer}
            Rating={offer.rating}
          />
        ))
      }
    </div>);
}

export const OfferList = memo(OffersListBase);
