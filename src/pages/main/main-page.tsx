import OffersList from '../../components/offers-list/offers-list.tsx';
import Map from '../../components/map/map-component.tsx';
import {useState} from 'react';
import Offer from '../../types/offer.ts';
import useAppSelector from '../../hooks/use-app-selector.ts';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import SortOptions from '../../components/sort-options/sort-options.tsx';
import {sortOptions} from '../../types/sort-option.ts';
import Spinner from '../../components/spinner/spinner.tsx';
import {CityNames} from '../../constants/cities.ts';


function MainPage() {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);
  const activeCity = useAppSelector((state) => state.currentCity);
  const sortOption = useAppSelector((state) => state.sortOption);
  const city = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offers
    ?.filter((offer) => offer.city.name === city))
    ?.sort(sortOptions[sortOption]);
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CitiesList cities={CityNames}/>
      {offers === undefined ? (<Spinner/>) : (
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {activeCity}</b>
              <SortOptions/>
              <OffersList Offers={offers} SetActiveOffer={setActiveCard}/>
            </section>
            <div className="cities__right-section">
              <section style={{alignSelf: 'stretch', width: '100%'}}>
                <Map offers={offers} selectedOffer={activeCard}/>
              </section>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MainPage;
