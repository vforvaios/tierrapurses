import {
  removeSelectedFilter,
  setGeneralLoading,
} from 'models/actions/catalogActions';
import React from 'react';
import { useDispatch } from 'react-redux';

const CatalogSelectedFilter = ({
  selectedFilters,
  categories,
  subCategories,
  brands,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="filter-box">
      <div className="filter-title orange">ΕΠΙΛΕΓΜΕΝΑ ΦΙΛΤΡΑ</div>
      <ul className="selected-filters-list">
        {selectedFilters?.selectedCategory && (
          <li
            className="selected-filter-option"
            onClick={() => {
              dispatch(setGeneralLoading(true));
              dispatch(removeSelectedFilter({ type: 'selectedCategory' }));
            }}>
            <span>
              {
                categories?.find(
                  (cat) => cat?.id === selectedFilters?.selectedCategory,
                )?.name
              }
            </span>
          </li>
        )}
        {selectedFilters?.selectedSubCategory && (
          <li
            className="selected-filter-option"
            onClick={() => {
              dispatch(setGeneralLoading(true));
              dispatch(removeSelectedFilter({ type: 'selectedSubCategory' }));
            }}>
            <span>
              {
                subCategories?.find(
                  (cat) => cat?.id === selectedFilters?.selectedSubCategory,
                )?.name
              }
            </span>
          </li>
        )}
        {selectedFilters?.selectedBrand && (
          <li
            className="selected-filter-option"
            onClick={() => {
              dispatch(setGeneralLoading(true));
              dispatch(removeSelectedFilter({ type: 'selectedBrand' }));
            }}>
            <span>
              {
                brands?.find(
                  (cat) => cat?.id === selectedFilters?.selectedBrand,
                )?.name
              }
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default CatalogSelectedFilter;
