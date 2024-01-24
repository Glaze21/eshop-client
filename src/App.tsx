import Navbar from "./components/Navbar/Navbar";
import ProductList from "./pages/ProductsList/ProductList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { client } from "@tilework/opus";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";

// client.setEndpoint("https://eshop-654.herokuapp.com/");
client.setEndpoint("http://localhost:4000/");

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          {/* <Route path="*">
            <div>404 page not found</div>
          </Route> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
