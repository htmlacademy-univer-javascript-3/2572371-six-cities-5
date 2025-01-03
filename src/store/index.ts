import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../api/api.ts';
import {reducer} from './reducer.ts';
import {useDispatch} from 'react-redux';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createAPI(),
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();


