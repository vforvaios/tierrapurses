import { createAction } from '@reduxjs/toolkit';

const getWishlist = createAction('wishlist/getWishlist');
const setWishlist = createAction('wishlist/setWishlist');
const addProductWishlist = createAction('wishlist/addProductWishlist');
const removeProductWishlist = createAction('wishlist/removeProductWishlist');

export { getWishlist, setWishlist, addProductWishlist, removeProductWishlist };
