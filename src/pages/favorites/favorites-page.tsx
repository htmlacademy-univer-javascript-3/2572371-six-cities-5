import FavoritesList from '../../components/favorites-list/favorites-list.tsx';
import useAppSelector from '../../hooks/use-app-selector.ts';
import Spinner from '../../components/spinner/spinner.tsx';
import {useAppDispatch} from '../../store';
import {fetchFavoritesOffersAction} from '../../api/client.ts';
import {useEffect} from 'react';

function FavoritesPage() {
  const offers = useAppSelector((state) => state.favoritesList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavoritesOffersAction());
  }, [dispatch]);
  return (
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {offers ? <FavoritesList offers={offers}/> : <Spinner></Spinner>}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </>
  );
}

export default FavoritesPage;
