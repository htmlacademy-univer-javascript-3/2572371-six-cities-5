import {createSlice} from '@reduxjs/toolkit';
import {setReviewSending, setReviewSendingError} from './action.ts';

export interface IReviewState {
  isReviewSending: boolean;
  reviewSendingError: string | null;
}

const initialState: IReviewState = {
  isReviewSending: false,
  reviewSendingError: null,
};

export const review = createSlice({
  initialState: initialState,
  name: 'review',
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setReviewSending, (state, action) => {
        state.isReviewSending = action.payload;
      })
      .addCase(setReviewSendingError, (state, action) => {
        state.reviewSendingError = action.payload;
      });
  }
});

