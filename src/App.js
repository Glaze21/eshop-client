import React from "react";
import Navbar from "./components/Navbar/Navbar";
import ProductList from "./pages/ProductsList/ProductList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { client } from "@tilework/opus";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";

// client.setEndpoint("https://eshop-654.herokuapp.com/");
client.setEndpoint("http://localhost:4000/");

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/cart" component={Cart} />
            <Route exact path="/" component={ProductList} />
            <Route exact path="/:category" component={ProductList} />
            <Route path="/product/:id" component={Product} />
            <Route path="*">
              <div>404 page not found</div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
