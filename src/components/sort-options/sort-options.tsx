import {useState} from 'react';
import useAppSelector from '../../hooks/use-app-selector.ts';
import {useDispatch} from 'react-redux';
import SortOption from '../../types/sort-option.ts';
import {setSortOption} from '../../store/action.ts';

function SortOptions() {
  const [hidden, setHidden] = useState(true);

  const dispatch = useDispatch();
  const sortOption = useAppSelector((state) => state.sortOption);

  function onSortChosen(option: SortOption) {
    setHidden(true);
    dispatch(setSortOption({sortOption: option}));
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setHidden(!hidden)}
      >
        {sortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {!hidden && (
        <ul className="places__options places__options--custom places__options--opened">
          {[SortOption.Popular, SortOption.PriceHighToLow, SortOption.PriceLowToHigh, SortOption.TopRatedFirst].map((option) => (
            <li
              className={`places__option ${option === sortOption ? 'places__option--active' : ''}`}
              tabIndex={0}
              key={option}
              onClick={() => onSortChosen(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default SortOptions;
