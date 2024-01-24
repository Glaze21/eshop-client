import { combineReducers } from 'redux';
import { appSlice } from './appReducer';
import { RootState } from './interfaces';
import { apiSlice } from '../apiSlice';

const rootReducer = combineReducers<RootState>({
    app: appSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
