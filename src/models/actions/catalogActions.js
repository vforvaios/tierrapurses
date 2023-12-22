import { createAction } from '@reduxjs/toolkit';

const getProductDetails = createAction('catalog/getProductDetails');
const getRelatedProducts = createAction('catalog/getRelatedProducts');
const setProductPage = createAction('catalog/setProductPage');
const setRelatedProducts = createAction('catalog/setRelatedProducts');
const getFilterCategories = createAction('catalog/getFilterCategories');
const setFilterCategories = createAction('catalog/setFilterCategories');
const setSelectedFilter = createAction('catalog/setSelectedFilter');
const setCatalogProducts = createAction('catalog/setCatalogProducts');
const getInitialCatalog = createAction('catalog/getInitialCatalog');
const setGeneralLoading = createAction('catalog/setGeneralLoading');
const removeSelectedFilter = createAction('catalog/removeSelectedFilter');
const setFilterBrands = createAction('catalog/setFilterBrands');
const getPricesRange = createAction('catalog/getPricesRange');
const setInitialPricesRange = createAction('catalog/setInitialPricesRange');
const getCatalogWithPrices = createAction('catalog/getCatalogWithPrices');
const setSelectedFilterPriceRange = createAction(
  'catalog/setSelectedFilterPriceRange',
);
const setCatalogSorting = createAction('catalog/setCatalogSorting');
const setCurrentCatalogPage = createAction('catalog/setCurrentCatalogPage');
const getFilterBrands = createAction('catalog/getFilterBrands');
const setSelectedCategory = createAction('catalog/setSelectedCategory');
const setFilterSubCategories = createAction('catalog/setFilterSubCategories');
const setSelectedCategoryAndSubCategory = createAction(
  'catalog/setSelectedCategoryAndSubCategory',
);
const getSearchRelatedProducts = createAction(
  'catalog/getSearchRelatedProducts',
);
const setSearchedProducts = createAction('catalog/setSearchedProducts');
const setSearchLoading = createAction('catalog/setSearchLoading');

export {
  getProductDetails,
  setProductPage,
  getRelatedProducts,
  setRelatedProducts,
  getFilterCategories,
  setFilterCategories,
  setSelectedFilter,
  setCatalogProducts,
  getInitialCatalog,
  setGeneralLoading,
  removeSelectedFilter,
  setFilterBrands,
  getPricesRange,
  setInitialPricesRange,
  getCatalogWithPrices,
  setSelectedFilterPriceRange,
  setCatalogSorting,
  setCurrentCatalogPage,
  getFilterBrands,
  setSelectedCategoryAndSubCategory,
  setSelectedCategory,
  setFilterSubCategories,
  getSearchRelatedProducts,
  setSearchedProducts,
  setSearchLoading,
};
