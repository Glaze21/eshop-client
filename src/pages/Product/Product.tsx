import { useState, useEffect, Fragment } from 'react';
import getCurrencySign from '../../util/currencies';
import getPriceAmount from '../../util/amounts';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';

import { Container, LeftContainer, RightContainer, PriceContainer, AddToCartBtn } from './Product.element';
import Attribute from './Attribute';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const ProductPage = () => {
    const dispatch = useAppDispatch();
    const { activeCurrency, product } = useAppSelector((state) => state.app);
    const [attributes, setAttributes] = useState({});
    const [selectedImg, setSelectedImg] = useState(0);
    const productId = useParams();

    useEffect(() => {
        // dispatch(setProduct(productId))
        //     .then(() => {
        //         const initialAttributes = {};
        //         product.attributes.forEach((attribute) => {
        //             initialAttributes[attribute.name] = attribute.items[0].id;
        //         });
        //         setAttributes(initialAttributes);
        //     })
        //     .catch(() => {
        //         // window.history.replace("/");
        //     });
        // return () => {
        //     dispatch(resetProduct());
        // };
    }, [dispatch, productId, window.history]);

    const handleChange = (value) => {
        setSelectedImg(value);
    };

    const setActiveAttribute = (name, value) => {
        setAttributes((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleAddToCart = () => {
        if (product.inStock) {
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
            //dispatch(addToCart(data));
        }
    };

    return (
        <Fragment>
            {product && (
                <Container>
                    <div>
                        <LeftContainer>
                            <div className="gallery">
                                {product.gallery.map((image, key) => (
                                    <img key={key} src={image} onClick={() => handleChange(key)} alt="" />
                                ))}
                            </div>
                            <div className="display-picture">
                                <div>
                                    <img src={product.gallery[selectedImg]} alt="" />
                                </div>
                            </div>
                        </LeftContainer>
                        <RightContainer>
                            <p className="brand">{product.brand}</p>
                            <p className="name">{product.name}</p>
                            {product.attributes.length !== 0 && (
                                <div>
                                    {product.attributes.map((attribute, key) => (
                                        <Attribute
                                            attribute={attribute}
                                            attributes={attributes}
                                            key={key}
                                            onSetActiveAttribute={setActiveAttribute}
                                        />
                                    ))}
                                </div>
                            )}
                            <PriceContainer>
                                <p className="price">Price:</p>
                                <p className="amount">
                                    {getCurrencySign(activeCurrency) + ' ' + getPriceAmount(product.prices, activeCurrency)}
                                </p>
                            </PriceContainer>
                            <AddToCartBtn onClick={handleAddToCart} inStock={product.inStock.toString()}>
                                {product.inStock ? <p>Add to Cart</p> : <p>Out of Stock</p>}
                            </AddToCartBtn>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(product.description),
                                }}
                            ></div>
                        </RightContainer>
                    </div>
                </Container>
            )}
        </Fragment>
    );
};

export default ProductPage;
