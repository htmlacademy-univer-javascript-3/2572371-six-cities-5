import OffersList from '../../components/offers-list/offers-list.tsx';
import Map from '../../components/map/map-component.tsx';
import {useState} from 'react';
import Offer from '../../types/offer.ts';
import useAppSelector from '../../hooks/use-app-selector.ts';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import {cities} from '../../mocks/mocks.ts';


function MainPage() {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);
  const activeCity = useAppSelector((state) => state.currentCity);
  const city = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offers
    .filter((offer) => offer.location.name === city.name));
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CitiesList cities={cities}/>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {activeCity.name}</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                  Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            <OffersList Offers={offers} SetActiveOffer={setActiveCard}/>
          </section>
          <div className="cities__right-section">
            <section style={{alignSelf: 'stretch', width: '100%'}}>
              <Map offers={offers} selectedOffer={activeCard ?? offers[0]}/>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;
