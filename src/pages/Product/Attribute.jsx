import React, { Component } from "react";

//CSS
import {
  AttributeContainer,
  SizeBoxText,
  SizeBoxSwatch,
} from "./Product.element";

export class Attribute extends Component {
  setActiveAttribute(name, value) {
    this.props.onSetActiveAttribute(name, value);
  }
  render() {
    const { attribute, attributes } = this.props;

    return (
      <AttributeContainer>
        <p>{attribute.name}:</p>
        <div>
          {attribute.items.map((item, key) => (
            <div key={key}>
              {attribute.type === "text" ? (
                <SizeBoxText
                  onClick={this.setActiveAttribute.bind(
                    this,
                    attribute.id,
                    item.id
                  )}
                  active={(item.id === attributes[attribute.id]).toString()}
                >
                  <p>{item.value}</p>
                </SizeBoxText>
              ) : attribute.type === "swatch" ? (
                <SizeBoxSwatch
                  color={item.value}
                  onClick={this.setActiveAttribute.bind(
                    this,
                    attribute.id,
                    item.id
                  )}
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
  }
}

export default Attribute;
