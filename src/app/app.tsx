import MainPage from '../pages/main/main-page.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from '../pages/login-page/login-page.tsx';
import PrivateRoute from '../components/private-route/private-route.tsx';
import FavoritesPage from '../pages/favorites/favorites-page.tsx';
import OfferNotLoggedPage from '../pages/offer-not-logged/offer-not-logged-page.tsx';
import OfferPage from '../pages/offer/offer-page.tsx';
import NotFoundPage from '../pages/not-found/not-found-page.tsx';
import React from 'react';
import AppRoutes from '../constants/routes.ts';
import Layout from '../pages/layout/layout.tsx';
import Offer from '../types/offer.ts';
import {offersMocks, reviewsMocks} from '../mocks/mocks.ts';

type AppData = {
  OffersCount: number;
  Offers: Offer[];
}

function App({OffersCount, Offers}: AppData): React.ReactElement {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.Main}
            element={
              <Layout>
                <MainPage OffersCount={OffersCount} Offers={Offers}/>
              </Layout>
            }
          />
          <Route path={AppRoutes.Login} element={<Layout><LoginPage/></Layout>}/>
          <Route path={AppRoutes.Favorites}
            element={
              <PrivateRoute childrenWhenNotLogged={null}>
                <Layout>
                  <FavoritesPage offers={Offers}/>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route path={AppRoutes.OfferForRouter}
            element={
              <PrivateRoute childrenWhenNotLogged={<OfferNotLoggedPage/>}>
                <Layout>
                  <OfferPage reviews={reviewsMocks} nearbyOffers={offersMocks.slice(0, 3)}/>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Layout><NotFoundPage/></Layout>}/>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
