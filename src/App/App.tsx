import MainPage from '../Pages/MainPage/MainPage.tsx';
import Offer from '../Mocks/offers.ts';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from '../Pages/LoginPage/LoginPage.tsx';
import PrivateRoute from '../Component/PrivateRoute/PrivateRoute.tsx';
import FavoritesPage from '../Pages/FavoritesPage/FavoritesPage.tsx';
import OfferNotLoggedPage from '../Pages/OfferNotLoggedPage/OfferNotLoggedPage.tsx';
import OfferPage from '../Pages/OfferPage/OfferPage.tsx';
import NotFoundPage from '../Pages/NotFoundPage/NotFoundPage.tsx';
import React from 'react';
import AppRoutes from '../Constants/Routes.ts';
import Layout from '../Pages/Layout/Layout.tsx';

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
                  <OfferPage/>
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
