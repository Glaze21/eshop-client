import React, { Component } from "react";
import { Container, List, ListItem } from "./CurrencyPopUpMenu.elements";
import { connect } from "react-redux";
import { setCurrency } from "../../redux/actions";
import getCurrencySign from "../../util/currencies";

export class CurrencyPopUpMenu extends Component {
  handleClick = (curr, e) => {
    this.props.setCurrency(curr);
  };

  render() {
    const { currencies } = this.props;
    return (
      <Container>
        <List>
          {currencies.map((curr, key) => {
            return (
              <ListItem key={key} onClick={() => this.handleClick(curr)}>
                {getCurrencySign(curr) + " " + curr}
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
