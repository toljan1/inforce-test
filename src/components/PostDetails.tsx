import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectedProduct } from "../app/selectors";
import { setSelectedProduct } from "../features/SelectedProductSlice";

export const PostDetails = () => {
	const dispatch = useAppDispatch();
	const currentProduct = useAppSelector(selectedProduct);
  const onClick = () => {
    dispatch(setSelectedProduct(null))
  }

	return (
		<div className='content' data-cy='PostDetails'>
          <div className='block'>
			<div className="is-flex is-flex-direction-row is-justify-content-space-between">
              <h2>{`#${currentProduct?.id}: ${currentProduct?.name}`}</h2>
              <button className="button is-danger is-rounded" onClick={onClick}>x</button>
			</div>
              <p className='title'>{`Count: ${currentProduct?.count}`}</p>
              <p className='title'>{`Height: ${currentProduct?.size.height}`}</p>
              <p className='title'>{`Width: ${currentProduct?.size.width}`}</p>
              <p className='title'>{`Weight: ${currentProduct?.weight}`}</p>
			</div>
		</div>
	);
};
