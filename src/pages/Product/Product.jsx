import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, addToCart, resetProduct } from "../../redux/actions";
import getCurrencySign from "../../util/currencies";
import getPriceAmount from "../../util/amounts";
import DOMPurify from "dompurify";

// CSS
import {
  Container,
  LeftContainer,
  RightContainer,
  PriceContainer,
  AddToCartBtn,
} from "./Product.element";
import Attribute from "./Attribute";

const ProductPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const { activeCurrency, product } = useSelector((state) => state.root);
  const [attributes, setAttributes] = useState({});
  const [selectedImg, setSelectedImg] = useState(0);

  useEffect(() => {
    dispatch(setProduct(match.params.id))
      .then(() => {
        const initialAttributes = {};
        product.attributes.forEach((attribute) => {
          initialAttributes[attribute.name] = attribute.items[0].id;
        });
        setAttributes(initialAttributes);
      })
      .catch(() => {
        history.replace("/");
      });

    return () => {
      dispatch(resetProduct());
    };
  }, [dispatch, match.params.id, history]);

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
      dispatch(addToCart(data));
    }
  };

  return (
    <div>
      {product && (
        <Container>
          <div>
            <LeftContainer>
              <div className="gallery">
                {product.gallery.map((image, key) => (
                  <img
                    key={key}
                    src={image}
                    onClick={() => handleChange(key)}
                    alt=""
                  />
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
                  {getCurrencySign(activeCurrency) +
                    " " +
                    getPriceAmount(product.prices, activeCurrency)}
                </p>
              </PriceContainer>
              <AddToCartBtn
                onClick={handleAddToCart}
                inStock={product.inStock.toString()}
              >
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
    </div>
  );
};

export default ProductPage;
