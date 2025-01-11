import {fetchFavoritesOffersAction, fetchOffersAction, loginAction,} from '../../api/client.ts';
import {useAppDispatch} from '../../store';
import {Link, useNavigate} from 'react-router-dom';
import AppRoutes from '../../constants/routes.ts';
import {FormEvent, useEffect} from 'react';
import useAppSelector from '../../hooks/use-app-selector.ts';
import {setAuthorizationError} from '../../store/authorization/action.ts';
import {setActiveCity} from '../../store/main-page/actions.ts';
import {cities} from '../../constants/cities.ts';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}


function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const city = cities[getRandomInt(cities.length)];
  const navigateToRandomCity = () => {
    dispatch(setActiveCity(city));
    navigate(AppRoutes.Main);
  };
  useEffect(() => {
    dispatch(setAuthorizationError(null));
  }, [dispatch]);
  const authorize = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    dispatch(loginAction({email, password}))
      .unwrap()
      .then(() => setAuthorizationError(null))
      .then(() => {
        navigate(AppRoutes.Main);
      }).then(() => {
        dispatch(fetchOffersAction());
      })
      .then(() => {
        dispatch(fetchFavoritesOffersAction());
      })
      .catch((reason: { response?: { status?: number; message?: string }}) =>
        dispatch(setAuthorizationError(reason.response?.message || 'Неизвестная ошибка'))
      );
  };
  const error = useAppSelector((state) => state.auth.authorizationError);
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoutes.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={authorize}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
              {error && (<div style={{color: '#D64C5B'}}>{error}</div>)}
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item" onClick={navigateToRandomCity}>
              <div className="locations__item-link">
                <span>{city.name}</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
