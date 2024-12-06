import {configureStore} from '@reduxjs/toolkit';
import api from '../api/api.ts';
import {reducer} from './reducer.ts';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export default store;
