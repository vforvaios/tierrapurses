import { combineEpics } from 'redux-observable';

import cartEpics from './cartEpics';
import catalogEpics from './catalogEpics';
import categoriesEpics from './categoriesEpics';
import checkoutEpics from './checkoutEpics';
import homeEpics from './homeEpics';
import staticEpics from './staticEpics';
import userEpics from './userEpics';
import wishlistEpics from './wishlistEpics';

const rootEpics = combineEpics(
  userEpics,
  cartEpics,
  wishlistEpics,
  categoriesEpics,
  checkoutEpics,
  homeEpics,
  catalogEpics,
  staticEpics,
);

export default rootEpics;
