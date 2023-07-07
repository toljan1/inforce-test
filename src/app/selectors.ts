import { RootState } from './RootState';

export const products = (state: RootState) => state.products;
export const selectedProduct = (state: RootState) => state.currentProduct.initial;
