import React from "react";
import Navbar from "./components/Navbar/Navbar";
import ProductList from "./components/ProductsList/ProductList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { client } from "@tilework/opus";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";

client.setEndpoint("http://localhost:4000");

class App extends React.Component {
  render() {
    return (
      <div className="App" style={{ minHeight: "100vh" }}>
        <div
          id="backdrop"
          style={{
            position: "absolute",
            height: "calc(100% - 80px)",
            width: "100%",
            padding: 0,
            top: 80,
            zIndex: 2,
            background: "rgba(57, 55, 72, 0.22)",
            display: "none",
          }}
        />
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
