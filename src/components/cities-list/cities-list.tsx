import City from '../../types/city.ts';
import useAppSelector from '../../hooks/use-app-selector.ts';
import {useDispatch} from 'react-redux';
import {setActiveCity} from '../../store/action.ts';

interface ICitiesListProps {
  cities: City[];
}

function CitiesList({cities}: ICitiesListProps) {
  const activeCity = useAppSelector((state) => state.currentCity);
  const dispatch = useDispatch();

  function onCityClick(city: City) {
    dispatch(setActiveCity({city}));
  }

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city.name}>
              <a
                className={`locations__item-link tabs__item ${city.name === activeCity.name ? 'tabs__item--active' : ''}`}
                href="#"
                onMouseOver={() => onCityClick(city)}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;

