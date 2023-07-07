import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { products, selectedProduct } from '../app/selectors';
import { setSelectedProduct } from '../features/SelectedProductSlice';
import { Product } from '../types/Product';
import { useState } from 'react';
import { NewProduct } from './NewProduct';

export const PostsList = () => {
  const dispatch = useAppDispatch();
  const { items: allProducts } = useAppSelector(products);
  const currentProduct = useAppSelector(selectedProduct);
  const [isVisible, setIsVisible] = useState(false);

  const onProductSelect = (prod: Product) => {
    dispatch(setSelectedProduct(prod))
  }
  const onClick = () => {
    setIsVisible(true);
  }

  return (
    <div data-cy="PostsList">
      <div className="is-flex is-flex-direction-row is-justify-content-space-between">
        <p className="title">Products:</p>
        <button className="button is-info is-rounded" onClick={onClick} disabled={isVisible}>+</button>
			</div>

      {isVisible ? <NewProduct setIsVisible={setIsVisible} /> : (
        <table className="table is-fullwidth is-striped is-hoverable is-narrow">
          <thead>
            <tr className="has-background-link-light">
              <th>#</th>
              <th>Title</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {allProducts.map(product => (
              <tr key={product.id} data-cy="Post">
                <td data-cy="PostId">{product.id}</td>
                <td data-cy="PostTitle">{product.name}</td>
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames(
                      'button',
                      'is-link',
                      {
                        'is-light': product.id !== currentProduct?.id,
                      },
                    )}
                    onClick={() => onProductSelect(product)}
                  >
                    {product.id === currentProduct?.id? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
