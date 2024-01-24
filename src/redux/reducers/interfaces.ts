import { Reducer } from '@reduxjs/toolkit';

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
export interface RootState {
    app: Reducer<AppState>;
    api: Reducer<any>;
}
