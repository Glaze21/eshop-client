import { Reducer } from "@reduxjs/toolkit";

export interface RootState {
  app: Reducer<AppState>;
}

export interface AppState {
  currencies: string[];
  categories: string[];
  activeCurrency: string;
  activeCategory: string | null;
  productList: any[];
  product: any;
  cart: any[];
  total: any[];
}
