const initialState = {
  currencies: [],
  categories: [],
  activeCurrency: "USD",
  activeCategory: null,
  productList: [],
  product: null,
  cart: [],
  total: [],
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_ALLCURRENCIES":
      return {
        ...state,
        currencies: action.payload,
      };
    case "SET_CURRENCY":
      return {
        ...state,
        activeCurrency: action.payload,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        activeCategory: action.payload,
      };
    case "SET_ALLCATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "SET_ALLPRODUCTS":
      return {
        ...state,
        productList: action.payload,
      };
    case "SET_PRODUCT":
      return {
        ...state,
        product: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "ADD_TO_CART_TOTAL":
      return {
        ...state,
        total: action.payload,
      };
    default:
      return state;
  }
}
