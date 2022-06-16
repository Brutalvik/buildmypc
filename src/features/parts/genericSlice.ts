import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GenericInterface {
  error?: boolean;
  loading?: boolean;
  part?: [];
  types?: [];
}

const initialState = {
  error: false,
  loading: false,
  part: [],
  types: [],
};

const genericSlice = createSlice({
  name: 'parts',
  initialState,
  reducers: {
    error(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    },
    loading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    part(state, action: PayloadAction<[]>) {
      state.part = action.payload;
    },
    types(state, action: PayloadAction<[]>) {
      state.types = action.payload;
    },
  },
});

export const genericActions = genericSlice.actions;
export default genericSlice;
