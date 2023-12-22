import { createReducer } from '@reduxjs/toolkit';
import { setCategoriesMenu } from 'models/actions/categoriesActions';

const initialState = {
  categories: [],
};
const categoriesReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCategoriesMenu, (state, action) => ({
    ...state,
    categories: action.payload,
  }));
});

export default categoriesReducer;
