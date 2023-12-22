/* eslint-disable max-len */
import { createReducer } from '@reduxjs/toolkit';
import {
  setProductPage,
  setRelatedProducts,
  setFilterCategories,
  setSelectedFilter,
  setCatalogProducts,
  setGeneralLoading,
  removeSelectedFilter,
  setFilterBrands,
  setInitialPricesRange,
  setSelectedFilterPriceRange,
  setCatalogSorting,
  setCurrentCatalogPage,
  setSelectedCategoryAndSubCategory,
  setSelectedCategory,
  setFilterSubCategories,
  setSearchedProducts,
  setSearchLoading,
} from 'models/actions/catalogActions';

const initialState = {
  relatedProducts: [],
  singleProduct: {},
  filterCategories: [],
  filterSubCategories: [],
  filterBrands: [],
  filterPricesRange: {},
  sorting: 1, // price asc, then price desc equals 2
  filters: {
    selectedCategory: null,
    selectedSubCategory: null,
    selectedBrand: null,
    selectedPriceRange: [],
  },
  catalog: {
    pagination: {
      total: 0,
      currentPage: 1,
      perPage: process.env.REACT_APP_PER_PAGE,
    },
    results: [],
  },
  loading: false,
  searchedResults: [],
  searchLoading: false,
};

const catalogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setSearchedProducts, (state, action) => ({
      ...state,
      searchedResults: action.payload,
    }))
    .addCase(setSearchLoading, (state, action) => ({
      ...state,
      searchLoading: action.payload,
    }))
    .addCase(setProductPage, (state, action) => ({
      ...state,
      singleProduct: action.payload,
    }))
    .addCase(setRelatedProducts, (state, action) => ({
      ...state,
      relatedProducts: action.payload,
    }))
    .addCase(setFilterCategories, (state, action) => ({
      ...state,
      filterCategories: action.payload,
    }))
    .addCase(setFilterSubCategories, (state, action) => ({
      ...state,
      filterSubCategories: action.payload,
    }))
    .addCase(setSelectedFilter, (state, action) => ({
      ...state,
      filters: {
        ...state.filters,
        [action.payload.type]: action.payload.value,
      },
      catalog: {
        ...state.catalog,
        pagination: {
          ...state.catalog.pagination,
          currentPage: 1,
          total: 0,
        },
      },
    }))
    .addCase(setSelectedCategory, (state, action) => ({
      ...state,
      filters: {
        ...state.filters,
        selectedCategory: action.payload.category,
        selectedSubCategory: null,
      },
      catalog: {
        ...state.catalog,
        pagination: {
          ...state.catalog.pagination,
          currentPage: 1,
          total: 0,
        },
      },
    }))
    .addCase(setSelectedCategoryAndSubCategory, (state, action) => ({
      ...state,
      filters: {
        ...state.filters,
        selectedCategory: action.payload.category,
        selectedSubCategory: action.payload.subCategory,
      },
      catalog: {
        ...state.catalog,
        pagination: {
          ...state.catalog.pagination,
          currentPage: 1,
          total: 0,
        },
      },
    }))
    // // THIS IS DOUBLED AS THE ABOVE ONLY
    // // BECAUSE I DONT WANT TO TRIGGER THE EPIC
    // // EVERY TIME I CHANGE THE PRICE SLIDER
    .addCase(setSelectedFilterPriceRange, (state, action) => ({
      ...state,
      filters: {
        ...state.filters,
        [action.payload.type]: action.payload.value,
      },
      catalog: {
        ...state.catalog,
        pagination: {
          ...state.catalog.pagination,
          currentPage: 1,
          total: 0,
        },
      },
    }))
    .addCase(setCatalogProducts, (state, action) => ({
      ...state,
      catalog: {
        ...state.catalog,
        results: action.payload.results,
        pagination: {
          ...state.catalog.pagination,
          total: action.payload.total,
        },
      },
    }))
    .addCase(setGeneralLoading, (state, action) => ({
      ...state,
      loading: action.payload,
    }))
    .addCase(removeSelectedFilter, (state, action) => ({
      ...state,
      filters: {
        ...state?.filters,
        [action.payload.type]: null,
      },
      catalog: {
        ...state.catalog,
        pagination: {
          ...state.catalog.pagination,
          currentPage: 1,
          total: 0,
        },
      },
    }))
    .addCase(setFilterBrands, (state, action) => ({
      ...state,
      filterBrands: action.payload,
    }))
    .addCase(setInitialPricesRange, (state, action) => ({
      ...state,
      filterPricesRange: action.payload,
    }))
    .addCase(setCatalogSorting, (state, action) => ({
      ...state,
      sorting: action.payload,
      catalog: {
        ...state.catalog,
        pagination: {
          ...state.catalog.pagination,
          currentPage: 1,
          total: 0,
        },
      },
    }))
    .addCase(setCurrentCatalogPage, (state, action) => ({
      ...state,
      catalog: {
        ...state.catalog,
        pagination: {
          ...state.catalog.pagination,
          currentPage: action.payload,
        },
      },
    }));
});

export default catalogReducer;
