import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import appReducer from "./appReducer";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  root: appReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const initialState = {};

const middleware = [thunk];

const composeEnhancers =
  (process.env.NODE_ENV !== "production" &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(persistedReducer, initialState, enhancer);

export default store;
