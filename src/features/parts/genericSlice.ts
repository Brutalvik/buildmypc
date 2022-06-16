import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GenericInterface {
  error?: object;
  loading?: boolean;
  part?: [];
}

const initialState = {
  error: {},
  loading: false,
  part: [],
};

const genericSlice = createSlice({
  name: 'parts',
  initialState,
  reducers: {
    error(state, action: PayloadAction<object>) {
      state.error = action.payload;
    },
    loading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    part(state, action: PayloadAction<[]>) {
      state.part = action.payload;
    },
  },
});

export const genericActions = genericSlice.actions;
export default genericSlice;
