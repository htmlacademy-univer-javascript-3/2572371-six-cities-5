import ReactDOM from 'react-dom/client';
import App from './app/app.tsx';
import {store} from './store';
import {checkAuth, fetchOffersAction} from './api/client.ts';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuth());
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App />
);
