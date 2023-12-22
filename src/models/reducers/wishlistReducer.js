/* eslint-disable max-len */
import { createReducer } from '@reduxjs/toolkit';
import { setWishlist } from 'models/actions/wishlistActions';

const initialState = {
  wishlist: [],
};
const wishlistReducer = createReducer(initialState, (builder) => {
  builder.addCase(setWishlist, (state, action) => ({
    ...state,
    wishlist: action.payload.results,
  }));
});

export default wishlistReducer;
