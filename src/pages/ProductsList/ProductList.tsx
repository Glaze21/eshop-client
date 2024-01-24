import { useEffect } from 'react';
import ProductCard from './ProductCard';
import getCurrencySign from '../../util/currencies';
import getPriceAmount from '../../util/amounts';
import { useParams } from 'react-router-dom';

import { Category, Container } from './ProductList.elements';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const ProductList = () => {
    const dispatch = useAppDispatch();
    const { categories, activeCategory, activeCurrency, productList, product } = useAppSelector((state) => state.app);
    const category = useParams();

    useEffect(() => {
        //dispatch(setCategory(category));
        //dispatch(setAllProducts(category, window.history)).catch(() => {
        // window.history.go(categories[0]);
        // });
    }, [category, categories]);

    useEffect(() => {
        // if (category !== activeCategory) {
        //     dispatch(setAllProducts(activeCategory)).catch(() => {
        //         // window.history.go(categories[0]);
        //         dispatch(setCategory(category));
        //         dispatch(setAllProducts(activeCategory));
        //     });
        // }
    }, [category, activeCategory, categories]);

    const getPrice = (): string => {
        return `${getCurrencySign(activeCurrency)} ${getPriceAmount(product.prices, activeCurrency)}`;
    };

    const handleAddToCart = (productId) => {
        // dispatch(setProduct(productId)).then(() => {
        //     if (product.inStock) {
        //         const attributes = {};
        //         product.attributes.forEach((attribute) => {
        //             attributes[attribute.name] = attribute.items[0].id;
        //         });
        //         const data = {
        //             id: product.id,
        //             brand: product.brand,
        //             name: product.name,
        //             gallery: product.gallery,
        //             amount: 1,
        //             attributes: product.attributes,
        //             selectedAttributes: attributes,
        //             prices: product.prices,
        //         };
        //         dispatch(addToCart(data));
        //     }
        // });
    };

    return (
        <Container>
            <div>
                <Category>{activeCategory}</Category>
                <div className="flex-container">
                    {productList.map((product: any, key: React.Key) => (
                        <ProductCard product={product} key={key} price={getPrice()} onHandleAddToCart={handleAddToCart} />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default ProductList;
