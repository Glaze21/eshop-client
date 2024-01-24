import React from "react";

// CSS
import {
  AttributeContainer,
  SizeBoxText,
  SizeBoxSwatch,
} from "./Product.element";

const Attribute = ({ attribute, attributes, onSetActiveAttribute }) => {
  const setActiveAttribute = (name, value) => {
    onSetActiveAttribute(name, value);
  };

  return (
    <AttributeContainer>
      <p>{attribute.name}:</p>
      <div>
        {attribute.items.map((item, key) => (
          <div key={key}>
            {attribute.type === "text" ? (
              <SizeBoxText
                onClick={() => setActiveAttribute(attribute.id, item.id)}
                active={(item.id === attributes[attribute.id]).toString()}
              >
                <p>{item.value}</p>
              </SizeBoxText>
            ) : attribute.type === "swatch" ? (
              <SizeBoxSwatch
                color={item.value}
                onClick={() => setActiveAttribute(attribute.id, item.id)}
                active={(item.id === attributes[attribute.id]).toString()}
              />
            ) : (
              <div />
            )}
          </div>
        ))}
      </div>
    </AttributeContainer>
  );
};

export default Attribute;
