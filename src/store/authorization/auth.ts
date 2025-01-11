import {setAuthorizationError, setAuthorizationStatus, setLogin} from './action.ts';
import {createSlice} from '@reduxjs/toolkit';

export interface IAuthState {
  authorizationStatus: boolean;
  authorizationError: string | null;
  login: string | null;
}

const initialState: IAuthState = {
  authorizationStatus: false,
  authorizationError: null,
  login: null,
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setAuthorizationStatus, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(setLogin, (state, action) => {
        state.login = action.payload;
      })
      .addCase(setAuthorizationError, (state, action) => {
        state.authorizationError = action.payload;
      });
  }
});
