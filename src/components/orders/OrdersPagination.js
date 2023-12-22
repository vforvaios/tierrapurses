import Pagination from '@mui/material/Pagination';
import React from 'react';

const OrdersPagination = ({ page, count, onChange }) => {
  return (
    <div className="row">
      <div className="wrapper">
        <div className="catalog-pagination pagination">
          <Pagination
            page={page}
            count={count}
            showFirstButton
            showLastButton
            onChange={(e, value) => onChange(e, value)}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersPagination;
