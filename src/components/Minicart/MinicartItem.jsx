import React, { Component } from "react";
import Attribute from "./Attribute";

//CSS
import { ListItem } from "./MinicartPopUpMenu.elements";

export class MinicartItem extends Component {
  handleAmount(item, increase) {
    this.props.onHandleAmount(item, increase);
  }

  setActiveAttribute(item, name, value) {
    this.props.onSetActiveAttribute(item, name, value);
  }

  render() {
    const { item, price } = this.props;
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
                  onSetActiveAttribute={this.setActiveAttribute.bind(
                    this,
                    item
                  )}
                />
              ))}
            </div>
          )}
        </div>
        <div className="amount-container">
          <img
            src="/plus-square.svg"
            onClick={this.handleAmount.bind(this, item, true)}
            alt="+"
          />
          <p>{item.amount}</p>
          <img
            src="/minus-square.svg"
            onClick={this.handleAmount.bind(this, item, false)}
            alt="-"
          />
        </div>
        <div className="img-container">
          <img src={item.gallery[0]} alt="" />
        </div>
      </ListItem>
    );
  }
}

export default MinicartItem;
