import {ReactElement, useEffect, useState} from 'react';
import CommentForm from '../../components/comment-form/comment-form.tsx';
import ReviewList from '../../components/review-list/review-list.tsx';
import Offer from '../../types/offer.ts';
import Map from '../../components/map/map-component.tsx';
import OffersList from '../../components/offers-list/offers-list.tsx';
import useAppSelector from '../../hooks/use-app-selector.ts';
import Spinner from '../../components/spinner/spinner.tsx';
import store from '../../store';
import {fetchNearby, fetchOffer, fetchReviews} from '../../api/client.ts';
import {useParams} from 'react-router-dom';

function OfferPage(): ReactElement {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const {offerId} = useParams();

  useEffect(() => {
    store.dispatch(fetchOffer(offerId!));
    store.dispatch(fetchReviews(offerId!));
    store.dispatch(fetchNearby(offerId!));
  }, [offerId]);

  const offer = useAppSelector((state) => state.selectedOffer);
  const reviews = useAppSelector((state) => state.selectedOffersReviews);
  const nearbyOffers = useAppSelector((state) => state.selectedOfferNearby);
  const loggedIn = useAppSelector((state) => state.authorizationStatus);
  return offer === null ? (<Spinner/>)
    : (
      <div className="page">
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offer.images.map((image) => (
                  <div className="offer__image-wrapper" key={image}>
                    <img className="offer__image" src={image} alt="Photo studio"/>
                  </div>))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offer.title}
                  </h1>
                  <button className="offer__bookmark-button button" type="button">
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    {loggedIn && <span className="visually-hidden">To bookmarks</span>}
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: `${offer.rating * 20}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offer.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offer.maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;120</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offer.images.map((image) => (
                      <div className="offer__image-wrapper" key={image}>
                        <img className="offer__image" src={image} alt="Photo studio"/>
                      </div>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                    </div>
                    <span className="offer__user-name">{offer.host.name}</span>
                    {offer.host.isPro && (<span className="offer__user-status">Pro</span>)}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {offer.title}
                    </p>
                    <p className="offer__text">
                      {offer.description}
                    </p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                  {reviews === null
                    ? <Spinner/>
                    : (<div><ReviewList reviews={reviews}/> {loggedIn && <CommentForm />}</div>)}
                </section>
              </div>
            </div>
            {nearbyOffers === null ? <Spinner></Spinner> :
              <section style={{alignSelf: 'stretch', width: '80%', placeSelf: 'center', marginBottom: 50}}>
                <Map offers={nearbyOffers} selectedOffer={selectedOffer}/>
              </section>}
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              {nearbyOffers === null
                ? <Spinner></Spinner>
                : (<OffersList Offers={nearbyOffers} ClassName={'near-places__list places__list'} SetActiveOffer={setSelectedOffer}/>)}
            </section>
          </div>
        </main>
      </div>
    );
}

export default OfferPage;
