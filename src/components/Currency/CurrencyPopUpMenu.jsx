import React, { Component } from "react";
import { Container, List, ListItem } from "./CurrencyPopUpMenu.elements";
import { connect } from "react-redux";
import { setCurrency } from "../../redux/actions";
import getCurrencySign from "../../util/currencies";

export class CurrencyPopUpMenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(currency) {
    this.props.setCurrency(currency);
    this.props.onItemClick();
  }

  render() {
    const { currencies } = this.props;
    return (
      <Container>
        <List>
          {currencies.map((currency, key) => {
            return (
              <ListItem
                key={key}
                onClick={this.handleClick.bind(this, currency)}
              >
                {getCurrencySign(currency) + " " + currency}
              </ListItem>
            );
          })}
        </List>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.root.currencies,
});

const mapActionsToProps = { setCurrency: setCurrency };

export default connect(mapStateToProps, mapActionsToProps)(CurrencyPopUpMenu);
