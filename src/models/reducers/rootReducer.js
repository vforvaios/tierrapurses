import { combineReducers } from 'redux';

import cartReducer from './cartReducer';
import catalogReducer from './catalogReducer';
import checkoutReducer from './checkoutReducer';
import homeReducer from './homeReducer';
import staticReducer from './staticReducer';
import wishlistReducer from './wishlistReducer';

const rootReducer = combineReducers({
  cartReducer,
  catalogReducer,
  homeReducer,
  wishlistReducer,
  checkoutReducer,
  staticReducer,
});

export default rootReducer;
