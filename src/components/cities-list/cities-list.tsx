import useAppSelector from '../../hooks/use-app-selector.ts';
import {useDispatch} from 'react-redux';
import {setActiveCity} from '../../store/action.ts';
import {memo} from 'react';
import {cities} from '../../constants/cities.ts';

const List = () => {
  const activeCity = useAppSelector((state) => state.currentCity);
  const dispatch = useDispatch();

  function onCityClick(city: string) {
    dispatch(setActiveCity(cities.filter((c) => c.name === city)[0]));
  }

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city.name}>
              <a
                className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`}
                href="#"
                onClick={() => onCityClick(city.name)}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export const CitiesList = memo(List);

