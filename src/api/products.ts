import { Product } from '../types/Product';
import { read, write, init } from '../utils/localClient';

export const getProducts = () => {
  return read('products');
};

export const addProducts = (data: Product) => {
  return write('products', data);
};

export const initialProduct = (data: Product[]) => {
  return init('products', data);
}
