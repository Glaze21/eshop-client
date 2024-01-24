import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Query } from '@tilework/opus';

type Currencies = string[];

// https://eshop-654.herokuapp.com/
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
    endpoints: (builder) => ({
        getAllCurrencies: builder.query<Currencies, Query<'currencies', unknown, true>>({
            query: (body) => ({ method: 'GET', url: 'currencies', body }),
        }),
    }),
});

export const { getAllCurrencies } = apiSlice.endpoints;
