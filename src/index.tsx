import ReactDOM from 'react-dom/client';
import App from './App/App.tsx';
import {offersMocks} from './Mocks/Mocks.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App OffersCount={312} Offers={offersMocks}></App>
);
