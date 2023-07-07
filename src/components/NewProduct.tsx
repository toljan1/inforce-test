import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { products } from "../app/selectors";
import { setError, setProducts } from "../features/ProductsSlice";
import { Product } from "../types/Product";
import { addProducts, initialProduct } from "../api/products";

interface Props {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

export const NewProduct: React.FC<Props> = ({ setIsVisible }) => {
  const dispatch = useAppDispatch();
  const { items: allProducts, hasError } = useAppSelector(products);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [count, setCount] = useState(1);
  const [height, setHeight] = useState(1);
  const [width, setWidth] = useState(1);
  const [weight, setWeight] = useState(1);
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setError(false));
    const value = ev.target.value;
    switch (ev.target.id) {
      case 'name': 
        setName(value);
        break;
      case 'url': 
        setUrl(value);
        break;
      case 'count': 
        setCount(+value);
        break;
      case 'height': 
        setHeight(+value);
        break;
      case 'width': 
        setWidth(+value);
        break;
      case 'weight':
        setWeight(+value);
        break;
      default: 
        return;
    }
  }
  
  function createNewProduct() {
    if (name.length >= 1 && pattern.test(url)) {
      const newProd: Product = {
        id: allProducts.length + 1,
        imageUrl: url,
        name: name,
        count: count,
        size: {
          width: width,
          height: height,
        },
        weight: weight.toString(),
      }

      dispatch(setProducts([...allProducts, newProd]));
      addProducts(newProd);
      setIsVisible(false);
    }

    if (!name.length || !url.length || !pattern.test(url)) {
      dispatch(setError(true));
    }
  }

  const onCancel = () => {
    dispatch(setError(false));
    setName('');
    setUrl('');
    setCount(1);
    setHeight(1);
    setWidth(1);
    setWeight(1);
    setIsVisible(false);
  }

  return (
    <div className="is-flex is-flex-direction-row is-justify-content-space-between">
      {hasError && (!name.length || !url.length) ? (
        <p className="has-text-danger">Please check all inputs. Some of them is empty</p>
      ) : null}
      {hasError && name.length && url.length ? (
        <p className="has-text-danger">Please check your image url</p>
      ) : null}
        <>
          <div className="is-flex is-flex-direction-column is-justify-content-space-between is-flex-wrap-wrap">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={onChange}
                id="name"
              />
              <input
                type="text"
                placeholder="Image url"
                value={url}
                id="url"
                onChange={onChange}
              />
              <div>
              <div className="is-flex is-flex-direction-row">
                <p>
                    Count:&nbsp;
                </p>
                <input
                    type="number"
                    step={1}
                    placeholder="Count"
                    min={1}
                    value={count}
                    id="count"
                    onChange={onChange}
                />
              </div>
              <div className="is-flex is-flex-direction-row">
                <p>Height: &nbsp;</p>
                <input
                    type="number"
                    step={10}
                    placeholder="Height"
                    min={1}
                    value={height}
                    id="height"
                    onChange={onChange}
                />
              </div>
            </div>
            <div>
              <div className="is-flex is-flex-direction-row">
                <p>Width: &nbsp;</p>
                <input
                    type="number"
                    step={10}
                    placeholder="Width"
                    min={1}
                    value={width}
                    id="width"
                    onChange={onChange}
                />
              </div>
              <div className="is-flex is-flex-direction-row">
                <p>
                    Weight: &nbsp;
                </p>
                <input
                    type="number"
                    placeholder="Weight"
                    min={1}
                    value={weight}
                    id="weight"
                    onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div>
            <button className="button is-success is-rounded" onClick={onCancel}>Cancel</button>
            <button className="button is-danger is-rounded" onClick={createNewProduct}>Add</button>
          </div>
        </>
    </div>
  )
}