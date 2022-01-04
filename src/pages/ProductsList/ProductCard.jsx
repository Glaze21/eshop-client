import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//CSS
import { Price, CardContainer } from "./ProductList.elements";

export class Product extends Component {
  handleAddToCart(productId) {
    this.props.onHandleAddToCart(productId);
  }

  render() {
    const { product, key, price } = this.props;
    return (
      <CardContainer key={key} instock={product.inStock.toString()}>
        <Link className="card" to={`/product/${product.id}`}>
          <img src={product.picture} alt="" />
          {!product.inStock && (
            <p className="out-of-stock-text">out of stock</p>
          )}
          <p className="brand">{product.brand}</p>
          <p className="name">{product.name}</p>
          <Price>{price}</Price>
        </Link>
        <div
          className="addToCarFloatingtBtn"
          to="/aa"
          onClick={this.handleAddToCart.bind(this, product.id)}
        />
      </CardContainer>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Product);
