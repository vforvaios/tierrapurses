import Chip from '@mui/material/Chip';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import formatMoney from 'library/formatMoney';
import { setOrderId } from 'models/actions/userActions';
import { statuses, orderIdVisible } from 'models/selectors/userSelector';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import OrderDetails from './OrderDetails';

const Order = ({ order, toggleOrder }) => {
  const dispatch = useDispatch();
  const orderStatuses = useSelector(statuses);
  const orderId = useSelector(orderIdVisible);
  const {
    id,
    order_code,
    dateCreated,
    paymentFirstName,
    paymentLastName,
    paymentEmail,
    totalItems,
    totalOrderPrice,
    paymentMethodCost,
    shippingMethodCost,
    statusId,
  } = order;

  return (
    <>
      <TableRow
        className="product-row extra"
        onClick={() => {
          id !== orderId ? dispatch(setOrderId(id)) : dispatch(setOrderId(''));
        }}>
        <TableCell>
          <span className="hidden">ΚΩΔΙΚΟΣ</span>
          {order_code}
        </TableCell>
        <TableCell>
          <span className="hidden">ΗΜΕΡΟΜΗΝΙΑ</span>
          {new Date(dateCreated).toLocaleString()}
        </TableCell>
        <TableCell>
          <span className="hidden">ΟΝΟΜΑ</span>
          {paymentFirstName} {paymentLastName}
        </TableCell>
        <TableCell>
          <span className="hidden">EMAIL</span>
          {paymentEmail}
        </TableCell>
        <TableCell>
          <span className="hidden">ΤΙΜΗ</span>
          {formatMoney.format(
            Number(totalOrderPrice) +
              Number(paymentMethodCost) +
              Number(shippingMethodCost),
          )}
        </TableCell>
        <TableCell>
          <span className="hidden">ΤΕΜΑΧΙΑ</span>
          {totalItems}
        </TableCell>
        <TableCell>
          <Chip
            className={`chip chip${statusId}`}
            label={orderStatuses?.find((st) => st?.id === statusId)?.name}
          />
        </TableCell>
      </TableRow>
      {orderId !== '' && orderId === id ? <OrderDetails id={orderId} /> : null}
    </>
  );
};

export default Order;
