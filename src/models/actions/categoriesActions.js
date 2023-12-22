import { createAction } from '@reduxjs/toolkit';

const getCategoriesMenu = createAction('categories/getCategoriesMenu');
const setCategoriesMenu = createAction('categories/setCategoriesMenu');

export { getCategoriesMenu, setCategoriesMenu };
