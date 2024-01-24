import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./interfaces";

const initialState: AppState = {
  currencies: [],
  categories: [],
  activeCurrency: "USD",
  activeCategory: null,
  productList: [],
  product: null,
  cart: [],
  total: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAllCurrencies: (state, action: PayloadAction<string[]>) => {
      state.currencies = action.payload;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.activeCurrency = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
    setAllCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setAllProducts: (state, action: PayloadAction<any[]>) => {
      state.productList = action.payload;
    },
    setProduct: (state, action: PayloadAction<any>) => {
      state.product = action.payload;
    },
    resetProduct: (state) => {
      state.product = null;
    },
    addToCart: (state, action: PayloadAction<any[]>) => {
      state.cart = action.payload;
    },
    addToCartTotal: (state, action: PayloadAction<any[]>) => {
      state.total = action.payload;
    },
  },
});

export const {
  setAllCurrencies,
  setCurrency,
  setCategory,
  setAllCategories,
  setAllProducts,
  setProduct,
  resetProduct,
  addToCart,
  addToCartTotal,
} = appSlice.actions;

export const getAllCurrencies = (state: AppState) => state.currencies;
export const getCategories = (state: AppState) => state.categories;
export const getActiveCurrency = (state: AppState) => state.activeCurrency;
export const getActiveCategory = (state: AppState) => state.activeCategory;
export const getProductList = (state: AppState) => state.productList;
export const getProduct = (state: AppState) => state.product;
export const getCart = (state: AppState) => state.cart;
export const getTotal = (state: AppState) => state.total;
