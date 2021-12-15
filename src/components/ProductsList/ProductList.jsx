import React, { Component } from "react";
import { connect } from "react-redux";
import { setCategory, setAllProducts } from "../../redux/actions";
import { Category, Container, Card, Price, Name } from "./ProductList.elements";
import getCurrencySign from "../../util/currencies";

export class ProductList extends Component {
  componentDidMount() {
    this.props.setCategory(this.props.match.params.category);
    this.props.setAllProducts(this.props.match.params.category).catch(() => {
      window.location.assign(this.props.categories[0]);
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.props.setAllProducts(this.props.activeCategory);
    }
  }

  render() {
    return (
      <Container>
        <div>
          <Category>{this.props.activeCategory}</Category>
          <div className="flex-container">
            {this.props.productList.map((product, key) => (
              <Card
                key={key}
                to={`/product/${product.id}`}
                instock={product.inStock.toString()}
              >
                <img src={product.picture} alt="" />
                {!product.inStock && (
                  <p className="out-of-stock-text">out of stock</p>
                )}
                <Name>{product.name}</Name>
                <Price>
                  {getCurrencySign(this.props.activeCurrency) +
                    " " +
                    product.prices.find(
                      (e) => e.currency === this.props.activeCurrency
                    ).amount}
                </Price>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.root.categories,
  activeCurrency: state.root.activeCurrency,
  activeCategory: state.root.activeCategory,
  productList: state.root.productList,
});

const mapActionsToProps = {
  setAllProducts: setAllProducts,
  setCategory: setCategory,
};

export default connect(mapStateToProps, mapActionsToProps)(ProductList);
