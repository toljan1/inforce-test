import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type InitialState = {
  initial: Product | null,
};

const initialPost: InitialState = {
  initial: null,
};

const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState: initialPost,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.initial = action.payload;
    },
  },
});

export default selectedProductSlice.reducer;
export const { setSelectedProduct } = selectedProductSlice.actions;
