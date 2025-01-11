import { auth, IAuthState } from './auth';
import { setAuthorizationError, setAuthorizationStatus, setLogin } from './action';

describe('auth reducer', () => {
  const initialState: IAuthState = {
    authorizationStatus: false,
    authorizationError: null,
    login: null,
  };

  it('should handle initial state', () => {
    expect(auth.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setAuthorizationStatus', () => {
    const actual = auth.reducer(initialState, setAuthorizationStatus(true));
    expect(actual.authorizationStatus).toEqual(true);
  });

  it('should handle setLogin', () => {
    const actual = auth.reducer(initialState, setLogin('testuser'));
    expect(actual.login).toEqual('testuser');
  });

  it('should handle setAuthorizationError', () => {
    const actual = auth.reducer(initialState, setAuthorizationError('Error message'));
    expect(actual.authorizationError).toEqual('Error message');
  });
});
