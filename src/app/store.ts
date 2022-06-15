import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import partsSlice from '../features/parts/partsSlice';

export const store = configureStore({
  reducer: {
    partsReducer: partsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
