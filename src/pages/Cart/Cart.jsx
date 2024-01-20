import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, List } from "./Cart.elements";
import {
  addToCart,
  removeFromCart,
  changeAttribute,
} from "../../redux/actions";
import CartItem from "./CartItem";
import getCurrencySign from "../../util/currencies";
import getPriceAmount from "../../util/amounts";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, activeCurrency } = useSelector((state) => state.root);

  const handleAmount = (item, increase) => {
    if (increase) {
      dispatch(addToCart(item));
    } else {
      dispatch(removeFromCart(item));
    }
  };

  const setActiveAttribute = (item, name, value) => {
    let newItem = {
      ...item,
      selectedAttributes: { ...item.selectedAttributes, [name]: value },
    };
    dispatch(changeAttribute(item, newItem));
  };

  return (
    <Container>
      <div>
        <p className="title">Cart</p>
        <List>
          {cart.map((item, key) => (
            <CartItem
              item={item}
              key={key}
              price={
                getCurrencySign(activeCurrency) +
                getPriceAmount(item.prices, activeCurrency)
              }
              onHandleAmount={handleAmount}
              onSetActiveAttribute={setActiveAttribute}
            />
          ))}
        </List>
      </div>
    </Container>
  );
};

export default Cart;
