import React, { Component } from "react";
import { connect } from "react-redux";
import { setProduct, addToCart } from "../../redux/actions";
import {
  Container,
  LeftContainer,
  RightContainer,
  AttributeContainer,
  PriceContainer,
  AddToCartBtn,
  SizeBoxText,
  SizeBoxSwatch,
} from "./Product.element";
import getCurrencySign from "../../util/currencies";

export class Product extends Component {
  state = {
    selectedImg: 0,
    attributes: {},
  };

  componentDidMount() {
    this.props
      .setProduct(this.props.match.params.id)
      .then(() => {
        this.props.product.attributes.forEach((attribute) => {
          this.setActiveAttribute(attribute.name, attribute.items[0].id);
        });
      })
      .catch(() => {
        window.location.assign("/");
      });
  }

  handleChange = (value) => {
    this.setState({
      selectedImg: value,
    });
  };

  handleAddToCart = () => {
    const { product } = this.props;
    if (product.inStock) {
      const data = {
        id: product.id,
        brand: product.brand,
        name: product.name,
        gallery: product.gallery,
        amount: 1,
        attributes: product.attributes,
        selectedAttributes: this.state.attributes,
        prices: product.prices,
      };
      this.props.addToCart(data, true);
    }
  };

  setActiveAttribute = (name, value) => {
    this.setState((prevState) => {
      let attributes = { ...prevState.attributes };
      attributes[name] = value;
      return { attributes };
    });
  };

  render() {
    const { product } = this.props;
    return (
      <div>
        {product && (
          <Container>
            <div>
              <LeftContainer>
                <div className="gallery">
                  {product.gallery.map((image, key) => (
                    <img
                      key={key}
                      src={image}
                      onClick={() => this.handleChange(key)}
                      alt=""
                    />
                  ))}
                </div>
                <div className="display-picture">
                  <div>
                    <img src={product.gallery[this.state.selectedImg]} alt="" />
                  </div>
                </div>
              </LeftContainer>
              <RightContainer>
                <p className="brand">{product.brand}</p>
                <p className="name">{product.name}</p>
                {product.attributes.length !== 0 && (
                  <div>
                    {product.attributes.map((attribute, key) => (
                      <AttributeContainer key={key}>
                        <p>{attribute.name}:</p>
                        <div>
                          {attribute.items.map((item, key) => (
                            <div key={key}>
                              {attribute.type === "text" ? (
                                <SizeBoxText
                                  onClick={() =>
                                    this.setActiveAttribute(
                                      attribute.id,
                                      item.id
                                    )
                                  }
                                  active={(
                                    item.id ===
                                    this.state.attributes[attribute.id]
                                  ).toString()}
                                >
                                  <p>{item.value}</p>
                                </SizeBoxText>
                              ) : attribute.type === "swatch" ? (
                                <SizeBoxSwatch
                                  color={item.value}
                                  onClick={() =>
                                    this.setActiveAttribute(
                                      attribute.id,
                                      item.id
                                    )
                                  }
                                  active={(
                                    item.id ===
                                    this.state.attributes[attribute.id]
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
                <PriceContainer>
                  <p className="price">Price:</p>
                  <p className="amount">
                    {getCurrencySign(this.props.activeCurrency) +
                      " " +
                      product.prices.find(
                        (e) => e.currency === this.props.activeCurrency
                      ).amount}
                  </p>
                </PriceContainer>
                <AddToCartBtn
                  onClick={this.handleAddToCart}
                  inStock={product.inStock.toString()}
                >
                  {product.inStock ? <p>Add to Cart</p> : <p>Out of Stock</p>}
                </AddToCartBtn>
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              </RightContainer>
            </div>
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCurrency: state.root.activeCurrency,
  activeCategory: state.root.activeCategory,
  productList: state.root.productList,
  product: state.root.product,
});

const mapActionsToProps = {
  setProduct: setProduct,
  addToCart: addToCart,
};

export default connect(mapStateToProps, mapActionsToProps)(Product);
