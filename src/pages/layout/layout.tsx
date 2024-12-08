import React, {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import AppRoutes from '../../constants/routes.ts';
import useAppSelector from '../../hooks/use-app-selector.ts';
import {useDispatch} from 'react-redux';
import {setAuthorizationStatus} from '../../store/action.ts';

function Layout({children}: { children: ReactNode }): React.ReactElement {
  const login = useAppSelector((state) => state.login);
  const loggedIn = useAppSelector((state) => state.authorizationStatus);
  const favoritesCount = useAppSelector((state) => state.favoritesCount);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(setAuthorizationStatus(false));
  };
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoutes.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {loggedIn && (
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <Link to={AppRoutes.Favorites} className="header__user-name user__name">{login}</Link>
                      <span className="header__favorite-count">{favoritesCount}</span>
                    </a>
                  </li>)}
                <li className="header__nav-item">
                  {!loggedIn ? (
                    <Link className="header__nav-link" to={AppRoutes.Login}>
                      <span className="header__signout">Login</span>
                    </Link>)
                    : (
                      <a className="header__nav-link" onClick={signOut}>
                        <span className="header__signout">Sign out</span>
                      </a>
                    )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

export default Layout;
