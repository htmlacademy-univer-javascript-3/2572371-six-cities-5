import {createAction} from '@reduxjs/toolkit';

export const setAuthorizationStatus = createAction<boolean>('auth/status');
export const setLogin = createAction<string>('auth/login');
export const setAuthorizationError = createAction<string | null>('auth/error');
