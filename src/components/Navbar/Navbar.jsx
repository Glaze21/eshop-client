import React, { useState, useRef, useEffect } from "react";
import {
  Nav,
  NavBtn,
  NavMenu,
  NavLogo,
  CurrencyContainer,
  CartContainer,
  ModalBackdrop,
} from "./Navbar.elements";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllCurrencies,
  setAllCategories,
  setCategory,
} from "../../redux/actions";
import CurrencyPopUpMenu from "../Currency/CurrencyPopUpMenu";
import MinicartPopUpMenu from "../Minicart/MinicartPopUpMenu";
import getCurrencySign from "../../util/currencies";
import getCartQuantity from "../../util/cartQuantity";

const Header = () => {
  const dispatch = useDispatch();
  const { categories, activeCategory, activeCurrency, cart } = useSelector(
    (state) => state.root
  );

  const [currencyPopUpMenu, setCurrencyPopUpMenu] = useState(false);
  const [minicartPopUpMenu, setMinicartPopUpMenu] = useState(false);
  const backdropRef = useRef(null);

  useEffect(() => {
    dispatch(setAllCurrencies());
    dispatch(setAllCategories());
  }, [dispatch]);

  const toggleCurrencyPopUpMenu = () => {
    setCurrencyPopUpMenu(!currencyPopUpMenu);
  };

  const toggleMinicartPopUpMenu = () => {
    const element = backdropRef.current;
    element.style.display = minicartPopUpMenu ? "none" : "block";
    setMinicartPopUpMenu(!minicartPopUpMenu);
  };

  const handleChangeCategory = (category) => {
    dispatch(setCategory(category));
  };

  return (
    <Nav>
      <div className="backdrop" ref={backdropRef} />
      <div>
        <NavMenu>
          {categories &&
            categories.map((category, key) => (
              <NavBtn
                value={category}
                to={`/${category}`}
                key={key}
                active={(category === activeCategory).toString()}
                onClick={() => handleChangeCategory(category)}
              >
                {category}
              </NavBtn>
            ))}
        </NavMenu>
        <NavLogo src="/logo.svg" alt="Logo" />
        <NavMenu>
          <CurrencyContainer
            onClick={toggleCurrencyPopUpMenu}
            active={currencyPopUpMenu.toString()}
          >
            {getCurrencySign(activeCurrency) + " " + activeCurrency}
            <img src="/arrow.svg" alt="" />
          </CurrencyContainer>
          <CartContainer
            onClick={toggleMinicartPopUpMenu}
            active={minicartPopUpMenu.toString()}
          >
            <img src="/empty-cart.svg" alt="cart" />
            {cart.length > 0 && <p key={cart[0].id}>{getCartQuantity(cart)}</p>}
          </CartContainer>
          {currencyPopUpMenu && (
            <>
              <CurrencyPopUpMenu onItemClick={toggleCurrencyPopUpMenu} />
              <ModalBackdrop onClick={toggleCurrencyPopUpMenu} />
            </>
          )}
          {minicartPopUpMenu && (
            <>
              <MinicartPopUpMenu onItemClick={toggleMinicartPopUpMenu} />
              <ModalBackdrop onClick={toggleMinicartPopUpMenu} />
            </>
          )}
        </NavMenu>
      </div>
    </Nav>
  );
};

export default Header;
