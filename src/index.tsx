import ReactDOM from 'react-dom/client';
import App from './app/app.tsx';
import {offersMocks} from './mocks/mocks.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App Offers={offersMocks}></App>
);
