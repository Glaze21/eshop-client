import React, { Component } from "react";
import Attribute from "./Attribute";
import { ListItem } from "./Cart.elements";

export class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImg: 0,
    };
    this.handleImgChange = this.handleImgChange.bind(this);
  }

  handleAmount(item, increase) {
    this.props.onHandleAmount(item, increase);
  }

  setActiveAttribute(item, name, value) {
    this.props.onSetActiveAttribute(item, name, value);
  }

  handleImgChange(next, max) {
    if (next && this.state.currentImg + 1 !== max) {
      this.setState((state) => ({
        currentImg: (state.currentImg += 1),
      }));
    } else if (!next && this.state.currentImg !== 0) {
      this.setState((state) => ({
        currentImg: (state.currentImg -= 1),
      }));
    }
  }

  render() {
    const { item, price } = this.props;
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
                    onSetActiveAttribute={this.setActiveAttribute.bind(
                      this,
                      item
                    )}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="right-container">
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
              <img src={item.gallery[this.state.currentImg]} alt="" />
              {item.gallery.length !== 1 && (
                <>
                  <img
                    className="arrow-right"
                    src="img-arrow.svg"
                    alt=""
                    onClick={this.handleImgChange.bind(
                      this,
                      true,
                      item.gallery.length
                    )}
                  />
                  <img
                    className="arrow-left"
                    src="img-arrow.svg"
                    alt=""
                    onClick={this.handleImgChange.bind(
                      this,
                      false,
                      item.gallery.length
                    )}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </ListItem>
    );
  }
}

export default CartItem;
