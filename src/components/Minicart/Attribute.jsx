import React, { Component } from "react";

//CSS
import {
  AttributeContainer,
  SizeBoxText,
  SizeBoxSwatch,
} from "./MinicartPopUpMenu.elements";

export class Attribute extends Component {
  setActiveAttribute(name, value) {
    this.props.onSetActiveAttribute(name, value);
  }

  render() {
    const { attribute, selectedAttributes } = this.props;
    return (
      <AttributeContainer>
        <p>{attribute.name}:</p>
        <div>
          {attribute.items.map((attributeItem, key) => (
            <div key={key}>
              {attribute.type === "text" ? (
                <SizeBoxText
                  onClick={this.setActiveAttribute.bind(
                    this,
                    attribute.id,
                    attributeItem.id
                  )}
                  active={(
                    attributeItem.id === selectedAttributes[attribute.id]
                  ).toString()}
                >
                  <p>{attributeItem.value}</p>
                </SizeBoxText>
              ) : attribute.type === "swatch" ? (
                <SizeBoxSwatch
                  color={attributeItem.value}
                  onClick={this.setActiveAttribute.bind(
                    this,
                    attribute.id,
                    attributeItem.id
                  )}
                  active={(
                    attributeItem.id === selectedAttributes[attribute.id]
                  ).toString()}
                />
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      </AttributeContainer>
    );
  }
}

export default Attribute;
