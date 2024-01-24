import React from "react";
import { List } from "./Cart.elements";
import {
  addToCart,
  removeFromCart,
  changeAttribute,
} from "../../redux/actions";
import CartItem from "./CartItem";
import getCurrencySign from "../../util/currencies";
import getPriceAmount from "../../util/amounts";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart, activeCurrency } = useAppSelector((state) => state.root);

  const handleAmount = (item, increase) =>
    dispatch(increase ? addToCart(item) : removeFromCart(item));

  const setActiveAttribute = (item, name, value) => {
    let newItem = {
      ...item,
      selectedAttributes: { ...item.selectedAttributes, [name]: value },
    };
    dispatch(changeAttribute(item, newItem));
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Cart;
