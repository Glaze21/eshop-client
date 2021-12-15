import React, { Component } from "react";
import {
  Container,
  List,
  ListItem,
  Total,
  TopContainer,
  ButtonContainer,
} from "./MinicartPopUpMenu.elements";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions";
import getCurrencySign from "../../util/currencies";
import { Link } from "react-router-dom";

export class MinicartPopUpMenu extends Component {
  handleAmount = (item, increase, e) => {
    this.props.addToCart(item, increase);
  };

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
              {cart.map((item, key) => {
                return (
                  <ListItem key={key}>
                    <div className="description-container">
                      <div>
                        {item.brand} <br />
                        {item.name} <br />
                      </div>
                      <p className="price">
                        {getCurrencySign(activeCurrency) +
                          item.prices.find((e) => e.currency === activeCurrency)
                            .amount}
                      </p>
                    </div>
                    <div className="amount-container">
                      <img
                        src="/plus-square.svg"
                        onClick={() => this.handleAmount(item, true)}
                        alt="+"
                      />
                      <p>{item.amount}</p>
                      <img
                        src="/minus-square.svg"
                        onClick={() => this.handleAmount(item, false)}
                        alt="-"
                      />
                    </div>
                    <div>
                      <img src={item.gallery[0]} alt="" />
                    </div>
                  </ListItem>
                );
              })}
            </List>
            <div style={{ flex: 1 }} />
            <Total>
              <p className="text">Total</p>
              <p className="amount">
                {total.length !== 0 ? (
                  <>
                    {getCurrencySign(activeCurrency) +
                      Math.round(
                        (total.find((e) => e.currency === activeCurrency)
                          .amount +
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
            <Link className="view-bag" to="/cart">
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
  total: state.root.total,
});

const mapActionsToProps = { addToCart: addToCart };

export default connect(mapStateToProps, mapActionsToProps)(MinicartPopUpMenu);
