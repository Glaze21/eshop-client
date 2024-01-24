import React from 'react';
import { Link } from 'react-router-dom';

import { Price, CardContainer } from './ProductList.elements';

const Product = ({ product, price, onHandleAddToCart }) => {
    const handleAddToCart = (productId) => {
        onHandleAddToCart(productId);
    };

    return (
        <CardContainer inStock={product.inStock.toString()}>
            <Link className="card" to={`/product/${product.id}`}>
                <img src={product.picture} alt="" />
                {!product.inStock && <p className="out-of-stock-text">out of stock</p>}
                <p className="brand">{product.brand}</p>
                <p className="name">{product.name}</p>
                <Price>{price}</Price>
            </Link>
            <div className="addToCarFloatingtBtn" onClick={() => handleAddToCart(product.id)} />
        </CardContainer>
    );
};

export default Product;
