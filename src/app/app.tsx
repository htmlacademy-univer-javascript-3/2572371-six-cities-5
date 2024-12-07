import MainPage from '../pages/main/main-page.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from '../pages/login-page/login-page.tsx';
import PrivateRoute from '../components/private-route/private-route.tsx';
import FavoritesPage from '../pages/favorites/favorites-page.tsx';
import OfferPage from '../pages/offer/offer-page.tsx';
import NotFoundPage from '../pages/not-found/not-found-page.tsx';
import React from 'react';
import AppRoutes from '../constants/routes.ts';
import Layout from '../pages/layout/layout.tsx';
import Offer from '../types/offer.ts';
import {Provider} from 'react-redux';
import store from '../store';

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.Main}
            element={
              <Layout>
                <MainPage />
              </Layout>
            }
          />
          <Route path={AppRoutes.Login} element={<LoginPage/>}/>
          <Route path={AppRoutes.Favorites}
            element={
              <PrivateRoute childrenWhenNotLogged={null}>
                <Layout>
                  <FavoritesPage offers={[]}/>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route path={AppRoutes.OfferForRouter}
            element={
              <Layout>
                <OfferPage/>
              </Layout>
            }
          />
          <Route path="*" element={<Layout><NotFoundPage/></Layout>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
