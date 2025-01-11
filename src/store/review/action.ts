import {createAction} from '@reduxjs/toolkit';

export const setReviewSending = createAction<boolean>('review/sending');
export const setReviewSendingError = createAction<string | null>('review/sendingError');
