import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './Component/NotFoundPage/NotFoundPage.tsx';
import MainPage from './Component/MainPage/MainPage.tsx';
import LoginPage from './Component/LoginPage/LoginPage.tsx';
import FavoritesPage from './Component/FavoritesPage/FavoritesPage.tsx';
import OfferPage from './Component/OfferPage/OfferPage.tsx';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute.tsx';
import OfferNotLoggedPage from './Component/OfferNotLoggedPage/OfferNotLoggedPage.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage OffersCount={312} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/favorites" element={<PrivateRoute childrenWhenNotLogged={null}><FavoritesPage /></PrivateRoute>} />
        <Route path="/offer/*" element={<PrivateRoute childrenWhenNotLogged={<OfferNotLoggedPage />}><OfferPage /></PrivateRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
