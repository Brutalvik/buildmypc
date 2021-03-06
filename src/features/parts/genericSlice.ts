import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GenericInterface } from '../../models/model';

const initialState = {
  error: false,
  loading: false,
  part: [],
  types: [],
  cart: [],
  cartQuantity: 0,
  cartMessage: '',
  notificationVisible: false,
  notificaitonMessage: {
    message: '',
    description: '',
  },
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
    cart(state, action: PayloadAction<any>) {
      state.cart = action.payload;
    },
    cartQuantity(state, action: PayloadAction<number>) {
      state.cartQuantity = action.payload;
    },
    notificationVisible(state, action: PayloadAction<boolean>) {
      state.notificationVisible = action.payload;
    },
    notificaitonMessage(
      state,
      action: PayloadAction<GenericInterface['notificationMessage'] | any>
    ) {
      state.notificaitonMessage = action.payload;
    },
  },
});

export const genericActions = genericSlice.actions;
export default genericSlice;
