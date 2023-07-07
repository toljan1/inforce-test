import React, { useEffect } from "react";
import "bulma/bulma.sass";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.scss";
import {
	setProducts,
} from "./features/ProductsSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getProducts, initialProduct } from "./api/products";
import { Product } from "./types/Product";
import { products, selectedProduct } from "./app/selectors";
import { PostsList } from "./components/ProductList";
import { PostDetails } from "./components/PostDetails";
import { initData } from "./api/data";

export const App: React.FC = () => {
	const dispatch = useAppDispatch();
  const currentProduct = useAppSelector(selectedProduct);

	useEffect(() => {
		initialProduct(initData);

		const data = getProducts();

		const newData: Product[] = [];

		for (const char in data) {
			newData.push(data[char]);
		}

		dispatch(setProducts(newData));
	}, []);

	return (
		<main className='section'>
			<div className='container'>
				<div className='tile is-ancestor'>
					<div className='tile is-parent'>
						<div className='tile is-child box is-success'>
							<div className='block'>
                {currentProduct ? null : <PostsList />}
							</div>

							<div className='block' data-cy='MainContent'>
                {currentProduct ? <PostDetails /> : null}
              </div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};
