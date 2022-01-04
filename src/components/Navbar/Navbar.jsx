import React, { Component } from "react";
import {
  Nav,
  NavBtn,
  NavMenu,
  NavLogo,
  CurrencyContainer,
  CartContainer,
  ModalBackdrop,
} from "./Navbar.elements";
import {
  setAllCurrencies,
  setAllCategories,
  setCategory,
} from "../../redux/actions";
import { connect } from "react-redux";
import CurrencyPopUpMenu from "../Currency/CurrencyPopUpMenu";
import MinicartPopUpMenu from "../Minicart/MinicartPopUpMenu";
import getCurrencySign from "../../util/currencies";
import getCartQuantity from "../../util/cartQuantity";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyPopUpMenu: false,
      minicartPopUpMenu: false,
      activeCategory: "",
      amountOfItems: 0,
    };
    this.backdropRef = React.createRef();

    this.setCurrencyPopUpMenu = this.setCurrencyPopUpMenu.bind(this);
    this.setMinicartPopUpMenu = this.setMinicartPopUpMenu.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
  }

  componentDidMount() {
    this.props.setAllCurrencies();
    this.props.setAllCategories();
  }

  setCurrencyPopUpMenu() {
    this.setState((prevState) => ({
      currencyPopUpMenu: !prevState.currencyPopUpMenu,
    }));
  }

  setMinicartPopUpMenu() {
    var element = this.backdropRef.current;
    if (!this.state.minicartPopUpMenu) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    this.setState((prevState) => ({
      minicartPopUpMenu: !prevState.minicartPopUpMenu,
    }));
  }

  handleChangeCategory(category) {
    this.props.setCategory(category);
  }

  render() {
    const { categories, activeCategory, activeCurrency, cart } = this.props;
    const { currencyPopUpMenu, minicartPopUpMenu } = this.state;
    return (
      <Nav>
        <div className="backdrop" ref={this.backdropRef} />
        <div>
          <NavMenu>
            {categories &&
              categories.map((category, key) => (
                <NavBtn
                  value={category}
                  to={`/${category}`}
                  key={key}
                  active={(category === activeCategory).toString()}
                  onClick={this.handleChangeCategory.bind(this, category)}
                >
                  {category}
                </NavBtn>
              ))}
          </NavMenu>
          <NavLogo src="/logo.svg" alt="Logo" />
          <NavMenu>
            <CurrencyContainer
              onClick={this.setCurrencyPopUpMenu}
              active={currencyPopUpMenu.toString()}
            >
              {getCurrencySign(activeCurrency) + " " + activeCurrency}
              <img src="/arrow.svg" alt="" />
            </CurrencyContainer>
            <CartContainer
              onClick={this.setMinicartPopUpMenu}
              active={minicartPopUpMenu.toString()}
            >
              <img src="/empty-cart.svg" alt="cart" />
              {cart.length > 0 && (
                <p key={cart[0].id}>{getCartQuantity(cart)}</p>
              )}
            </CartContainer>
            {currencyPopUpMenu && (
              <>
                <CurrencyPopUpMenu onItemClick={this.setCurrencyPopUpMenu} />
                <ModalBackdrop onClick={this.setCurrencyPopUpMenu} />
              </>
            )}
            {minicartPopUpMenu && (
              <>
                <MinicartPopUpMenu onItemClick={this.setMinicartPopUpMenu} />
                <ModalBackdrop onClick={this.setMinicartPopUpMenu} />
              </>
            )}
          </NavMenu>
        </div>
      </Nav>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCategory: state.root.activeCategory,
  activeCurrency: state.root.activeCurrency,
  categories: state.root.categories,
  cart: state.root.cart,
});

const mapActionsToProps = {
  setAllCurrencies: setAllCurrencies,
  setAllCategories: setAllCategories,
  setCategory: setCategory,
};

export default connect(mapStateToProps, mapActionsToProps)(Header);
