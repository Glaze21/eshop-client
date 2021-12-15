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
import CurrencyPopUpMenu from "./CurrencyPopUpMenu";
import MinicartPopUpMenu from "./MinicartPopUpMenu";
import getCurrencySign from "../../util/currencies";

export class Header extends Component {
  state = {
    currencyPopUpMenu: false,
    minicartPopUpMenu: false,
    activeCategory: "",
    amountOfItems: 0,
  };

  componentDidMount() {
    this.props.setAllCurrencies();
    this.props.setAllCategories();
  }

  setCurrencyPopUpMenu = () => {
    this.setState((prevState) => ({
      currencyPopUpMenu: !prevState.currencyPopUpMenu,
    }));
  };

  setMinicartPopUpMenu = () => {
    var element = document.getElementById("backdrop");
    if (!this.state.minicartPopUpMenu) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    this.setState((prevState) => ({
      minicartPopUpMenu: !prevState.minicartPopUpMenu,
    }));
  };

  handleChangeCategory(e, category) {
    this.props.setCategory(category);
  }

  render() {
    const { categories, activeCategory, activeCurrency, cart } = this.props;
    return (
      <Nav>
        <div>
          <NavMenu>
            {categories &&
              categories.map((category, key) => (
                <NavBtn
                  value={category}
                  to={`/${category}`}
                  key={key}
                  active={(category === activeCategory).toString()}
                  onClick={(e) => this.handleChangeCategory(e, category)}
                >
                  {category}
                </NavBtn>
              ))}
          </NavMenu>
          <NavLogo src="/logo.svg" alt="Logo" />
          <NavMenu>
            <CurrencyContainer
              onClick={this.setCurrencyPopUpMenu}
              active={this.state.currencyPopUpMenu.toString()}
            >
              {getCurrencySign(activeCurrency) + " " + activeCurrency}
              <img src="/arrow.svg" alt="" />
            </CurrencyContainer>
            <CartContainer
              onClick={this.setMinicartPopUpMenu}
              active={this.state.minicartPopUpMenu.toString()}
            >
              <img src="/empty-cart.svg" alt="cart" />
              {cart.length > 0 && <p key={cart[0].id}>{cart.length}</p>}
            </CartContainer>
            {this.state.currencyPopUpMenu && (
              <>
                <CurrencyPopUpMenu />
                <ModalBackdrop onClick={this.setCurrencyPopUpMenu} />
              </>
            )}
            {this.state.minicartPopUpMenu && (
              <>
                <MinicartPopUpMenu />
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
