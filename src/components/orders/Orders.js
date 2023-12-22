/* eslint-disable react-hooks/exhaustive-deps */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SEO from 'components/seo/SEO';
import { setGeneralLoading } from 'models/actions/catalogActions';
import {
  getOrdersStatuses,
  setCurrentOrdersPage,
  setOrderId,
} from 'models/actions/userActions';
import { myOrders, ordersPagination } from 'models/selectors/userSelector';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Order from './Order';
import OrdersPagination from './OrdersPagination';

const Orders = () => {
  const dispatch = useDispatch();
  const pagination = useSelector(ordersPagination);
  const orders = useSelector(myOrders);
  const count = Math.ceil(pagination.total / process.env.REACT_APP_PER_PAGE);

  const handleOrderPageChange = (e, value) => {
    dispatch(setGeneralLoading(true));
    dispatch(setCurrentOrdersPage(Number(value)));
  };

  useEffect(() => {
    dispatch(setOrderId(''));
    dispatch(setGeneralLoading(true));
    dispatch(getOrdersStatuses());
  }, []);

  return (
    <div className="content orders-page">
      <SEO
        title="Shoppy my orders"
        description="Shoppy my orders page"
        name="Shoppy"
        type="article"
      />
      <div className="row">
        <div className="wrapper">
          <div className="text-center">
            <h1 className="page-title">ΟΙ ΠΑΡΑΓΓΕΛΙΕΣ ΜΟΥ</h1>
          </div>
        </div>
      </div>
      {count > 1 && (
        <OrdersPagination
          page={Number(pagination.currentPage)}
          onChange={handleOrderPageChange}
          count={count}
        />
      )}
      <div className="row">
        <div className="wrapper">
          {orders?.length > 0 ? (
            <Table className="products-grid table">
              <TableHead>
                <TableRow>
                  <TableCell>ΚΩΔΙΚΟΣ</TableCell>
                  <TableCell>ΗΜΕΡΟΜΗΝΙΑ</TableCell>
                  <TableCell>ΟΝΟΜΑ</TableCell>
                  <TableCell>EMAIL</TableCell>
                  <TableCell>ΤΙΜΗ</TableCell>
                  <TableCell>ΤΕΜΑΧΙΑ</TableCell>
                  <TableCell>ΚΑΤΑΣΤΑΣΗ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order) => (
                  <Order order={order} key={order?.id} toggleOrder={() => {}} />
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="page-not-found-countainer">
              <h2>Δεν υπάρχουν παραγγελίες</h2>
            </div>
          )}
        </div>
      </div>
      {count > 1 && (
        <OrdersPagination
          page={Number(pagination.currentPage)}
          onChange={handleOrderPageChange}
          count={count}
        />
      )}
    </div>
  );
};

export default Orders;
