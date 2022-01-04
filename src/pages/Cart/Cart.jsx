import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, List } from "./Cart.elements";
import {
  addToCart,
  removeFromCart,
  changeAttribute,
} from "../../redux/actions";
import CartItem from "./CartItem";
import getCurrencySign from "../../util/currencies";
import getPriceAmount from "../../util/amounts";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.handleAmount = this.handleAmount.bind(this);
    this.setActiveAttribute = this.setActiveAttribute.bind(this);
  }

  handleAmount = (item, increase) => {
    if (increase) {
      this.props.addToCart(item);
    } else {
      this.props.removeFromCart(item);
    }
  };

  setActiveAttribute(item, name, value) {
    let newItem = item;
    newItem.selectedAttributes[name] = value;
    this.props.changeAttribute(item, newItem);
  }

  render() {
    const { cart, activeCurrency } = this.props;
    return (
      <Container>
        <div>
          <p className="title">Cart</p>
          <List>
            {cart.map((item, key) => (
              <CartItem
                item={item}
                key={key}
                price={
                  getCurrencySign(activeCurrency) +
                  getPriceAmount(item.prices, activeCurrency)
                }
                onHandleAmount={this.handleAmount}
                onSetActiveAttribute={this.setActiveAttribute}
              />
            ))}
          </List>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.root.cart,
  activeCurrency: state.root.activeCurrency,
});

const mapActionsToProps = {
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  changeAttribute: changeAttribute,
};

export default connect(mapStateToProps, mapActionsToProps)(Cart);
