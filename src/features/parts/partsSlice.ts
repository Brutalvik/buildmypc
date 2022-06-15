import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PartsInterface {
  cpu?: object[];
  memory: object[];
  motherboard: object[];
  gpu: object[];
  error: object;
}

const initialState: PartsInterface = {
  cpu: [],
  memory: [],
  motherboard: [],
  gpu: [],
  error: {
    status: false,
    message: '',
  },
};

const partsSlice = createSlice({
  name: 'parts',
  initialState,
  reducers: {
    cpu(state, action: PayloadAction<object[]>) {
      state.cpu = action.payload;
    },
    memory(state, action: PayloadAction<object[]>) {
      state.memory = action.payload;
    },
    motherboard(state, action: PayloadAction<object[]>) {
      state.motherboard = action.payload;
    },
    gpu(state, action: PayloadAction<object[]>) {
      state.gpu = action.payload;
    },
    error(state, action: PayloadAction<object>) {
      state.error = action.payload;
    },
  },
});

export const partsActions = partsSlice.actions;
export default partsSlice;
