import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

const Store = configureStore({ reducer: rootReducer });

export default Store;
