import React, { useState } from "react";
import Attribute from "./Attribute";
import { ListItem } from "./Cart.elements";

const CartItem = ({ item, price, onHandleAmount, onSetActiveAttribute }) => {
  const [currentImg, setCurrentImg] = useState(0);

  const setActiveAttribute = (name, value) => {
    onSetActiveAttribute(item, name, value);
  };

  const handleImgChange = (next) => {
    if (next && currentImg + 1 < item.gallery.length) {
      setCurrentImg(currentImg + 1);
    } else {
      setCurrentImg(currentImg - 1);
    }
  };

  return (
    <ListItem>
      <hr />
      <div>
        <div className="left-container">
          <div>
            <p className="brand">{item.brand}</p>
            <p className="name">{item.name}</p>
          </div>
          <p className="price">{price}</p>
          {item.attributes.length !== 0 && (
            <div>
              {item.attributes.map((attribute, key) => (
                <Attribute
                  attribute={attribute}
                  selectedAttributes={item.selectedAttributes}
                  key={key}
                  onSetActiveAttribute={setActiveAttribute}
                />
              ))}
            </div>
          )}
        </div>
        <div className="right-container">
          <div className="amount-container">
            <img
              src="/plus-square.svg"
              onClick={() => onHandleAmount(item, true)}
              alt="+"
            />
            <p>{item.amount}</p>
            <img
              src="/minus-square.svg"
              onClick={() => onHandleAmount(item, false)}
              alt="-"
            />
          </div>
          <div className="img-container">
            <img src={item.gallery[currentImg]} alt="" />
            {item.gallery.length > 1 && (
              <>
                <img
                  className="arrow-right"
                  src="img-arrow.svg"
                  alt=""
                  onClick={() => handleImgChange(true)}
                />
                <img
                  className="arrow-left"
                  src="img-arrow.svg"
                  alt=""
                  onClick={() => handleImgChange(false)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </ListItem>
  );
};

export default CartItem;
