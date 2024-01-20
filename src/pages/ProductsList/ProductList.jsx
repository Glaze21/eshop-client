import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setAllProducts,
  addToCart,
  setProduct,
} from "../../redux/actions";
import ProductCard from "./ProductCard";
import getCurrencySign from "../../util/currencies";
import getPriceAmount from "../../util/amounts";

import { Category, Container } from "./ProductList.elements";

const ProductList = ({ match, history }) => {
  const dispatch = useDispatch();
  const { categories, activeCategory, activeCurrency, productList, product } =
    useSelector((state) => state.root);

  useEffect(() => {
    dispatch(setCategory(match.params.category));
    dispatch(setAllProducts(match.params.category, history)).catch(() => {
      history.push(categories[0]);
    });
  }, [dispatch, match.params.category, history, categories]);

  useEffect(() => {
    if (match.params.category !== activeCategory) {
      dispatch(setAllProducts(activeCategory)).catch(() => {
        history.push(categories[0]);
        dispatch(setCategory(match.params.category));
        dispatch(setAllProducts(activeCategory));
      });
    }
  }, [dispatch, match.params.category, activeCategory, history, categories]);

  const handleAddToCart = (productId) => {
    dispatch(setProduct(productId)).then(() => {
      if (product.inStock) {
        const attributes = {};
        product.attributes.forEach((attribute) => {
          attributes[attribute.name] = attribute.items[0].id;
        });

        const data = {
          id: product.id,
          brand: product.brand,
          name: product.name,
          gallery: product.gallery,
          amount: 1,
          attributes: product.attributes,
          selectedAttributes: attributes,
          prices: product.prices,
        };
        dispatch(addToCart(data));
      }
    });
  };

  return (
    <Container>
      <div>
        <Category>{activeCategory}</Category>
        <div className="flex-container">
          {productList.map((product, key) => (
            <ProductCard
              product={product}
              key={key}
              price={
                getCurrencySign(activeCurrency) +
                " " +
                getPriceAmount(product.prices, activeCurrency)
              }
              onHandleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductList;
