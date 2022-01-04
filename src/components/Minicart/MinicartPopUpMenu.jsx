import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addToCart,
  removeFromCart,
  changeAttribute,
} from "../../redux/actions";
import getCurrencySign from "../../util/currencies";
import { Link } from "react-router-dom";
import getPriceAmount from "../../util/amounts";
import MinicartItem from "./MinicartItem";

//CSS
import {
  Container,
  List,
  Total,
  TopContainer,
  ButtonContainer,
} from "./MinicartPopUpMenu.elements";

export class MinicartPopUpMenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    this.props.onItemClick();
  }

  setActiveAttribute(item, name, value) {
    let newItem = item;
    newItem.selectedAttributes[name] = value;
    this.props.changeAttribute(item, newItem);
  }

  render() {
    const { cart, total, activeCurrency } = this.props;
    return (
      <Container>
        <div>
          <TopContainer>
            <div className="title-container">
              <p className="my-bag">My Bag,</p> <p className="items">2 items</p>
            </div>
            <List>
              {cart.map((item, key) => (
                <MinicartItem
                  key={key}
                  item={item}
                  price={
                    getCurrencySign(activeCurrency) +
                    getPriceAmount(item.prices, activeCurrency)
                  }
                  onHandleAmount={this.handleAmount}
                  onSetActiveAttribute={this.setActiveAttribute}
                />
              ))}
            </List>
            <div className="white-space" />
            <Total>
              <p className="text">Total</p>
              <p className="amount">
                {total.length !== 0 ? (
                  <>
                    {getCurrencySign(activeCurrency) +
                      Math.round(
                        (getPriceAmount(total, activeCurrency) +
                          Number.EPSILON) *
                          100
                      ) /
                        100}
                  </>
                ) : (
                  <>{getCurrencySign(activeCurrency) + 0}</>
                )}
              </p>
            </Total>
          </TopContainer>
          <ButtonContainer>
            <Link className="view-bag" to="/cart" onClick={this.handleClick}>
              View bag
            </Link>
            <button className="check-out">Check out</button>
          </ButtonContainer>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCurrency: state.root.activeCurrency,
  cart: state.root.cart,
  product: state.root.product,
  total: state.root.total,
});

const mapActionsToProps = {
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  changeAttribute: changeAttribute,
};

export default connect(mapStateToProps, mapActionsToProps)(MinicartPopUpMenu);
