import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, List, ListItem } from "./Cart.elements";
import { addToCart } from "../../redux/actions";
import getCurrencySign from "../../util/currencies";
import {
  AttributeContainer,
  SizeBoxText,
  SizeBoxSwatch,
} from "../Product/Product.element";

export class Cart extends Component {
  state = {
    currentImg: [],
  };
  componentDidMount() {
    let arr = [];
    this.props.cart.forEach(() => {
      arr.push(0);
    });

    this.setState({
      currentImg: arr,
    });
  }

  handleAmount = (item, increase, e) => {
    this.props.addToCart(item, increase);
  };

  setActiveAttribute = (item, name, value) => {
    item.selectedAttributes[name] = value;
    this.props.addToCart(item);
  };

  handleImgChange = (next, max, key) => {
    let newArray = this.state.currentImg;
    if (next && this.state.currentImg[key] + 1 !== max) {
      newArray[key] += 1;
    } else if (!next && this.state.currentImg[key] !== 0) {
      newArray[key] -= 1;
    }
    this.setState({
      currentImg: newArray,
    });
  };

  render() {
    const { cart, activeCurrency } = this.props;
    return (
      <Container>
        <div>
          <p className="title">Cart</p>
          <List>
            {cart.map((item, key) => {
              return (
                <ListItem key={key}>
                  <hr />
                  <div>
                    <div className="description-container">
                      <div>
                        <p className="brand">{item.brand}</p>
                        <p className="name">{item.name}</p>
                      </div>
                      <p className="price">
                        {getCurrencySign(activeCurrency) +
                          item.prices.find((e) => e.currency === activeCurrency)
                            .amount}
                      </p>
                      {item.attributes.length !== 0 && (
                        <div>
                          {item.attributes.map((attribute, key) => (
                            <AttributeContainer key={key}>
                              <p>{attribute.name}:</p>
                              <div>
                                {attribute.items.map((attributeItem, _key) => (
                                  <div key={_key}>
                                    {attribute.type === "text" ? (
                                      <SizeBoxText
                                        onClick={() =>
                                          this.setActiveAttribute(
                                            item,
                                            attribute.id,
                                            attributeItem.id
                                          )
                                        }
                                        active={(
                                          attributeItem.displayValue ===
                                          item.selectedAttributes[
                                            Object.keys(
                                              item.selectedAttributes
                                            )[key]
                                          ]
                                        ).toString()}
                                      >
                                        <p>{attributeItem.value}</p>
                                      </SizeBoxText>
                                    ) : attribute.type === "swatch" ? (
                                      <SizeBoxSwatch
                                        color={attributeItem.value}
                                        onClick={() =>
                                          this.setActiveAttribute(
                                            item,
                                            attribute.id,
                                            attributeItem.id
                                          )
                                        }
                                        active={(
                                          attributeItem.displayValue ===
                                          item.selectedAttributes[
                                            Object.keys(
                                              item.selectedAttributes
                                            )[key]
                                          ]
                                        ).toString()}
                                      />
                                    ) : (
                                      <div />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </AttributeContainer>
                          ))}
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1 }} />
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
                    <div className="img-container">
                      <img
                        src={item.gallery[this.state.currentImg[key]]}
                        alt=""
                      />
                      {item.gallery.length !== 1 && (
                        <>
                          <img
                            className="arrow-right"
                            src="img-arrow.svg"
                            alt=""
                            onClick={() =>
                              this.handleImgChange(
                                true,
                                item.gallery.length,
                                key
                              )
                            }
                          />
                          <img
                            className="arrow-left"
                            src="img-arrow.svg"
                            alt=""
                            onClick={() =>
                              this.handleImgChange(
                                false,
                                item.gallery.length,
                                key
                              )
                            }
                          />
                        </>
                      )}
                    </div>
                  </div>
                </ListItem>
              );
            })}
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
};

export default connect(mapStateToProps, mapActionsToProps)(Cart);
