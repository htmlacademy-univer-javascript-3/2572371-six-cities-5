import { createMemoryHistory, MemoryHistory } from 'history';
import { render, screen} from '@testing-library/react';
import MainPage from '../pages/main/main-page.tsx';
import AppRoutes from '../constants/routes.ts';
import {withHistory, withStore} from '../utils/with-store.tsx';
import LoginPage from '../pages/login-page/login-page.tsx';
import FavoritesPage from '../pages/favorites/favorites-page.tsx';
import NotFoundPage from '../pages/not-found/not-found-page.tsx';
import {makeFakeStore} from '../utils/mocks.ts';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });
  it('should render MainPage when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<MainPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoutes.Main);

    render(withStoreComponent);
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render LoginPage when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<LoginPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      auth: {
        authorizationError: null,
        authorizationStatus: false,
        login: null
      }
    }));
    mockHistory.push(AppRoutes.Login);

    render(withStoreComponent);

    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);
  });

  it('should render MainPage when authenticated user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<MainPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoutes.Login);

    render(withStoreComponent);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render FavoritesPage when user navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<FavoritesPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoutes.Favorites);

    render(withStoreComponent);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render NotFoundPage when user navigate to "/notFound"', () => {
    const withHistoryComponent = withHistory(<NotFoundPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('NotFoundPage');

    render(withStoreComponent);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });

  it('should render NotFoundPage when user navigate to non-existent path', () => {
    const withHistoryComponent = withHistory(<NotFoundPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('notexistinpath');

    render(withStoreComponent);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });
});
