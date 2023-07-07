import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type InitialState = {
  loaded: boolean,
  hasError: boolean,
  items: Product[],
};

const initialAuthor: InitialState = {
  loaded: false,
  hasError: false,
  items: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState: initialAuthor,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { setProducts, setLoaded, setError } = productSlice.actions;
