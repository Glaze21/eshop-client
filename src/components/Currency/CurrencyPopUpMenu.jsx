import React from "react";
import { Container, List, ListItem } from "./CurrencyPopUpMenu.elements";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../../redux/actions";
import getCurrencySign from "../../util/currencies";

const CurrencyPopUpMenu = ({ onItemClick }) => {
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.root.currencies);

  const handleClick = (currency) => {
    dispatch(setCurrency(currency));
    onItemClick();
  };

  return (
    <Container>
      <List>
        {currencies.map((currency, key) => (
          <ListItem key={key} onClick={() => handleClick(currency)}>
            {getCurrencySign(currency) + " " + currency}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CurrencyPopUpMenu;
