import {OfferList} from '../../components/offers-list/offers-list.tsx';
import {MapComponent} from '../../components/map/map-component.tsx';
import {useState} from 'react';
import useAppSelector from '../../hooks/use-app-selector.ts';
import {CitiesList} from '../../components/cities-list/cities-list.tsx';
import {SortOptions} from '../../components/sort-options/sort-options.tsx';
import {sortOptions} from '../../types/sort-option.ts';
import Spinner from '../../components/spinner/spinner.tsx';
import {CityNames} from '../../constants/cities.ts';
import {NoOffers} from '../main-empty/no-offers.tsx';


function MainPage() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const activeCity = useAppSelector((state) => state.currentCity);
  const sortOption = useAppSelector((state) => state.sortOption);
  const city = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offers
    ?.filter((offer) => offer.city.name === city))
    ?.sort(sortOptions[sortOption]);
  const offersMap = offers && new Map(offers.map((offer) => [offer.id, offer]));
  if (offers === undefined) {
    return (
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList cities={CityNames}/>
        {<Spinner/>}
      </main>
    );
  } else if (offers.length === 0) {
    return (
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList cities={CityNames}/>
        {<NoOffers City={city}/>}
      </main>
    );
  } else {
    return (
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList cities={CityNames}/>
        {
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {activeCity}</b>
                <SortOptions/>
                <OfferList Offers={offers} SetActiveOffer={setActiveCard}/>
              </section>
              <div className="cities__right-section">
                <section style={{alignSelf: 'stretch', width: '100%'}}>
                  <MapComponent offers={offers} selectedOffer={offersMap!.get(activeCard!)}/>
                </section>
              </div>
            </div>
          </div>
        }
      </main>
    );
  }
}

export default MainPage;
