import { createReducer } from '@reduxjs/toolkit';
import { setCart } from 'models/actions/cartActions';
import { clearOrder } from 'models/actions/checkoutActions';

const initialState = {
  cart: [],
};
const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCart, (state, action) => ({
      ...state,
      cart: action.payload,
    }))
    .addCase(clearOrder, (state, action) => ({
      ...initialState,
    }));
});

export default cartReducer;
