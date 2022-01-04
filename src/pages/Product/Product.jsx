import React, { Component } from "react";
import { connect } from "react-redux";
import { setProduct, addToCart, resetProduct } from "../../redux/actions";
import getCurrencySign from "../../util/currencies";
import getPriceAmount from "../../util/amounts";
import DOMPurify from "dompurify";

//CSS
import {
  Container,
  LeftContainer,
  RightContainer,
  PriceContainer,
  AddToCartBtn,
} from "./Product.element";
import Attribute from "./Attribute";

export class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: {},
      selectedImg: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.setActiveAttribute = this.setActiveAttribute.bind(this);
  }

  componentDidMount() {
    this.props
      .setProduct(this.props.match.params.id)
      .then(() => {
        this.props.product.attributes.forEach((attribute) => {
          this.setActiveAttribute(attribute.name, attribute.items[0].id);
        });
      })
      .catch(() => {
        this.props.history.replace("/");
      });
  }

  componentWillUnmount() {
    this.props.resetProduct();
  }

  handleChange(value) {
    this.setState({
      selectedImg: value,
    });
  }

  setActiveAttribute(name, value) {
    this.setState((prevState) => {
      let attributes = { ...prevState.attributes };
      attributes[name] = value;
      return { attributes };
    });
  }

  handleAddToCart() {
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
      this.props.addToCart(data);
    }
  }

  render() {
    const { product, activeCurrency } = this.props;
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
                      onClick={this.handleChange.bind(this, key)}
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
                      <Attribute
                        attribute={attribute}
                        attributes={this.state.attributes}
                        key={key}
                        onSetActiveAttribute={this.setActiveAttribute}
                      />
                    ))}
                  </div>
                )}
                <PriceContainer>
                  <p className="price">Price:</p>
                  <p className="amount">
                    {getCurrencySign(activeCurrency) +
                      " " +
                      getPriceAmount(product.prices, activeCurrency)}
                  </p>
                </PriceContainer>
                <AddToCartBtn
                  onClick={this.handleAddToCart}
                  inStock={product.inStock.toString()}
                >
                  {product.inStock ? <p>Add to Cart</p> : <p>Out of Stock</p>}
                </AddToCartBtn>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product.description),
                  }}
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
  product: state.root.product,
});

const mapActionsToProps = {
  setProduct: setProduct,
  addToCart: addToCart,
  resetProduct: resetProduct,
};

export default connect(mapStateToProps, mapActionsToProps)(ProductPage);
