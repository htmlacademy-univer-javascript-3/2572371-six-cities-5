import Card from '../card/card.tsx';
import Offer from '../../types/offer.ts';

type OffersListProps = {
  Offers: Offer[];
  ClassName?: string;
  SetActiveOffer: (offer: Offer) => void;
}

function OffersList({Offers, ClassName, SetActiveOffer}: OffersListProps) {
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
            onMouseOver={() => SetActiveOffer(offer)}
          />
        ))
      }
    </div>);
}

export default OffersList;
