import React from "react";
import Attribute from "./Attribute";
import { ListItem } from "./MinicartPopUpMenu.elements";

const MinicartItem = ({
  item,
  price,
  onHandleAmount,
  onSetActiveAttribute,
}) => {
  const handleAmount = (increase) => onHandleAmount(item, increase);
  const setActiveAttribute = (name, value) =>
    onSetActiveAttribute(item, name, value);

  return (
    <ListItem>
      <div className="description-container">
        <div>
          {item.brand} <br />
          {item.name} <br />
        </div>
        <p className="price">{price}</p>
        {item.attributes.length !== 0 && (
          <div>
            {item.attributes.map((attribute, key) => (
              <Attribute
                key={key}
                attribute={attribute}
                selectedAttributes={item.selectedAttributes}
                onSetActiveAttribute={(name, value) =>
                  setActiveAttribute(name, value)
                }
              />
            ))}
          </div>
        )}
      </div>
      <div className="amount-container">
        <img
          src="/plus-square.svg"
          onClick={() => handleAmount(true)}
          alt="+"
        />
        <p>{item.amount}</p>
        <img
          src="/minus-square.svg"
          onClick={() => handleAmount(false)}
          alt="-"
        />
      </div>
      <div className="img-container">
        <img src={item.gallery[0]} alt="" />
      </div>
    </ListItem>
  );
};

export default MinicartItem;
