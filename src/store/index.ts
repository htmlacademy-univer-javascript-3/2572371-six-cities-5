import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../api/api.ts';
import {useDispatch} from 'react-redux';
import {reducer} from './reducer.ts';

export type State = ReturnType<typeof store.getState>;

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


