import useAppSelector from '../../hooks/use-app-selector.ts';
import {useDispatch} from 'react-redux';
import {setActiveCity} from '../../store/action.ts';
import {memo} from 'react';

interface ICitiesListProps {
  cities: string[];
}

const List = ({cities}: ICitiesListProps) => {
  const activeCity = useAppSelector((state) => state.currentCity);
  const dispatch = useDispatch();

  function onCityClick(city: string) {
    dispatch(setActiveCity(city));
  }

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city}>
              <a
                className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`}
                href="#"
                onMouseOver={() => onCityClick(city)}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export const CitiesList = memo(List);

