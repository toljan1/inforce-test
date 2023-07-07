import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/ProductsSlice';
import currentProductReducer from '../features/SelectedProductSlice';

export const store = configureStore({
  reducer: {
    products: postsReducer,
    currentProduct: currentProductReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
