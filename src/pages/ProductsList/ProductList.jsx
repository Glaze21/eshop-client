import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setCategory,
  setAllProducts,
  addToCart,
  setProduct,
} from "../../redux/actions";
import ProductCard from "./ProductCard";
import getCurrencySign from "../../util/currencies";
import getPriceAmount from "../../util/amounts";

//CSS
import { Category, Container } from "./ProductList.elements";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    this.props.setCategory(this.props.match.params.category);
    this.props
      .setAllProducts(this.props.match.params.category, this.props.history)
      .catch(() => {
        this.props.history.push(this.props.categories[0]);
      });
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.props.setAllProducts(this.props.activeCategory).catch(() => {
        // If something went wrong (most likely wrong category in URL), then push to the first available category and try displaying products again
        this.props.history.push(this.props.categories[0]);
        this.props.setCategory(this.props.match.params.category);
        this.props.setAllProducts(this.props.activeCategory);
      });
    }
  }

  handleAddToCart(productId) {
    this.props.setProduct(productId).then(() => {
      const { product } = this.props;
      if (product.inStock) {
        const attributes = {};
        product.attributes.forEach((attribute) => {
          attributes[attribute.name] = attribute.items[0].id;
        });

        const data = {
          id: product.id,
          brand: product.brand,
          name: product.name,
          gallery: product.gallery,
          amount: 1,
          attributes: product.attributes,
          selectedAttributes: attributes,
          prices: product.prices,
        };
        this.props.addToCart(data);
      }
    });
  }

  render() {
    const { activeCategory, activeCurrency, productList } = this.props;
    return (
      <Container>
        <div>
          <Category>{activeCategory}</Category>
          <div className="flex-container">
            {productList.map((product, key) => (
              <ProductCard
                product={product}
                key={key}
                price={
                  getCurrencySign(activeCurrency) +
                  " " +
                  getPriceAmount(product.prices, activeCurrency)
                }
                onHandleAddToCart={this.handleAddToCart}
              />
            ))}
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.root.categories,
  activeCategory: state.root.activeCategory,
  activeCurrency: state.root.activeCurrency,
  productList: state.root.productList,
  product: state.root.product,
});

const mapActionsToProps = {
  setAllProducts: setAllProducts,
  setCategory: setCategory,
  addToCart: addToCart,
  setProduct: setProduct,
};

export default connect(mapStateToProps, mapActionsToProps)(ProductList);
