import { configureStore } from '@reduxjs/toolkit';
import productsReducers from '../features/products/productsSlice';
import strategiesReducers from '../features/strategies/strategiesSlice';
export default configureStore({
  reducer: {
    products : productsReducers,
    strategies : strategiesReducers,
  },
});
