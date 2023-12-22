import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {
  setCatalogSorting,
  setGeneralLoading,
} from 'models/actions/catalogActions';
import { catalogSorting } from 'models/selectors/catalogSelectors';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SortingCatalog = () => {
  const dispatch = useDispatch();
  const sorting = useSelector(catalogSorting);

  return (
    <div className="sorting-container">
      <FormControl variant="standard">
        <InputLabel id="sortingCatalogProducts">Ταξινόμηση</InputLabel>
        <Select
          labelId="sortingCatalogProducts"
          autoWidth
          id="sortingSelect"
          value={sorting}
          label="Ταξινόμηση"
          onChange={(e) => {
            dispatch(setGeneralLoading(true));
            dispatch(setCatalogSorting(e.target.value));
          }}>
          <MenuItem value={1}>Ανά τιμή (αύξουσα)</MenuItem>
          <MenuItem value={2}>Ανά τιμή (φθίνουσα)</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SortingCatalog;
